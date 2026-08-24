import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET — fetch all gallery items (admin view, includes drafts)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const albumId = searchParams.get("albumId");
    const category = searchParams.get("category");

    const where: Record<string, unknown> = {};
    if (albumId) where.albumId = albumId;
    if (category) where.category = category;

    const items = await prisma.galleryItem.findMany({
      where,
      include: { album: { select: { id: true, title: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch gallery items:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST — create a new gallery item
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const item = await prisma.galleryItem.create({
      data: {
        title: body.title,
        description: body.description || null,
        mediaUrl: body.mediaUrl,
        thumbnailUrl: body.thumbnailUrl || null,
        type: body.type || "PHOTO",
        category: body.category || "GENERAL",
        albumId: body.albumId || null,
        sortOrder: body.sortOrder || 0,
        status: body.status || "PUBLISHED",
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to create gallery item:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// PUT — update a gallery item
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const item = await prisma.galleryItem.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        mediaUrl: data.mediaUrl,
        thumbnailUrl: data.thumbnailUrl || null,
        type: data.type || "PHOTO",
        category: data.category || "GENERAL",
        albumId: data.albumId || null,
        sortOrder: data.sortOrder || 0,
        status: data.status || "PUBLISHED",
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Failed to update gallery item:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE — remove a gallery item
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.galleryItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete gallery item:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
