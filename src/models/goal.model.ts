import * as mongoose from 'mongoose';

export const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    goal: String,
  },
  {
    timestamps: true,
  },
);
