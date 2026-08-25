import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET — fetch published gallery items for the public site
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: Record<string, unknown> = { status: "PUBLISHED", type: "PHOTO" };
    if (category && category !== "ALL") where.category = category;

    const items = await prisma.galleryItem.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        title: true,
        description: true,
        mediaUrl: true,
        thumbnailUrl: true,
        category: true,
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return NextResponse.json([], { status: 500 });
  }
}
