import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    authentication: {
      password: {
        type: String,
        required: true,
        select: false,
      },
      salt: {
        type: String,
        select: false,
      },
      sessionToken: { type: String, select: false },
      type: Object,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

const User = model('User', UserSchema);

export default User;
