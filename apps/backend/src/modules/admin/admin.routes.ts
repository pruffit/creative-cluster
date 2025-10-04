import { Router } from 'express';
import { AdminController } from './admin.controller';
import { authenticateToken, requireRole } from '@/common/middleware/auth.middleware';

const router = Router();
const adminController = new AdminController();

router.use(authenticateToken);
router.use(requireRole('ADMIN'));

router.get('/users', (req, res, next) => adminController.getAllUsers(req, res, next));
router.patch('/users/:userId/role', (req, res, next) =>
  adminController.updateUserRole(req, res, next)
);

router.get('/instructors', (req, res, next) => adminController.getAllInstructors(req, res, next));
router.post('/instructors', (req, res, next) => adminController.createInstructor(req, res, next));
router.patch('/instructors/:id', (req, res, next) =>
  adminController.updateInstructor(req, res, next)
);
router.delete('/instructors/:id', (req, res, next) =>
  adminController.deleteInstructor(req, res, next)
);

router.get('/classes', (req, res, next) => adminController.getAllClasses(req, res, next));
router.post('/classes', (req, res, next) => adminController.createClass(req, res, next));
router.patch('/classes/:id', (req, res, next) => adminController.updateClass(req, res, next));
router.delete('/classes/:id', (req, res, next) => adminController.deleteClass(req, res, next));

router.get('/subscriptions', (req, res, next) =>
  adminController.getAllSubscriptions(req, res, next)
);
router.post('/subscriptions', (req, res, next) =>
  adminController.createSubscription(req, res, next)
);
router.patch('/subscriptions/:id', (req, res, next) =>
  adminController.updateSubscription(req, res, next)
);
router.delete('/subscriptions/:id', (req, res, next) =>
  adminController.deleteSubscription(req, res, next)
);

router.get('/posts', (req, res, next) => adminController.getAllPosts(req, res, next));
router.post('/posts', (req, res, next) => adminController.createPost(req, res, next));
router.patch('/posts/:id', (req, res, next) => adminController.updatePost(req, res, next));
router.delete('/posts/:id', (req, res, next) => adminController.deletePost(req, res, next));

export default router;
