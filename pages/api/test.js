// pages/api/test.js

import dbConnect from '../../lib/mongodb';

export default async function handler(req, res) {
  await dbConnect();

  res.json({ message: 'MongoDB connection success!' });
}