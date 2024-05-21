// pages/api/profile.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const { name } = req.body;

        const user = await User.findByIdAndUpdate(
          session.user.id,
          { name },
          { new: true }
        );

        res.status(200).json({ message: 'Profile updated successfully', user });
      } catch (error) {
        res.status(400).json({ message: 'Error updating profile' });
      }
      break;
    default:
      res.status(400).json({ message: 'Method not allowed' });
  }
}