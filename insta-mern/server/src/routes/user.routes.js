import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProfile, follow, unfollow, updateProfile } from '../controllers/user.controller.js';

export const userRouter = Router();

userRouter.get('/:username', getProfile);
userRouter.put('/me', requireAuth, updateProfile);
userRouter.post('/:userId/follow', requireAuth, follow);
userRouter.post('/:userId/unfollow', requireAuth, unfollow);