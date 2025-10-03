import { PrismaClient } from '@prisma/client';
import { AppError } from '@/common/middleware/errorHandler';
import { hashPassword, comparePassword } from '../../utils/password';
import { generateTokenPair } from '../../utils/jwt';
import { SignUpInput, SignInInput } from '../../utils/validation';
import { AuthResponse } from './types';

const prisma = new PrismaClient();

export class AuthService {
  async signUp(data: SignUpInput): Promise<AuthResponse> {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { username: data.username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        throw new AppError(400, 'User with this email already exists');
      }
      throw new AppError(400, 'Username is already taken');
    }

    const passwordHash = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        passwordHash,
        firstName: data.firstName,
        lastName: data.lastName,
        role: 'CUSTOMER',
      },
    });

    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens,
    };
  }

  async signIn(data: SignInInput): Promise<AuthResponse> {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError(401, 'Invalid email or password');
    }

    const isPasswordValid = await comparePassword(data.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid email or password');
    }

    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens,
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const { verifyRefreshToken } = await import('../../utils/jwt');

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new AppError(401, 'Invalid refresh token');
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new AppError(401, 'User not found');
    }

    const tokens = generateTokenPair({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tokens,
    };
  }

  async getMe(userId: string) {
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
}
