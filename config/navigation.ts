export const publicNav = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "History & Vision", href: "/about/history" },
      { label: "Mission & Objectives", href: "/about/mission" },
      { label: "Infrastructure", href: "/about/infrastructure" },
      { label: "Campus & Facilities", href: "/about/campus" },
    ],
  },
  {
    label: "Administration",
    href: "/administration",
    children: [
      { label: "Chairman's Message", href: "/administration/chairman" },
      { label: "Director's Message", href: "/administration/director" },
      { label: "Principal's Message", href: "/administration/principal" },
      { label: "School Managing Committee", href: "/administration/smc" },
      { label: "PTA Committee", href: "/administration/pta" },
      { label: "Staff Directory", href: "/administration/staff" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Curriculum", href: "/academics/curriculum" },
      { label: "Classes & Subjects", href: "/academics/classes" },
      { label: "Academic Calendar", href: "/academics/calendar" },
      { label: "Examination System", href: "/academics/exams" },
      { label: "School Timings", href: "/academics/timings" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Online Application", href: "/admissions/apply" },
      { label: "Procedure", href: "/admissions/procedure" },
      { label: "Eligibility", href: "/admissions/eligibility" },
      { label: "Fee Structure", href: "/admissions/fees" },
      { label: "Download Forms", href: "/admissions/downloads" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    children: [
      { label: "Photo Gallery", href: "/gallery/photos" },
      { label: "Video Gallery", href: "/gallery/videos" },
      { label: "Annual Day", href: "/gallery/annual-day" },
      { label: "Sports Day", href: "/gallery/sports-day" },
    ],
  },
  {
    label: "More",
    href: "#",
    children: [
      { label: "News & Events", href: "/news" },
      { label: "CBSE Disclosure", href: "/cbse-disclosure" },
      { label: "Committees", href: "/committees" },
      { label: "Alumni", href: "/alumni" },
      { label: "Careers", href: "/careers" },
      { label: "Tenders", href: "/tenders" },
      { label: "Magazine", href: "/magazine" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export const adminNav = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "LayoutDashboard",
  },
  {
    label: "Users & Roles",
    href: "/admin/users",
    icon: "Users",
    requiredRole: ["SUPER_ADMIN"],
  },
  {
    label: "Content Manager",
    href: "/admin/content",
    icon: "FileText",
    children: [
      { label: "Hero Slider", href: "/admin/content/slider", icon: "Image" },
      { label: "Pages", href: "/admin/content/pages", icon: "File" },
      { label: "News", href: "/admin/content/news", icon: "Newspaper" },
      { label: "Events", href: "/admin/content/events", icon: "Calendar" },
      { label: "Notices", href: "/admin/content/notices", icon: "Bell" },
      { label: "Gallery", href: "/admin/content/gallery", icon: "Images" },
      { label: "Staff", href: "/admin/content/staff", icon: "UserCheck" },
      { label: "Testimonials", href: "/admin/content/testimonials", icon: "MessageSquare" },
    ],
  },
  {
    label: "CBSE Disclosure",
    href: "/admin/cbse",
    icon: "Award",
  },
  {
    label: "Admissions",
    href: "/admin/admissions",
    icon: "ClipboardList",
  },
  {
    label: "Academics",
    href: "/admin/academics",
    icon: "BookOpen",
    children: [
      { label: "Grade Levels", href: "/admin/academics/grades", icon: "GraduationCap" },
      { label: "Sections", href: "/admin/academics/sections", icon: "Layers" },
      { label: "Subjects", href: "/admin/academics/subjects", icon: "Book" },
      { label: "Timetable", href: "/admin/academics/timetable", icon: "Clock" },
      { label: "Homework", href: "/admin/academics/homework", icon: "PenLine" },
      { label: "Exam Schedules", href: "/admin/academics/exams", icon: "FileCheck" },
    ],
  },
  {
    label: "Students",
    href: "/admin/students",
    icon: "GraduationCap",
  },
  {
    label: "Teachers",
    href: "/admin/teachers",
    icon: "UserCheck",
  },
  {
    label: "Parents",
    href: "/admin/parents",
    icon: "Users",
  },
  {
    label: "Attendance",
    href: "/admin/attendance",
    icon: "CheckSquare",
  },
  {
    label: "Fee Management",
    href: "/admin/fees",
    icon: "CreditCard",
  },
  {
    label: "Transport",
    href: "/admin/transport",
    icon: "Bus",
  },
  {
    label: "Library",
    href: "/admin/library",
    icon: "Library",
  },
  {
    label: "Grievances",
    href: "/admin/grievances",
    icon: "AlertTriangle",
  },
  {
    label: "Site Settings",
    href: "/admin/settings",
    icon: "Settings",
    requiredRole: ["SUPER_ADMIN", "ADMIN"],
  },
  {
    label: "Activity Logs",
    href: "/admin/logs",
    icon: "Activity",
    requiredRole: ["SUPER_ADMIN"],
  },
];
