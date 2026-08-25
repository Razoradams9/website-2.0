import { NextResponse } from "next/server";
import { uploadToCloudinary, deleteFromCloudinary } from "@/lib/storage/cloudinary";

// POST — upload a file to Cloudinary
export async function POST(request: Request) {
  try {
    // Verify Cloudinary config is present
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json(
        { error: "Cloudinary not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const folder = (formData.get("folder") as string) || "school-portal/administration";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type (images and videos)
    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"];
    const allowedTypes = [...allowedImageTypes, ...allowedVideoTypes];
    const isVideo = allowedVideoTypes.includes(file.type);

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: JPEG, PNG, WebP, GIF, MP4, WebM, MOV, AVI." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB for images, max 100MB for videos)
    const maxSize = isVideo ? 100 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: isVideo ? "File too large. Maximum video size is 100MB." : "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadToCloudinary(buffer, {
      folder,
      resourceType: isVideo ? "video" : "image",
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      resourceType: isVideo ? "video" : "image",
    });
  } catch (error: unknown) {
    console.error("Upload error:", error);
    let message = "Upload failed";
    if (error instanceof Error) {
      message = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      message = String((error as { message: unknown }).message);
    } else if (error && typeof error === "object" && "http_code" in error) {
      // Cloudinary error object
      const cErr = error as { message?: string; http_code?: number };
      message = cErr.message || `Cloudinary error (HTTP ${cErr.http_code})`;
    } else {
      message = JSON.stringify(error);
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE — remove a file from Cloudinary
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { publicId } = body;

    if (!publicId) {
      return NextResponse.json({ error: "No publicId provided" }, { status: 400 });
    }

    await deleteFromCloudinary(publicId, "image");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
