import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone?: string;
  college?: string;
  profileImage?: string;
  location?: string;
  verificationStatus: 'unverified' | 'student' | 'college' | 'trusted';
  createdAt: Date;
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    college: { type: String },
    profileImage: { type: String },
    location: { type: String },
    verificationStatus: { 
      type: String, 
      default: 'unverified',
      enum: ['unverified', 'student', 'college', 'trusted']
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
