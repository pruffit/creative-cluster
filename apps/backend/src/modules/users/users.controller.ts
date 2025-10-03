import { Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { AppError } from '@/common/middleware/errorHandler';
import { AuthenticatedRequest } from '../../common/middleware/auth.middleware';

const usersService = new UsersService();

export class UsersController {
  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError(401, 'Authentication required');
      }

      const user = await usersService.getUserById(req.user.userId);

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        throw new AppError(401, 'Authentication required');
      }

      const { firstName, lastName, locale, theme } = req.body;

      const user = await usersService.updateProfile(req.user.userId, {
        firstName,
        lastName,
        locale,
        theme,
      });

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}