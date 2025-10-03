import { Router } from 'express';
import { UsersController } from './users.controller';
import { authenticateToken } from '../../common/middleware/auth.middleware';

const router = Router();
const usersController = new UsersController();

router.get('/profile', authenticateToken, (req, res, next) =>
  usersController.getProfile(req, res, next)
);
router.patch('/profile', authenticateToken, (req, res, next) =>
  usersController.updateProfile(req, res, next)
);

export default router;
