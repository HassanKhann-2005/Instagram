import { User } from '../models/User.js';

export const getProfile = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

export const follow = async (req, res) => {
  const targetId = req.params.userId;
  if (targetId === req.user.id) return res.status(400).json({ message: 'Cannot follow yourself' });
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $addToSet: { followers: req.user.id } });
  res.json({ ok: true });
};

export const unfollow = async (req, res) => {
  const targetId = req.params.userId;
  await User.findByIdAndUpdate(req.user.id, { $pull: { following: targetId } });
  await User.findByIdAndUpdate(targetId, { $pull: { followers: req.user.id } });
  res.json({ ok: true });
};

export const updateProfile = async (req, res) => {
  const { name, bio, avatarUrl } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: { name, bio, avatarUrl } },
    { new: true }
  ).select('-password');
  res.json({ user });
};