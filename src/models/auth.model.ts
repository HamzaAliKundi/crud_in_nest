import * as mongoose from 'mongoose';
export const authSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  },
);
