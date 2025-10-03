import { Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

import { AppError } from '@/common/middleware/errorHandler';
import { AuthenticatedRequest } from '../../common/middleware/auth.middleware';
import { refreshTokenSchema, signInSchema, signUpSchema } from '@/utils/validation';

const authService = new AuthService();

export class AuthController {
  async signUp(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = signUpSchema.parse(req.body);
      const result = await authService.signUp(validatedData);

      res.status(201).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        return next(new AppError(400, 'Validation failed'));
      }
      next(error);
    }
  }

  async signIn(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = signInSchema.parse(req.body);
      const result = await authService.signIn(validatedData);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        return next(new AppError(400, 'Validation failed'));
      }
      next(error);
    }
  }

  async refreshToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const validatedData = refreshTokenSchema.parse(req.body);
      const result = await authService.refreshToken(validatedData.refreshToken);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        return next(new AppError(400, 'Validation failed'));
      }
      next(error);
    }
  }

  async getMe(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError(401, 'Authentication required');
      }

      const user = await authService.getMe(req.user.userId);

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async signOut(_req: AuthenticatedRequest, res: Response) {
    res.status(200).json({
      status: 'success',
      message: 'Signed out successfully',
    });
  }
}