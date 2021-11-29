import mongoose, { Schema } from 'mongoose';

const userSchema = mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date, required: true },
  password: { type: String, required: true },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
  refreshToken: { type: String, default: null },
});

export default mongoose.model('User', userSchema);
