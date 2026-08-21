export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SCHOOL_NAME ?? "Guru Gorakshnath Gyanasthali",
  tagline: process.env.NEXT_PUBLIC_SCHOOL_TAGLINE ?? "Nurturing Minds, Building Futures",
  description:
    "Guru Gorakshnath Gyanasthali is a CBSE-affiliated school committed to providing quality education with strong values and modern teaching methods.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ogImage: "/images/og-image.jpg",
  links: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    youtube: "#",
  },
  contact: {
    address: process.env.NEXT_PUBLIC_SCHOOL_ADDRESS ?? "",
    phone: process.env.NEXT_PUBLIC_SCHOOL_PHONE ?? "9794335475",
    email: process.env.NEXT_PUBLIC_SCHOOL_EMAIL ?? "",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "9794335475",
  },
  cbse: {
    affiliationNo: process.env.NEXT_PUBLIC_SCHOOL_AFFILIATION_NO ?? "2136014",
    schoolCode: process.env.NEXT_PUBLIC_SCHOOL_CODE ?? "72425",
  },
};

export const CLASSES = [
  "Nursery", "LKG", "UKG",
  "Class 1", "Class 2", "Class 3", "Class 4", "Class 5",
  "Class 6", "Class 7", "Class 8", "Class 9", "Class 10",
  "Class 11", "Class 12",
];

export const STREAMS_CLASS_11_12 = ["Science", "Commerce", "Arts/Humanities"];

export const ACADEMIC_YEARS = ["2024-2025", "2025-2026", "2026-2027"];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const CATEGORIES = [
  { value: "GENERAL", label: "General" },
  { value: "OBC", label: "OBC" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
  { value: "EWS", label: "EWS" },
];

export const RELIGIONS = [
  "Hindu", "Muslim", "Christian", "Sikh", "Buddhist",
  "Jain", "Zoroastrian", "Other",
];
