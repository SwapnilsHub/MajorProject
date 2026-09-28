import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  sellerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  images: string[];
  originalPrice: number;
  sellingPrice: number;
  condition: string;
  status: 'active' | 'pending' | 'sold' | 'deleted';
  location: string;
  college?: string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema(
  {
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    images: [{ type: String }],
    originalPrice: { type: Number, required: true, min: 0 },
    sellingPrice: { type: Number, required: true, min: 0 },
    condition: { 
      type: String, 
      required: true,
      enum: ['New', 'Like New', 'Excellent', 'Good', 'Fair', 'For Parts / Repair']
    },
    status: { 
      type: String, 
      default: 'active',
      enum: ['active', 'pending', 'sold', 'deleted']
    },
    location: { type: String, required: true },
    college: { type: String },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Prevent mongoose from recreating the model in dev environment
export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
