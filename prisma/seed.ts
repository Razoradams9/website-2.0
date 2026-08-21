/**
 * Prisma Seed Script
 * Run: npm run db:seed
 *
 * Seeds:
 *  1. Site Settings
 *  2. Super Admin user
 *  3. Admin user
 *  4. Grade Levels (Nursery → Class 12)
 *  5. Subjects (core CBSE subjects)
 *  6. Academic Year
 *  7. Sections (Class 9A, 10A, 12-Science-A)
 *  8. CBSE Mandatory Disclosures (20 records)
 *  9. Slider Items
 * 10. Sample Notices & Events
 * 11. Fee Structures
 * 12. Transport Routes
 */

import {
  PrismaClient,
  Role,
  AccountStatus,
  PublishStatus,
  DisclosureCategory,
  StaffCategory,
  GalleryCategory,
  ExamType,
} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  // ── 1. Site Settings ────────────────────────────────────────
  console.log("📋 Seeding site settings...");
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      schoolName: "DAV Public School",
      schoolTagline: "Excellence in Education Since 1985",
      schoolAddress: "123 School Road, New Delhi - 110001",
      schoolPhone: "+91-11-12345678",
      schoolEmail: "info@davschool.edu.in",
      schoolAffilNo: "2730001",
      schoolCode: "12345",
      principalName: "Dr. Sunita Sharma",
      principalMessage:
        "Education is the most powerful weapon which you can use to change the world. We are committed to nurturing young minds to become responsible global citizens.",
      chairmanName: "Shri Ramesh Kumar",
      chairmanMessage:
        "Our school has always been a beacon of excellence. We strive to provide the best learning environment for our students.",
      footerText: "© 2026 DAV Public School. All rights reserved.",
      metaTitle: "DAV Public School — Excellence in Education",
      metaDescription:
        "DAV Public School is a premier CBSE-affiliated institution committed to holistic education.",
    },
  });

  // ── 2. Super Admin ──────────────────────────────────────────
  console.log("👤 Seeding users...");
  const superAdminPassword = await bcrypt.hash("SuperAdmin@123", 12);
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@davschool.edu.in" },
    update: {},
    create: {
      name: "Super Administrator",
      email: "superadmin@davschool.edu.in",
      password: superAdminPassword,
      role: Role.SUPER_ADMIN,
      status: AccountStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log(`   ✓ Super Admin: ${superAdmin.email}`);

  // ── 3. Admin user ────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("Admin@1234", 12);
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@davschool.edu.in" },
    update: {},
    create: {
      name: "School Administrator",
      email: "admin@davschool.edu.in",
      password: adminPassword,
      role: Role.ADMIN,
      status: AccountStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });
  console.log(`   ✓ Admin: ${adminUser.email}`);

  // Demo teacher
  const teacherPassword = await bcrypt.hash("Teacher@123", 12);
  const teacherUser = await prisma.user.upsert({
    where: { email: "teacher@davschool.edu.in" },
    update: {},
    create: {
      name: "Priya Verma",
      email: "teacher@davschool.edu.in",
      password: teacherPassword,
      role: Role.TEACHER,
      status: AccountStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  // Demo student
  const studentPassword = await bcrypt.hash("Student@123", 12);
  const studentUser = await prisma.user.upsert({
    where: { email: "student@davschool.edu.in" },
    update: {},
    create: {
      name: "Rahul Singh",
      email: "student@davschool.edu.in",
      password: studentPassword,
      role: Role.STUDENT,
      status: AccountStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  // Demo parent
  const parentPassword = await bcrypt.hash("Parent@123", 12);
  const parentUser = await prisma.user.upsert({
    where: { email: "parent@davschool.edu.in" },
    update: {},
    create: {
      name: "Suresh Singh",
      email: "parent@davschool.edu.in",
      password: parentPassword,
      role: Role.PARENT,
      status: AccountStatus.ACTIVE,
      emailVerified: new Date(),
    },
  });

  console.log(
    `   ✓ Teacher, Student, Parent demo accounts created`,
  );

  // ── 4. Academic Year ─────────────────────────────────────────
  console.log("📅 Seeding academic year...");
  const academicYear = await prisma.academicYear.upsert({
    where: { name: "2025-2026" },
    update: {},
    create: {
      name: "2025-2026",
      startDate: new Date("2025-04-01"),
      endDate: new Date("2026-03-31"),
      isCurrent: true,
    },
  });
  console.log(`   ✓ Academic Year: ${academicYear.name}`);

  // ── 5. Grade Levels ──────────────────────────────────────────
  console.log("🏫 Seeding grade levels...");
  const gradeLevelsData = [
    { name: "Nursery", level: 0 },
    { name: "LKG", level: -1 },
    { name: "UKG", level: -2 },
    { name: "Class 1", level: 1 },
    { name: "Class 2", level: 2 },
    { name: "Class 3", level: 3 },
    { name: "Class 4", level: 4 },
    { name: "Class 5", level: 5 },
    { name: "Class 6", level: 6 },
    { name: "Class 7", level: 7 },
    { name: "Class 8", level: 8 },
    { name: "Class 9", level: 9 },
    { name: "Class 10", level: 10 },
    { name: "Class 11 (Science)", level: 11 },
    { name: "Class 11 (Commerce)", level: 111 },
    { name: "Class 11 (Arts)", level: 112 },
    { name: "Class 12 (Science)", level: 12 },
    { name: "Class 12 (Commerce)", level: 121 },
    { name: "Class 12 (Arts)", level: 122 },
  ];

  const gradeLevels: Record<string, any> = {};
  for (const g of gradeLevelsData) {
    const grade = await prisma.gradeLevel.upsert({
      where: { level: g.level },
      update: {},
      create: g,
    });
    gradeLevels[g.name] = grade;
  }
  console.log(`   ✓ ${gradeLevelsData.length} grade levels created`);

  // ── 6. Core Subjects ─────────────────────────────────────────
  console.log("📚 Seeding subjects...");
  const subjectsData = [
    { name: "English", code: "ENG" },
    { name: "Hindi", code: "HIN" },
    { name: "Mathematics", code: "MATH" },
    { name: "Science", code: "SCI" },
    { name: "Social Science", code: "SST" },
    { name: "Sanskrit", code: "SKT" },
    { name: "Computer Science", code: "CS" },
    { name: "Physics", code: "PHY" },
    { name: "Chemistry", code: "CHEM" },
    { name: "Biology", code: "BIO" },
    { name: "Accountancy", code: "ACC" },
    { name: "Business Studies", code: "BST" },
    { name: "Economics", code: "ECO" },
    { name: "History", code: "HIST" },
    { name: "Political Science", code: "POL" },
    { name: "Geography", code: "GEO" },
    { name: "Physical Education", code: "PE" },
    { name: "Art & Craft", code: "ART" },
    { name: "Music", code: "MUSIC" },
  ];

  const subjects: Record<string, any> = {};
  for (const s of subjectsData) {
    const subject = await prisma.subject.upsert({
      where: { code: s.code },
      update: {},
      create: s,
    });
    subjects[s.code] = subject;
  }
  console.log(`   ✓ ${subjectsData.length} subjects created`);

  // ── 7. Sections ──────────────────────────────────────────────
  console.log("🏷️  Seeding sections...");
  const sectionConfigs = [
    { gradeName: "Class 9", sections: ["A", "B", "C"] },
    { gradeName: "Class 10", sections: ["A", "B", "C"] },
    { gradeName: "Class 11 (Science)", sections: ["A"] },
    { gradeName: "Class 12 (Science)", sections: ["A"] },
  ];

  const createdSections: Record<string, any> = {};
  for (const config of sectionConfigs) {
    const grade = gradeLevels[config.gradeName];
    if (!grade) continue;
    for (const sectionName of config.sections) {
      const key = `${config.gradeName}-${sectionName}`;
      const existing = await prisma.section.findFirst({
        where: {
          gradeLevelId: grade.id,
          name: sectionName,
          academicYearId: academicYear.id,
        },
      });
      if (!existing) {
        const section = await prisma.section.create({
          data: {
            name: sectionName,
            gradeLevelId: grade.id,
            academicYearId: academicYear.id,
          },
        });
        createdSections[key] = section;
      } else {
        createdSections[key] = existing;
      }
    }
  }
  console.log(`   ✓ Sections created`);

  // ── 8. Teacher Profile ───────────────────────────────────────
  const teacherProfile = await prisma.teacherProfile.upsert({
    where: { userId: teacherUser.id },
    update: {},
    create: {
      userId: teacherUser.id,
      employeeId: "EMP001",
      designation: "PGT Mathematics",
      qualification: "M.Sc. Mathematics, B.Ed.",
      experience: 8,
      specialization: "Mathematics",
      joiningDate: new Date("2018-04-01"),
      isActive: true,
    },
  });

  // ── 9. Student Profile ───────────────────────────────────────
  const class9ASection = createdSections["Class 9-A"];
  const studentProfile = await prisma.studentProfile.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      admissionNo: "ADM250001",
      rollNo: "01",
      sectionId: class9ASection?.id ?? null,
      dateOfBirth: new Date("2011-07-15"),
      gender: "MALE",
      bloodGroup: "O+",
      category: "GENERAL",
      admissionDate: new Date("2025-04-01"),
      isActive: true,
    },
  });

  // ── 10. Parent Profile ───────────────────────────────────────
  const parentProfile = await prisma.parentProfile.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: {
      userId: parentUser.id,
      fatherName: "Suresh Singh",
      fatherPhone: "9876543210",
      fatherEmail: "parent@davschool.edu.in",
      fatherOccupation: "Engineer",
      motherName: "Meena Singh",
      motherPhone: "9876543211",
    },
  });

  // Link parent to student
  await prisma.parentStudent.upsert({
    where: {
      parentId_studentId: {
        parentId: parentProfile.id,
        studentId: studentProfile.id,
      },
    },
    update: {},
    create: {
      parentId: parentProfile.id,
      studentId: studentProfile.id,
      relation: "FATHER",
    },
  });
  console.log(`   ✓ Demo profiles linked`);

  // ── 11. CBSE Mandatory Disclosures ──────────────────────────
  console.log("📜 Seeding CBSE mandatory disclosures...");
  const disclosures = [
    // General Information
    { title: "Name of the School", category: DisclosureCategory.GENERAL_INFO, sortOrder: 1 },
    { title: "Affiliation No.", category: DisclosureCategory.GENERAL_INFO, sortOrder: 2 },
    { title: "School Code", category: DisclosureCategory.GENERAL_INFO, sortOrder: 3 },
    { title: "Complete Address with Pin Code", category: DisclosureCategory.GENERAL_INFO, sortOrder: 4 },
    { title: "Principal Name & Qualification", category: DisclosureCategory.GENERAL_INFO, sortOrder: 5 },
    { title: "School Email ID", category: DisclosureCategory.GENERAL_INFO, sortOrder: 6 },
    { title: "Contact Details (Landline/Mobile)", category: DisclosureCategory.GENERAL_INFO, sortOrder: 7 },
    // Documents & Certificates
    { title: "Copies of Affiliation/Upgradation Letter", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 1 },
    { title: "Copies of Society/Trust/Company Registration Certificate", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 2 },
    { title: "Copy of NOC issued by State/UT Govt.", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 3 },
    { title: "Copy of Recognition Certificate under RTE Act, 2009", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 4 },
    { title: "Copy of Valid Building Safety Certificate", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 5 },
    { title: "Copy of Valid Fire Safety Certificate", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 6 },
    { title: "Copy of DEO Certificate (Self Certification by School)", category: DisclosureCategory.DOCUMENTS_AND_CERTIFICATES, sortOrder: 7 },
    // Result & Academics
    { title: "Fee Structure of the School", category: DisclosureCategory.FEE_STRUCTURE, sortOrder: 1 },
    { title: "Annual Academic Calendar", category: DisclosureCategory.RESULT_AND_ACADEMICS, sortOrder: 1 },
    { title: "List of School Management Committee (SMC)", category: DisclosureCategory.RESULT_AND_ACADEMICS, sortOrder: 2 },
    { title: "List of Parents Teachers Association (PTA) Members", category: DisclosureCategory.RESULT_AND_ACADEMICS, sortOrder: 3 },
    { title: "Last Three-Year Result of the Board Examination", category: DisclosureCategory.RESULT_AND_ACADEMICS, sortOrder: 4 },
    // Infrastructure
    { title: "Details of Infrastructure and Other School Facilities", category: DisclosureCategory.SCHOOL_INFRASTRUCTURE, sortOrder: 1 },
  ];

  for (const d of disclosures) {
    await prisma.mandatoryDisclosure.create({ data: d });
  }
  console.log(`   ✓ ${disclosures.length} CBSE disclosures seeded`);

  // ── 12. Slider Items ─────────────────────────────────────────
  console.log("🎠 Seeding slider items...");
  const sliders = [
    {
      title: "Welcome to DAV Public School",
      subtitle: "Shaping the Future, One Child at a Time",
      description: "A premier CBSE-affiliated school dedicated to academic excellence and holistic development.",
      imageUrl: "/images/slider/slider-1.jpg",
      sortOrder: 1,
    },
    {
      title: "Admissions Open 2025-2026",
      subtitle: "Enroll Your Child Today",
      description: "Limited seats available for Classes Nursery to Class 12. Apply now.",
      imageUrl: "/images/slider/slider-2.jpg",
      linkUrl: "/admissions/apply",
      linkText: "Apply Now",
      sortOrder: 2,
    },
    {
      title: "Academic Excellence",
      subtitle: "100% Board Results Consistently",
      description: "Our students achieve outstanding results year after year.",
      imageUrl: "/images/slider/slider-3.jpg",
      linkUrl: "/academics",
      linkText: "Learn More",
      sortOrder: 3,
    },
  ];

  for (const slider of sliders) {
    await prisma.sliderItem.create({
      data: { ...slider, status: PublishStatus.PUBLISHED },
    });
  }
  console.log(`   ✓ ${sliders.length} slider items seeded`);

  // ── 13. Notices ──────────────────────────────────────────────
  console.log("📢 Seeding notices...");
  const notices = [
    {
      title: "Admissions Open for Session 2025-26",
      content: "We are pleased to announce that admissions are now open for the academic session 2025-2026 for classes Nursery to Class 9 and Class 11. Interested parents may collect the admission form from the school office.",
      category: "ADMISSION",
      isMarquee: true,
      isPinned: true,
      targetAudience: "ALL",
      publishedAt: new Date(),
      status: PublishStatus.PUBLISHED,
    },
    {
      title: "Half Yearly Examination Schedule",
      content: "The Half Yearly Examination for classes 1 to 12 will be held from September 15 to September 25, 2025. Detailed time table is available on the school notice board.",
      category: "EXAM",
      isMarquee: true,
      isPinned: false,
      targetAudience: "ALL",
      publishedAt: new Date(),
      status: PublishStatus.PUBLISHED,
    },
    {
      title: "Independence Day Celebration",
      content: "The school will celebrate Independence Day on August 15, 2025. All students are requested to attend the flag hoisting ceremony at 8:00 AM in their school uniform.",
      category: "GENERAL",
      isMarquee: false,
      isPinned: false,
      targetAudience: "ALL",
      publishedAt: new Date(),
      status: PublishStatus.PUBLISHED,
    },
    {
      title: "Parent-Teacher Meeting",
      content: "Parent-Teacher Meeting for Classes 9 and 11 will be held on August 30, 2025 from 9:00 AM to 1:00 PM. Parents are requested to attend without fail.",
      category: "GENERAL",
      isMarquee: false,
      isPinned: false,
      targetAudience: "PARENT",
      publishedAt: new Date(),
      status: PublishStatus.PUBLISHED,
    },
  ];

  for (const notice of notices) {
    await prisma.notice.create({ data: notice });
  }
  console.log(`   ✓ ${notices.length} notices seeded`);

  // ── 14. Events ───────────────────────────────────────────────
  console.log("🗓️  Seeding events...");
  const events = [
    {
      title: "Annual Sports Day 2025",
      slug: "annual-sports-day-2025",
      description: "The Annual Sports Day will be celebrated with great enthusiasm. Students from all classes will participate in various athletic events.",
      shortDesc: "Join us for our annual sports extravaganza!",
      venue: "School Sports Ground",
      startDate: new Date("2025-11-15"),
      endDate: new Date("2025-11-15"),
      status: PublishStatus.PUBLISHED,
      isImportant: true,
    },
    {
      title: "Annual Day & Cultural Program",
      slug: "annual-day-cultural-2025",
      description: "The Annual Day Celebration showcasing the talents of our students through dance, music, drama, and other cultural activities.",
      shortDesc: "A grand celebration of student talent and achievement.",
      venue: "School Auditorium",
      startDate: new Date("2025-12-20"),
      endDate: new Date("2025-12-20"),
      status: PublishStatus.PUBLISHED,
      isImportant: true,
    },
    {
      title: "Science Exhibition 2025",
      slug: "science-exhibition-2025",
      description: "Students from Classes 6 to 12 will showcase their innovative science projects and experiments.",
      shortDesc: "Innovation and creativity on display!",
      venue: "School Science Block",
      startDate: new Date("2025-10-05"),
      endDate: new Date("2025-10-06"),
      status: PublishStatus.PUBLISHED,
      isImportant: false,
    },
  ];

  for (const event of events) {
    await prisma.event.create({ data: event });
  }
  console.log(`   ✓ ${events.length} events seeded`);

  // ── 15. Fee Structure ────────────────────────────────────────
  console.log("💰 Seeding fee structures...");
  const class9Grade = gradeLevels["Class 9"];
  const class10Grade = gradeLevels["Class 10"];

  if (class9Grade && class10Grade) {
    const feeData = [
      {
        name: "Tuition Fee — Class 9",
        gradeLevelId: class9Grade.id,
        academicYearId: academicYear.id,
        category: "TUITION" as any,
        amount: 2500,
        frequency: "MONTHLY",
        isCompulsory: true,
      },
      {
        name: "Computer Fee — Class 9",
        gradeLevelId: class9Grade.id,
        academicYearId: academicYear.id,
        category: "COMPUTER" as any,
        amount: 300,
        frequency: "MONTHLY",
        isCompulsory: true,
      },
      {
        name: "Annual Charges — Class 9",
        gradeLevelId: class9Grade.id,
        academicYearId: academicYear.id,
        category: "ANNUAL_CHARGES" as any,
        amount: 5000,
        frequency: "ONE_TIME",
        isCompulsory: true,
      },
      {
        name: "Tuition Fee — Class 10",
        gradeLevelId: class10Grade.id,
        academicYearId: academicYear.id,
        category: "TUITION" as any,
        amount: 2800,
        frequency: "MONTHLY",
        isCompulsory: true,
      },
    ];

    for (const fee of feeData) {
      await prisma.feeStructure.create({ data: fee });
    }
    console.log(`   ✓ Fee structures seeded`);
  }

  // ── 16. Transport Routes ─────────────────────────────────────
  console.log("🚌 Seeding transport routes...");
  const routes = [
    {
      routeName: "Rajouri Garden Route",
      routeNo: "RT01",
      vehicleNo: "DL 1A 1234",
      driverName: "Ramesh Kumar",
      driverPhone: "9876543001",
      capacity: 40,
      monthlyFee: 1500,
      isActive: true,
    },
    {
      routeName: "Dwarka Route",
      routeNo: "RT02",
      vehicleNo: "DL 1B 5678",
      driverName: "Suresh Yadav",
      driverPhone: "9876543002",
      capacity: 45,
      monthlyFee: 1800,
      isActive: true,
    },
  ];

  for (const route of routes) {
    const r = await prisma.transportRoute.create({ data: route });
    // Add stops
    await prisma.transportStop.createMany({
      data: [
        { routeId: r.id, stopName: "Stop 1 — Metro Station", stopOrder: 1, pickupTime: "07:00", dropTime: "14:15" },
        { routeId: r.id, stopName: "Stop 2 — Market Chowk", stopOrder: 2, pickupTime: "07:15", dropTime: "14:00" },
        { routeId: r.id, stopName: "Stop 3 — Near School", stopOrder: 3, pickupTime: "07:30", dropTime: "13:45" },
      ],
    });
  }
  console.log(`   ✓ ${routes.length} transport routes seeded`);

  // ── 17. Staff Members ────────────────────────────────────────
  console.log("👨‍🏫 Seeding staff members...");
  const staffData = [
    {
      name: "Dr. Sunita Sharma",
      designation: "Principal",
      qualification: "Ph.D. (Education), M.Ed., M.A.",
      department: "Administration",
      category: StaffCategory.ADMINISTRATIVE,
      sortOrder: 1,
      showOnWebsite: true,
    },
    {
      name: "Mr. Anil Gupta",
      designation: "Vice Principal",
      qualification: "M.Ed., M.A. (History)",
      department: "Administration",
      category: StaffCategory.ADMINISTRATIVE,
      sortOrder: 2,
      showOnWebsite: true,
    },
    {
      name: "Ms. Priya Verma",
      designation: "PGT Mathematics",
      qualification: "M.Sc. Mathematics, B.Ed.",
      department: "Mathematics",
      category: StaffCategory.TEACHING,
      sortOrder: 3,
      showOnWebsite: true,
    },
    {
      name: "Mr. Rohit Sharma",
      designation: "PGT Physics",
      qualification: "M.Sc. Physics, B.Ed.",
      department: "Science",
      category: StaffCategory.TEACHING,
      sortOrder: 4,
      showOnWebsite: true,
    },
    {
      name: "Ms. Kavita Singh",
      designation: "TGT English",
      qualification: "M.A. English, B.Ed.",
      department: "Languages",
      category: StaffCategory.TEACHING,
      sortOrder: 5,
      showOnWebsite: true,
    },
  ];

  for (const staff of staffData) {
    await prisma.staffMember.create({
      data: { ...staff, status: PublishStatus.PUBLISHED },
    });
  }
  console.log(`   ✓ ${staffData.length} staff members seeded`);

  // ── 18. Testimonials ─────────────────────────────────────────
  console.log("💬 Seeding testimonials...");
  const testimonials = [
    {
      name: "Mrs. Anita Khanna",
      role: "Parent of Class 10 Student",
      content: "The school has an excellent academic environment. My child has grown tremendously both academically and personally. The teachers are dedicated and caring.",
      rating: 5,
      sortOrder: 1,
    },
    {
      name: "Arjun Mehta",
      role: "Alumni, Batch of 2022",
      content: "DAV School laid the foundation of my success. The values and education I received here have been invaluable in my engineering journey at IIT.",
      rating: 5,
      sortOrder: 2,
    },
    {
      name: "Mr. Vijay Patel",
      role: "Parent of Class 6 Student",
      content: "The school provides a holistic education approach. My daughter is excelling in both academics and extracurricular activities. Highly recommended!",
      rating: 5,
      sortOrder: 3,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: { ...t, status: PublishStatus.PUBLISHED },
    });
  }
  console.log(`   ✓ ${testimonials.length} testimonials seeded`);

  // ── 19. Exam Schedule ────────────────────────────────────────
  console.log("📝 Seeding exam schedule...");
  await prisma.examSchedule.create({
    data: {
      name: "Half Yearly Examination 2025",
      examType: ExamType.HALF_YEARLY,
      academicYearId: academicYear.id,
      startDate: new Date("2025-09-15"),
      endDate: new Date("2025-09-25"),
      gradeLevelIds: [class9Grade?.id ?? "", class10Grade?.id ?? ""].filter(Boolean),
      status: PublishStatus.PUBLISHED,
      instructions:
        "Students must carry their Admit Card and School ID. Mobile phones are strictly prohibited.",
    },
  });
  console.log(`   ✓ Exam schedule seeded`);

  // ── 20. Circulars ────────────────────────────────────────────
  console.log("📋 Seeding circulars...");
  await prisma.circular.create({
    data: {
      title: "Summer Vacation Notice 2025",
      content: "This is to inform all parents that the school will remain closed for Summer Vacation from May 26, 2025 to June 30, 2025. School will reopen on July 1, 2025.",
      circularNo: "CIR/2025/001",
      targetAudience: "ALL",
      issueDate: new Date("2025-05-15"),
      status: PublishStatus.PUBLISHED,
    },
  });
  console.log(`   ✓ Sample circular seeded`);

  console.log("\n✅ Seed completed successfully!\n");
  console.log("═══ Demo Login Credentials ═══════════════════════");
  console.log("  Super Admin : superadmin@davschool.edu.in / SuperAdmin@123");
  console.log("  Admin       : admin@davschool.edu.in      / Admin@1234");
  console.log("  Teacher     : teacher@davschool.edu.in    / Teacher@123");
  console.log("  Student     : student@davschool.edu.in    / Student@123");
  console.log("  Parent      : parent@davschool.edu.in     / Parent@123");
  console.log("═══════════════════════════════════════════════════\n");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
