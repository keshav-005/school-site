import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Faculty } from "@/lib/models";
import { facultySchema } from "@/lib/validators";
import { auth } from "@/lib/auth";

// ─── Dev-mode in-memory store ────────────────
const devFaculty: any[] = [
  {
    _id: "fac-001",
    name: "Mr. Manoj Kapoor",
    department: "General",
    subject: "Director",
    qualifications: "",
    photoUrl: "/images/faculty/manoj-kapoor.png",
    order: 0,
    isActive: true,
  },
  {
    _id: "fac-002",
    name: "Mr. S.K. Sharma",
    department: "General",
    subject: "Principal",
    qualifications: "",
    photoUrl: "/images/faculty/sk-sharma.png",
    order: 1,
    isActive: true,
  },
  {
    _id: "fac-003",
    name: "Mr. O.P. Sharma",
    department: "General",
    subject: "Senior Faculty",
    qualifications: "",
    photoUrl: "/images/faculty/op-sharma.png",
    order: 2,
    isActive: true,
  },
  {
    _id: "fac-004",
    name: "Mr. Jairnail Singh",
    department: "General",
    subject: "Senior Faculty",
    qualifications: "",
    photoUrl: "/images/faculty/jairnail-singh.png",
    order: 3,
    isActive: true,
  },
  {
    _id: "fac-005",
    name: "Mrs. Ravneet Kaur",
    department: "Medical",
    subject: "Chemistry",
    qualifications: "M.Sc. Chemistry, B.Ed.",
    photoUrl: "",
    order: 4,
    isActive: true,
  },
  {
    _id: "fac-006",
    name: "Mr. Sukhwinder Singh",
    department: "Medical",
    subject: "Physics",
    qualifications: "M.Sc. Physics, B.Ed.",
    photoUrl: "",
    order: 5,
    isActive: true,
  },
  {
    _id: "fac-007",
    name: "Mrs. Prabhjot Kaur",
    department: "Non-Medical",
    subject: "Mathematics",
    qualifications: "M.Sc. Mathematics, B.Ed.",
    photoUrl: "",
    order: 6,
    isActive: true,
  },
  {
    _id: "fac-008",
    name: "Mrs. Sunita Sharma",
    department: "General",
    subject: "English",
    qualifications: "M.A. English, B.Ed.",
    photoUrl: "",
    order: 7,
    isActive: true,
  },
  {
    _id: "fac-009",
    name: "Mr. Harjeet Singh",
    department: "General",
    subject: "Punjabi",
    qualifications: "M.A. Punjabi, B.Ed.",
    photoUrl: "",
    order: 8,
    isActive: true,
  },
  {
    _id: "fac-010",
    name: "Mrs. Neelam Rani",
    department: "General",
    subject: "Hindi",
    qualifications: "M.A. Hindi, B.Ed.",
    photoUrl: "",
    order: 9,
    isActive: true,
  },
  {
    _id: "fac-011",
    name: "Mr. Vikram Thakur",
    department: "Commerce",
    subject: "Accountancy",
    qualifications: "M.Com., B.Ed.",
    photoUrl: "",
    order: 10,
    isActive: true,
  },
  {
    _id: "fac-012",
    name: "Mrs. Gurpreet Kaur",
    department: "General",
    subject: "Computer Science",
    qualifications: "MCA, B.Ed.",
    photoUrl: "",
    order: 11,
    isActive: true,
  },
];

let devCounter = 100;

// GET — Public: List active faculty
export async function GET() {
  try {
    // Dev mode
    if (!process.env.MONGODB_URI) {
      const active = devFaculty
        .filter((f) => f.isActive)
        .sort((a, b) => a.order - b.order);
      return NextResponse.json({ faculty: active });
    }

    await connectDB();
    const faculty = await Faculty.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean();
    return NextResponse.json({ faculty });
  } catch (error) {
    console.error("Faculty GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST — Admin only: Add new faculty member
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = facultySchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Invalid input", errors },
        { status: 400 }
      );
    }

    // Dev mode
    if (!process.env.MONGODB_URI) {
      devCounter++;
      const member = { _id: `fac-dev-${devCounter}`, ...parsed.data };
      devFaculty.push(member);
      return NextResponse.json(
        { success: true, faculty: member },
        { status: 201 }
      );
    }

    await connectDB();
    const member = await Faculty.create(parsed.data);
    return NextResponse.json(
      { success: true, faculty: member },
      { status: 201 }
    );
  } catch (error) {
    console.error("Faculty POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT — Admin only: Update faculty member
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Faculty ID required" },
        { status: 400 }
      );
    }

    const parsed = facultySchema.partial().safeParse(updates);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Dev mode
    if (!process.env.MONGODB_URI) {
      const idx = devFaculty.findIndex((f) => f._id === id);
      if (idx === -1) {
        return NextResponse.json(
          { error: "Faculty member not found" },
          { status: 404 }
        );
      }
      devFaculty[idx] = { ...devFaculty[idx], ...parsed.data };
      return NextResponse.json({ success: true, faculty: devFaculty[idx] });
    }

    await connectDB();
    const member = await Faculty.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!member) {
      return NextResponse.json(
        { error: "Faculty member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, faculty: member });
  } catch (error) {
    console.error("Faculty PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE — Admin only: Remove faculty member
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Faculty ID required" },
        { status: 400 }
      );
    }

    // Dev mode
    if (!process.env.MONGODB_URI) {
      const idx = devFaculty.findIndex((f) => f._id === id);
      if (idx === -1) {
        return NextResponse.json(
          { error: "Faculty member not found" },
          { status: 404 }
        );
      }
      devFaculty.splice(idx, 1);
      return NextResponse.json({
        success: true,
        message: "Faculty member removed",
      });
    }

    await connectDB();
    const member = await Faculty.findByIdAndDelete(id);

    if (!member) {
      return NextResponse.json(
        { error: "Faculty member not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Faculty member removed",
    });
  } catch (error) {
    console.error("Faculty DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
