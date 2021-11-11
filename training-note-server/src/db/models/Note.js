import mongoose, { Schema } from 'mongoose';

const noteSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  deleted: { type: Boolean, required: true, default: false },
  sharedWith: [{ type: String }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Note', noteSchema);
