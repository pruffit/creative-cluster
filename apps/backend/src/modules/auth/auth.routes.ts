import { Router } from 'express';
import { AuthController } from './auth.controller';
import { authenticateToken } from '../../common/middleware/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/sign-up', (req, res, next) => authController.signUp(req, res, next));
router.post('/sign-in', (req, res, next) => authController.signIn(req, res, next));
router.post('/refresh', (req, res, next) => authController.refreshToken(req, res, next));
router.post('/sign-out', authenticateToken, (req, res) => authController.signOut(req, res));
router.get('/me', authenticateToken, (req, res, next) => authController.getMe(req, res, next));

export default router;