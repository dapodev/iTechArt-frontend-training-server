import mongoose, { Schema } from 'mongoose';

const noteSchema = new mongoose.Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  id: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
  deleted: { type: Boolean, required: true, default: false },
});

export default mongoose.model('Note', noteSchema);
