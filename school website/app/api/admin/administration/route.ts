import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// GET — fetch administration data from site settings
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst({
      select: {
        chairmanName: true,
        chairmanMessage: true,
        chairmanPhotoUrl: true,
        director1Name: true,
        director1Message: true,
        director1PhotoUrl: true,
        director2Name: true,
        director2Message: true,
        director2PhotoUrl: true,
        principalName: true,
        principalMessage: true,
        principalPhotoUrl: true,
      },
    });
    return NextResponse.json(settings || {});
  } catch (error) {
    console.error("Failed to fetch administration data:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// PUT — update administration data
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Get the first settings record (or create one)
    let settings = await prisma.siteSettings.findFirst();

    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          schoolName: "Guru Gorakshnath Gyanasthali",
          ...body,
        },
      });
    } else {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: body,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("Failed to update administration data:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
