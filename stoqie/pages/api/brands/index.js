// pages/api/brands/index.js
import dbConnect from '../../../lib/mongodb';
import Brand from '../../../models/Brand';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const brands = await Brand.find({});
        res.status(200).json({ success: true, data: brands });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const brand = await Brand.create(req.body);
        res.status(201).json({ success: true, data: brand });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}