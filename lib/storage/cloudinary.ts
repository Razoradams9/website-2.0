import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfig() {
  if (!configured) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    configured = true;
  }
}

export type CloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  resource_type: "image" | "video" | "raw";
};

export async function uploadToCloudinary(
  fileBuffer: Buffer,
  options: {
    folder?: string;
    publicId?: string;
    resourceType?: "image" | "video" | "raw" | "auto";
    transformation?: Record<string, unknown>[];
  } = {},
): Promise<CloudinaryUploadResult> {
  ensureConfig();
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder ?? "school-portal",
        public_id: options.publicId,
        resource_type: options.resourceType ?? "auto",
        transformation: options.transformation,
        quality: "auto",
        fetch_format: "auto",
      },
      (error, result) => {
        if (error || !result) reject(error ?? new Error("Upload failed"));
        else resolve(result as CloudinaryUploadResult);
      },
    );
    uploadStream.end(fileBuffer);
  });
}

export async function deleteFromCloudinary(publicId: string, resourceType: "image" | "video" | "raw" = "image") {
  ensureConfig();
  return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

export function getCloudinaryUrl(
  publicId: string,
  transforms: string = "w_800,h_600,c_fill,q_auto,f_auto",
): string {
  ensureConfig();
  return cloudinary.url(publicId, {
    transformation: transforms,
    secure: true,
  });
}

export default cloudinary;
