import { Router, Request, Response, NextFunction } from 'express';
import { YogaService } from './yoga.service';

const router = Router();
const yogaService = new YogaService();

router.get('/classes', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const classes = await yogaService.getActiveClasses();
    res.status(200).json({
      status: 'success',
      data: classes,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/subscriptions', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const subscriptions = await yogaService.getActiveSubscriptions();
    res.status(200).json({
      status: 'success',
      data: subscriptions,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/instructors', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const instructors = await yogaService.getInstructors();
    res.status(200).json({
      status: 'success',
      data: instructors,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/blog', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await yogaService.getPublishedPosts();
    res.status(200).json({
      status: 'success',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/blog/:slug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await yogaService.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({
        status: 'error',
        message: 'Post not found',
      });
    }
    res.status(200).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
