import { validationResult } from 'express-validator';
import { Post } from '../models/Post.js';
import { Comment } from '../models/Comment.js';

export const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
  if (!imageUrl) return res.status(400).json({ message: 'Image is required' });
  const post = await Post.create({ author: req.user.id, imageUrl, caption: req.body.caption || '' });
  res.status(201).json({ post });
};

export const getFeed = async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit || '10', 10)));
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .populate('author', 'username name avatarUrl');
  res.json({ posts });
};

export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate('author', 'username name avatarUrl');
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json({ post });
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (String(post.author) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  res.json({ ok: true });
};

export const likePost = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.postId, { $addToSet: { likes: req.user.id } });
  res.json({ ok: true });
};

export const unlikePost = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.postId, { $pull: { likes: req.user.id } });
  res.json({ ok: true });
};

export const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const comment = await Comment.create({ post: req.params.postId, author: req.user.id, text: req.body.text });
  await Post.findByIdAndUpdate(req.params.postId, { $inc: { commentsCount: 1 } });
  res.status(201).json({ comment });
};

export const listComments = async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: 1 }).populate('author', 'username name avatarUrl');
  res.json({ comments });
};