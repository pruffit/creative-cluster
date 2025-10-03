import { PrismaClient } from '@prisma/client';
import { AppError } from '@/common/middleware/errorHandler';

const prisma = new PrismaClient();

export class UsersService {
  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        locale: true,
        theme: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  async updateProfile(
    userId: string,
    data: {
      firstName?: string;
      lastName?: string;
      locale?: string;
      theme?: 'LIGHT' | 'DARK' | 'SYSTEM';
    }
  ) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        locale: true,
        theme: true,
      },
    });

    return user;
  }
}
