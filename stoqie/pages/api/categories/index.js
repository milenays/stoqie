// pages/api/categories/index.js
import dbConnect from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const categories = await Category.find({});
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const category = await Category.create(req.body);
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}