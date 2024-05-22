import dbConnect from '../../../lib/mongodb';
import User from '../../../models/User';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });

  // HTTP Methodları için belirtilmiş otorum ve yetki kontrolleri
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ message: 'Not authorized' });
  }

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    case 'POST':
      try {
        if (!session || session.user.role !== 'admin') {
          return res.status(401).json({ success: false, message: 'Not authorized' });
        }
        const user = await User.create(req.body);
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
    default:
      res.status(400).json({ success: false, message: 'Method not allowed' });
      break;
  }
}