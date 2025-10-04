import {
  PrismaClient,
  UserRole,
  YogaStyle,
  DayOfWeek,
  DifficultyLevel,
  BlogCategory,
} from '@prisma/client';
import { AppError } from '@/common/middleware/errorHandler';

const prisma = new PrismaClient();

export class AdminService {

  async getAllUsers(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          username: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async updateUserRole(userId: string, role: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return prisma.user.update({
      where: { id: userId },
      data: { role: role as UserRole },
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
      },
    });
  }

  async getAllInstructors() {
    return prisma.yogaInstructor.findMany({
      include: {
        specializations: true,
        _count: {
          select: {
            classes: true,
            blogPosts: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createInstructor(data: {
    name: string;
    bio: string;
    avatar?: string;
    experience: number;
    certifications: string[];
    specializations: string[];
    instagram?: string;
    telegram?: string;
    vk?: string;
  }) {
    return prisma.yogaInstructor.create({
      data: {
        name: data.name,
        bio: data.bio,
        avatar: data.avatar,
        experience: data.experience,
        certifications: data.certifications,
        instagram: data.instagram,
        telegram: data.telegram,
        vk: data.vk,
        specializations: {
          create: data.specializations.map(style => ({
            style: style as YogaStyle,
          })),
        },
      },
      include: {
        specializations: true,
      },
    });
  }

  async updateInstructor(
    id: string,
    data: {
      name?: string;
      bio?: string;
      avatar?: string;
      experience?: number;
      certifications?: string[];
      specializations?: string[];
      instagram?: string;
      telegram?: string;
      vk?: string;
    }
  ) {
    const instructor = await prisma.yogaInstructor.findUnique({ where: { id } });
    if (!instructor) {
      throw new AppError(404, 'Instructor not found');
    }

    if (data.specializations) {
      await prisma.yogaInstructorSpecialization.deleteMany({
        where: { instructorId: id },
      });
    }

    return prisma.yogaInstructor.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.bio && { bio: data.bio }),
        ...(data.avatar !== undefined && { avatar: data.avatar }),
        ...(data.experience && { experience: data.experience }),
        ...(data.certifications && { certifications: data.certifications }),
        ...(data.instagram !== undefined && { instagram: data.instagram }),
        ...(data.telegram !== undefined && { telegram: data.telegram }),
        ...(data.vk !== undefined && { vk: data.vk }),
        ...(data.specializations && {
          specializations: {
            create: data.specializations.map(style => ({
              style: style as YogaStyle,
            })),
          },
        }),
      },
      include: {
        specializations: true,
      },
    });
  }

  async deleteInstructor(id: string) {
    const instructor = await prisma.yogaInstructor.findUnique({ where: { id } });
    if (!instructor) {
      throw new AppError(404, 'Instructor not found');
    }

    await prisma.yogaInstructor.delete({ where: { id } });
  }

  async getAllClasses() {
    return prisma.yogaClass.findMany({
      include: {
        instructor: {
          include: {
            specializations: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createClass(data: {
    title: string;
    description: string;
    style: string;
    instructorId: string;
    dayOfWeek: string;
    startTime: string;
    duration: number;
    level: string;
    maxParticipants: number;
    price: number;
    image?: string;
  }) {
    return prisma.yogaClass.create({
      data: {
        title: data.title,
        description: data.description,
        style: data.style as YogaStyle,
        instructorId: data.instructorId,
        dayOfWeek: data.dayOfWeek as DayOfWeek,
        startTime: data.startTime,
        duration: data.duration,
        level: data.level as DifficultyLevel,
        maxParticipants: data.maxParticipants,
        price: data.price,
        image: data.image,
      },
      include: {
        instructor: true,
      },
    });
  }

  async updateClass(
    id: string,
    data: {
      title?: string;
      description?: string;
      style?: string;
      instructorId?: string;
      dayOfWeek?: string;
      startTime?: string;
      duration?: number;
      level?: string;
      maxParticipants?: number;
      price?: number;
      image?: string;
      isActive?: boolean;
    }
  ) {
    const yogaClass = await prisma.yogaClass.findUnique({ where: { id } });
    if (!yogaClass) {
      throw new AppError(404, 'Class not found');
    }

    return prisma.yogaClass.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.description && { description: data.description }),
        ...(data.style && { style: data.style as YogaStyle }),
        ...(data.instructorId && { instructorId: data.instructorId }),
        ...(data.dayOfWeek && { dayOfWeek: data.dayOfWeek as DayOfWeek }),
        ...(data.startTime && { startTime: data.startTime }),
        ...(data.duration && { duration: data.duration }),
        ...(data.level && { level: data.level as DifficultyLevel }),
        ...(data.maxParticipants && { maxParticipants: data.maxParticipants }),
        ...(data.price && { price: data.price }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
      include: {
        instructor: true,
      },
    });
  }

  async deleteClass(id: string) {
    const yogaClass = await prisma.yogaClass.findUnique({ where: { id } });
    if (!yogaClass) {
      throw new AppError(404, 'Class not found');
    }

    await prisma.yogaClass.delete({ where: { id } });
  }

  async getAllSubscriptions() {
    return prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async createSubscription(data: {
    name: string;
    description: string;
    classesCount: number;
    validityDays: number;
    price: number;
    discount?: number;
    features: string[];
    isPopular?: boolean;
  }) {
    return prisma.subscription.create({
      data: {
        name: data.name,
        description: data.description,
        classesCount: data.classesCount,
        validityDays: data.validityDays,
        price: data.price,
        discount: data.discount,
        features: data.features,
        isPopular: data.isPopular || false,
      },
    });
  }

  async updateSubscription(
    id: string,
    data: {
      name?: string;
      description?: string;
      classesCount?: number;
      validityDays?: number;
      price?: number;
      discount?: number;
      features?: string[];
      isPopular?: boolean;
      isActive?: boolean;
    }
  ) {
    const subscription = await prisma.subscription.findUnique({ where: { id } });
    if (!subscription) {
      throw new AppError(404, 'Subscription not found');
    }

    return prisma.subscription.update({
      where: { id },
      data,
    });
  }

  async deleteSubscription(id: string) {
    const subscription = await prisma.subscription.findUnique({ where: { id } });
    if (!subscription) {
      throw new AppError(404, 'Subscription not found');
    }

    await prisma.subscription.delete({ where: { id } });
  }

  async getAllPosts() {
    return prisma.blogPost.findMany({
      include: {
        author: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createPost(data: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    authorId: string;
    category: string;
    tags: string[];
    readingTime: number;
    isPublished?: boolean;
  }) {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      throw new AppError(400, 'Post with this slug already exists');
    }

    return prisma.blogPost.create({
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        authorId: data.authorId,
        category: data.category as BlogCategory,
        tags: data.tags,
        readingTime: data.readingTime,
        isPublished: data.isPublished || false,
        publishedAt: data.isPublished ? new Date() : null,
      },
      include: {
        author: true,
      },
    });
  }

  async updatePost(
    id: string,
    data: {
      title?: string;
      slug?: string;
      excerpt?: string;
      content?: string;
      image?: string;
      category?: string;
      tags?: string[];
      readingTime?: number;
      isPublished?: boolean;
    }
  ) {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      throw new AppError(404, 'Post not found');
    }

    if (data.slug && data.slug !== post.slug) {
      const existingPost = await prisma.blogPost.findUnique({
        where: { slug: data.slug },
      });
      if (existingPost) {
        throw new AppError(400, 'Post with this slug already exists');
      }
    }

    const wasPublished = post.isPublished;
    const willBePublished = data.isPublished !== undefined ? data.isPublished : wasPublished;

    return prisma.blogPost.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title }),
        ...(data.slug && { slug: data.slug }),
        ...(data.excerpt && { excerpt: data.excerpt }),
        ...(data.content && { content: data.content }),
        ...(data.image !== undefined && { image: data.image }),
        ...(data.category && { category: data.category as BlogCategory }),
        ...(data.tags && { tags: data.tags }),
        ...(data.readingTime && { readingTime: data.readingTime }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        ...(!wasPublished && willBePublished && { publishedAt: new Date() }),
      },
      include: {
        author: true,
      },
    });
  }

  async deletePost(id: string) {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) {
      throw new AppError(404, 'Post not found');
    }

    await prisma.blogPost.delete({ where: { id } });
  }
}
