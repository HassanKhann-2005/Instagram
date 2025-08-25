import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { User } from '../models/User.js';

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { username, email, name, password } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { username }] });
  if (exists) return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ username, email, name, password });
  const token = createToken(user._id);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.COOKIE_SECURE === 'true', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.status(201).json({ user: { id: user._id, username: user.username, name: user.name, email: user.email, avatarUrl: user.avatarUrl } });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { emailOrUsername, password } = req.body;
  const user = await User.findOne({ $or: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }] }).select('+password');
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
  const token = createToken(user._id);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: process.env.COOKIE_SECURE === 'true', maxAge: 7 * 24 * 60 * 60 * 1000 });
  res.json({ user: { id: user._id, username: user.username, name: user.name, email: user.email, avatarUrl: user.avatarUrl } });
};

export const me = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json({ user: { id: user._id, username: user.username, name: user.name, email: user.email, avatarUrl: user.avatarUrl } });
};

export const logout = async (_req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
};