import { Response, NextFunction } from 'express';
import { AdminService } from './admin.service';
import { AppError } from '@/common/middleware/errorHandler';
import { AuthenticatedRequest } from '@/common/middleware/auth.middleware';

const adminService = new AdminService();

export class AdminController {

  async getAllUsers(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await adminService.getAllUsers(page, limit);

      res.status(200).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserRole(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { role } = req.body;

      if (!role) {
        throw new AppError(400, 'Role is required');
      }

      const user = await adminService.updateUserRole(userId, role);

      res.status(200).json({
        status: 'success',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllInstructors(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const instructors = await adminService.getAllInstructors();

      res.status(200).json({
        status: 'success',
        data: instructors,
      });
    } catch (error) {
      next(error);
    }
  }

  async createInstructor(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const instructor = await adminService.createInstructor(req.body);

      res.status(201).json({
        status: 'success',
        data: instructor,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateInstructor(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const instructor = await adminService.updateInstructor(id, req.body);

      res.status(200).json({
        status: 'success',
        data: instructor,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteInstructor(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await adminService.deleteInstructor(id);

      res.status(200).json({
        status: 'success',
        message: 'Instructor deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllClasses(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const classes = await adminService.getAllClasses();

      res.status(200).json({
        status: 'success',
        data: classes,
      });
    } catch (error) {
      next(error);
    }
  }

  async createClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const yogaClass = await adminService.createClass(req.body);

      res.status(201).json({
        status: 'success',
        data: yogaClass,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const yogaClass = await adminService.updateClass(id, req.body);

      res.status(200).json({
        status: 'success',
        data: yogaClass,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteClass(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await adminService.deleteClass(id);

      res.status(200).json({
        status: 'success',
        message: 'Class deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllSubscriptions(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const subscriptions = await adminService.getAllSubscriptions();

      res.status(200).json({
        status: 'success',
        data: subscriptions,
      });
    } catch (error) {
      next(error);
    }
  }

  async createSubscription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const subscription = await adminService.createSubscription(req.body);

      res.status(201).json({
        status: 'success',
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateSubscription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const subscription = await adminService.updateSubscription(id, req.body);

      res.status(200).json({
        status: 'success',
        data: subscription,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteSubscription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await adminService.deleteSubscription(id);

      res.status(200).json({
        status: 'success',
        message: 'Subscription deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const posts = await adminService.getAllPosts();

      res.status(200).json({
        status: 'success',
        data: posts,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const post = await adminService.createPost(req.body);

      res.status(201).json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const post = await adminService.updatePost(id, req.body);

      res.status(200).json({
        status: 'success',
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await adminService.deletePost(id);

      res.status(200).json({
        status: 'success',
        message: 'Post deleted successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}
