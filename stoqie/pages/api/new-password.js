// pages/api/new-password.js
import dbConnect from '../../lib/mongodb';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'POST':
      try {
        const { user, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.updateOne({ _id: user }, { password: hashedPassword });

        res.status(200).json({ message: 'Password has been updated successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error updating password' });
      }
      break;
    default:
      res.status(400).json({ message: 'Method not allowed' });
  }
}