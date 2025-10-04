-- CreateEnum
CREATE TYPE "YogaStyle" AS ENUM ('HATHA', 'VINYASA', 'YIN', 'NIDRA', 'KUNDALINI');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "DifficultyLevel" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'ALL');

-- CreateEnum
CREATE TYPE "BlogCategory" AS ENUM ('PRACTICE', 'PHILOSOPHY', 'HEALTH', 'LIFESTYLE');

-- CreateTable
CREATE TABLE "YogaInstructor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "avatar" TEXT,
    "experience" INTEGER NOT NULL,
    "certifications" TEXT[],
    "instagram" TEXT,
    "telegram" TEXT,
    "vk" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YogaInstructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YogaInstructorSpecialization" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "style" "YogaStyle" NOT NULL,

    CONSTRAINT "YogaInstructorSpecialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "YogaClass" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "style" "YogaStyle" NOT NULL,
    "instructorId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "level" "DifficultyLevel" NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "currentParticipants" INTEGER NOT NULL DEFAULT 0,
    "price" DECIMAL(10,2) NOT NULL,
    "image" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "YogaClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "classesCount" INTEGER NOT NULL,
    "validityDays" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "discount" INTEGER,
    "features" TEXT[],
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogPost" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT,
    "authorId" TEXT NOT NULL,
    "category" "BlogCategory" NOT NULL,
    "tags" TEXT[],
    "readingTime" INTEGER NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "YogaInstructorSpecialization_instructorId_idx" ON "YogaInstructorSpecialization"("instructorId");

-- CreateIndex
CREATE INDEX "YogaClass_instructorId_idx" ON "YogaClass"("instructorId");

-- CreateIndex
CREATE INDEX "YogaClass_dayOfWeek_idx" ON "YogaClass"("dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_slug_idx" ON "BlogPost"("slug");

-- CreateIndex
CREATE INDEX "BlogPost_authorId_idx" ON "BlogPost"("authorId");

-- CreateIndex
CREATE INDEX "BlogPost_category_idx" ON "BlogPost"("category");

-- AddForeignKey
ALTER TABLE "YogaInstructorSpecialization" ADD CONSTRAINT "YogaInstructorSpecialization_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "YogaInstructor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YogaClass" ADD CONSTRAINT "YogaClass_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "YogaInstructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "YogaInstructor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
