import mongoose from 'mongoose';

export interface IPost extends mongoose.Document {
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new mongoose.Schema<IPost>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true,
      maxlength: 200
    },
    content: { 
      type: String, 
      required: true 
    },
    slug: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true,
      trim: true
    },
  },
  { 
    timestamps: true 
  }
);

// Prevent duplicate models
export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema); 