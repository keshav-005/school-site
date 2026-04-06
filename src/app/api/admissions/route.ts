import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { AdmissionInquiry } from "@/lib/models";
import { admissionFormSchema } from "@/lib/validators";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { sendEmail, admissionEmailTemplate } from "@/lib/email";
import { auth } from "@/lib/auth";

// POST — Public: Submit new admission inquiry
export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const { success } = await rateLimit(request);
    if (!success) return rateLimitResponse();

    // Parse and validate
    const body = await request.json();
    const parsed = admissionFormSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0];
      return NextResponse.json(
        { error: firstError || "Invalid input", errors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Save to database
    await connectDB();
    const inquiry = await AdmissionInquiry.create({
      studentName: data.studentName,
      dateOfBirth: data.dateOfBirth,
      classApplying: data.classApplying,
      parentName: data.parentName,
      parentPhone: data.parentPhone,
      parentEmail: data.parentEmail || undefined,
      address: data.address,
      previousSchool: data.previousSchool || undefined,
      remarks: data.remarks || undefined,
      status: "new",
    });

    // Send notification email
    const emailTo = process.env.CONTACT_EMAIL_TO || "triplem_school@yahoo.in";
    await sendEmail({
      to: emailTo,
      subject: `New Admission Inquiry: ${data.studentName} — ${data.classApplying}`,
      html: admissionEmailTemplate({
        studentName: data.studentName,
        parentName: data.parentName,
        parentPhone: data.parentPhone,
        classApplying: data.classApplying,
      }),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted. We will contact you soon.",
        id: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admissions API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}

// GET — Admin only: List all admission inquiries
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");

    const query = status ? { status } : {};
    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      AdmissionInquiry.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      AdmissionInquiry.countDocuments(query),
    ]);

    return NextResponse.json({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Admissions GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
