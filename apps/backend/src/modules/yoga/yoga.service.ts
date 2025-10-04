import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class YogaService {
  async getActiveClasses() {
    return prisma.yogaClass.findMany({
      where: { isActive: true },
      include: {
        instructor: {
          include: {
            specializations: true,
          },
        },
      },
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }

  async getActiveSubscriptions() {
    return prisma.subscription.findMany({
      where: { isActive: true },
      orderBy: { price: 'asc' },
    });
  }

  async getInstructors() {
    return prisma.yogaInstructor.findMany({
      include: {
        specializations: true,
      },
      orderBy: { experience: 'desc' },
    });
  }

  async getPublishedPosts() {
    return prisma.blogPost.findMany({
      where: { isPublished: true },
      include: {
        author: {
          include: {
            specializations: true,
          },
        },
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async getPostBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug, isPublished: true },
      include: {
        author: {
          include: {
            specializations: true,
          },
        },
      },
    });
  }
}
