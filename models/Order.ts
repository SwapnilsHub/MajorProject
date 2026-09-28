import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId;
  sellerId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
  amount: number;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  trackingId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema(
  {
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    amount: { type: Number, required: true, min: 0 },
    paymentStatus: { 
      type: String, 
      default: 'pending',
      enum: ['pending', 'completed', 'failed', 'refunded']
    },
    deliveryMethod: { 
      type: String, 
      required: true,
      enum: ['pickup', 'delivery']
    },
    deliveryAddress: { type: String },
    status: { 
      type: String, 
      default: 'placed',
      enum: ['placed', 'confirmed', 'preparing', 'shipped', 'delivered', 'cancelled']
    },
    trackingId: { type: String }
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
