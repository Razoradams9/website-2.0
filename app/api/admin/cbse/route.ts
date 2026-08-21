import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET — fetch all disclosure items
export async function GET() {
  try {
    const items = await prisma.mandatoryDisclosure.findMany({
      orderBy: [{ category: "asc" }, { sortOrder: "asc" }],
    });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST — create new disclosure item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const item = await prisma.mandatoryDisclosure.create({
      data: {
        title: body.title,
        description: body.description || null,
        category: body.category,
        fileUrl: body.fileUrl || null,
        externalUrl: body.externalUrl || null,
        sortOrder: body.sortOrder || 0,
        isPublic: body.isPublic ?? true,
      },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}

// PUT — update existing disclosure item
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const item = await prisma.mandatoryDisclosure.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        category: data.category,
        fileUrl: data.fileUrl || null,
        externalUrl: data.externalUrl || null,
        sortOrder: data.sortOrder || 0,
        isPublic: data.isPublic ?? true,
      },
    });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE — remove disclosure item
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    await prisma.mandatoryDisclosure.delete({ where: { id: body.id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
