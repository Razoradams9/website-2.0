import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET — fetch all albums with item count
export async function GET() {
  try {
    const albums = await prisma.galleryAlbum.findMany({
      include: { _count: { select: { items: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST — create a new album
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const album = await prisma.galleryAlbum.create({
      data: {
        title: body.title,
        description: body.description || null,
        coverImage: body.coverImage || null,
        category: body.category || "GENERAL",
        status: body.status || "PUBLISHED",
      },
    });

    return NextResponse.json(album, { status: 201 });
  } catch (error) {
    console.error("Failed to create album:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// PUT — update an album
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const album = await prisma.galleryAlbum.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        coverImage: data.coverImage || null,
        category: data.category || "GENERAL",
        status: data.status || "PUBLISHED",
      },
    });

    return NextResponse.json(album);
  } catch (error) {
    console.error("Failed to update album:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE — remove an album (items get albumId set to null via onDelete: SetNull)
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.galleryAlbum.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete album:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
