import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { GalleryImage } from "@/lib/models";
import { galleryImageSchema, galleryUpdateSchema, clampPagination } from "@/lib/validators";
import { auth } from "@/lib/auth";
import type { GalleryImage as GalleryImageType } from "@/lib/types";

// ─── Dev-mode in-memory store ────────────────
const devGallery: GalleryImageType[] = [
  {
    _id: "gal-001",
    url: "/images/campus/triple-m-building.png",
    publicId: "school-campus-1",
    category: "Campus",
    caption: "Triple M Public School — main building",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-002",
    url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    publicId: "campus-corridor-1",
    category: "Campus",
    caption: "Corridor and classrooms wing",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-003",
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
    publicId: "students-classroom-1",
    category: "Academics",
    caption: "Students engaged in classroom discussion",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-004",
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&h=600&fit=crop",
    publicId: "science-lab-1",
    category: "Academics",
    caption: "Hands-on science lab experiment session",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-005",
    url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&h=600&fit=crop",
    publicId: "library-1",
    category: "Academics",
    caption: "School library — reading session",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-006",
    url: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=600&fit=crop",
    publicId: "sports-day-1",
    category: "Sports",
    caption: "Annual Sports Day — track events",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-007",
    url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800&h=600&fit=crop",
    publicId: "cricket-match-1",
    category: "Sports",
    caption: "Inter-school cricket tournament",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-008",
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    publicId: "annual-function-1",
    category: "Events",
    caption: "Annual Day celebrations — stage performance",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-009",
    url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    publicId: "republic-day-1",
    category: "Events",
    caption: "Republic Day flag hoisting ceremony",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-010",
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=600&fit=crop",
    publicId: "campus-ground-1",
    category: "Campus",
    caption: "School playground and sports ground",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-011",
    url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&h=600&fit=crop",
    publicId: "computer-lab-1",
    category: "Academics",
    caption: "Computer lab — IT skill development",
    uploadedAt: new Date().toISOString(),
  },
  {
    _id: "gal-012",
    url: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&h=600&fit=crop",
    publicId: "prize-distribution-1",
    category: "Events",
    caption: "Prize distribution — academic excellence awards",
    uploadedAt: new Date().toISOString(),
  },
];

let devCounter = 100;

// GET — Public: List gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const { page, limit, skip } = clampPagination(searchParams);

    // Dev mode
    if (!process.env.MONGODB_URI) {
      let filtered = devGallery;
      if (category && category !== "All") {
        filtered = devGallery.filter((img) => img.category === category);
      }
      const total = filtered.length;
      const images = filtered.slice(skip, skip + limit);
      return NextResponse.json({
        images,
        pagination: { page, limit, total, pages: Math.ceil(total / limit) },
      });
    }

    const query = category && category !== "All" ? { category } : {};

    await connectDB();
    const [images, total] = await Promise.all([
      GalleryImage.find(query)
        .sort({ uploadedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      GalleryImage.countDocuments(query),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    logger.error("Gallery GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST — Admin only: Add gallery image
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = galleryImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Dev mode
    if (!process.env.MONGODB_URI) {
      devCounter++;
      const image = {
        _id: `gal-dev-${devCounter}`,
        ...parsed.data,
        uploadedAt: new Date().toISOString(),
      };
      devGallery.unshift(image);
      return NextResponse.json({ success: true, image }, { status: 201 });
    }

    await connectDB();
    const image = await GalleryImage.create(parsed.data);
    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch (error) {
    logger.error("Gallery POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT — Admin only: Replace gallery image (url, caption, category)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { id, ...rawUpdates } = body;

    if (!id) {
      return NextResponse.json({ error: "Image ID required" }, { status: 400 });
    }

    // Validate updates through strict schema — rejects unknown fields
    const parsed = galleryUpdateSchema.safeParse(rawUpdates);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const updates = parsed.data;

    // Dev mode
    if (!process.env.MONGODB_URI) {
      const idx = devGallery.findIndex((img) => img._id === id);
      if (idx === -1) {
        return NextResponse.json(
          { error: "Image not found" },
          { status: 404 }
        );
      }
      devGallery[idx] = { ...devGallery[idx], ...updates };
      return NextResponse.json({ success: true, image: devGallery[idx] });
    }

    await connectDB();
    const image = await GalleryImage.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, image });
  } catch (error) {
    logger.error("Gallery PUT error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE — Admin only: Remove gallery image
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
        { error: "Image ID required" },
        { status: 400 }
      );
    }

    // Dev mode
    if (!process.env.MONGODB_URI) {
      const idx = devGallery.findIndex((img) => img._id === id);
      if (idx === -1) {
        return NextResponse.json(
          { error: "Image not found" },
          { status: 404 }
        );
      }
      devGallery.splice(idx, 1);
      return NextResponse.json({ success: true, message: "Image removed" });
    }

    await connectDB();
    const image = await GalleryImage.findByIdAndDelete(id);

    if (!image) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Image removed" });
  } catch (error) {
    logger.error("Gallery DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
