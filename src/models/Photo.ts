// src/models/Photo.ts
import mongoose, { Schema } from 'mongoose';

const photoSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: "Uploaded Photo"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Photo = mongoose.models.Photo || mongoose.model('Photo', photoSchema);

export default Photo;