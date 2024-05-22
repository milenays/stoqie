// pages/api/brands/[id].js
import dbConnect from '../../../lib/mongodb';
import Brand from '../../../models/Brand';

export default async function handler(req, res) {
  await dbConnect();

  const { 
    query: { id },
    method 
  } = req;

  switch (method) {
    case 'GET':
      try {
        const brand = await Brand.findById(id);
        if (!brand) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: brand });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const brand = await Brand.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!brand) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: brand });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedBrand = await Brand.deleteOne({ _id: id });
        if (!deletedBrand) {
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