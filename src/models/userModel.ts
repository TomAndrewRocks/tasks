import mongoose, { Schema } from 'mongoose';
import { ITask } from './taskModel';

export interface IUser {
  username: string;
  email: string;
  authentication: any;
  createdAt: Date;
  tasks: ITask[];
}

const UserSchema = new mongoose.Schema<IUser>({
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
    type: Date,
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
