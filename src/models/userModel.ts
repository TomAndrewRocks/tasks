import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
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
    type: String,
    default: Date.now(),
  },
  tasks: {
    type: [
      {
        task: {
          type: Schema.Types.ObjectId,
          ref: 'ITask',
        },
      },
    ],
  },
});

const User = mongoose.model('User', UserSchema);

export default User;
