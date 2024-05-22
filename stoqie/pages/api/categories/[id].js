// pages/api/categories/[id].js
import dbConnect from '../../../lib/mongodb';
import Category from '../../../models/Category';

export default async function handler(req, res) {
  await dbConnect();

  const { 
    query: { id },
    method 
  } = req;

  switch (method) {
    case 'GET':
      try {
        const category = await Category.findById(id);
        if (!category) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const category = await Category.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!category) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedCategory = await Category.deleteOne({ _id: id });
        if (!deletedCategory) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}