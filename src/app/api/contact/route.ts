import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { ContactMessage } from "@/lib/models";
import { contactFormSchema } from "@/lib/validators";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";
import { sendEmail, contactEmailTemplate } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const { success } = await rateLimit(request);
    if (!success) return rateLimitResponse();

    // Parse and validate
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

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
    const message = await ContactMessage.create({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      subject: data.subject,
      message: data.message,
    });

    // Send notification email
    const emailTo = process.env.CONTACT_EMAIL_TO || "triplem_school@yahoo.in";
    await sendEmail({
      to: emailTo,
      subject: `Contact Form: ${data.subject}`,
      html: contactEmailTemplate(data),
      replyTo: data.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        id: message._id,
      },
      { status: 201 }
    );
  } catch (error) {
    logger.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
