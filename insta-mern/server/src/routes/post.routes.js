import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { body } from 'express-validator';
import { requireAuth } from '../middleware/auth.js';
import { createPost, getFeed, getPost, deletePost, likePost, unlikePost, addComment, listComments } from '../controllers/post.controller.js';

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads';
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, path.join(process.cwd(), 'server', UPLOAD_DIR)),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname || '.jpg');
    cb(null, `${unique}${ext}`);
  },
});

const upload = multer({ storage });

export const postRouter = Router();

postRouter.get('/', getFeed);
postRouter.get('/:postId', getPost);
postRouter.post('/', requireAuth, upload.single('image'), [body('caption').optional().isLength({ max: 2200 })], createPost);
postRouter.delete('/:postId', requireAuth, deletePost);
postRouter.post('/:postId/like', requireAuth, likePost);
postRouter.post('/:postId/unlike', requireAuth, unlikePost);
postRouter.get('/:postId/comments', listComments);
postRouter.post('/:postId/comments', requireAuth, [body('text').isLength({ min: 1, max: 500 })], addComment);