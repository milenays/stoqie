// models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  uniqueID: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: 150,
  },
  stockCode: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  fakeStock: {
    type: Number,
    required: false,
  },
  criticalStock: {
    type: Number,
    required: false,
  },
  marketPrice: {
    type: Number,
    required: false,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  shelfCode: {
    type: String,
    required: true,
  },
  areaCode: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);