import { Router } from 'express';
import { body } from 'express-validator';
import { login, register, me, logout } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  [
    body('username').isLength({ min: 3 }),
    body('email').isEmail(),
    body('name').notEmpty(),
    body('password').isLength({ min: 6 }),
  ],
  register
);

authRouter.post(
  '/login',
  [
    body('emailOrUsername').notEmpty(),
    body('password').notEmpty(),
  ],
  login
);

authRouter.get('/me', requireAuth, me);

authRouter.post('/logout', requireAuth, logout);