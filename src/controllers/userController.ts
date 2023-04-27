import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';
import {
  authentication,
  randomPass,
} from '../utils/hashPass';

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find();
  try {
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.params.id;
  try {
    return User.findById(userId).then((user) =>
      user
        ? res.status(200).json({ user: user })
        : res
            .status(404)
            .json({ message: 'User not found!' }),
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: 'Oops',
        message: 'User already registered',
      });
    }

    if (!username || !password || !email) {
      return res.status(422).json({
        error: 'Fields not filled',
        message: 'Please fill all the required fields!',
      });
    }

    const salt = randomPass();

    const user = await User.create({
      username,
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send({
      error: 'Registration failed',
      message: error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const cookieSecret = `${process.env.COOKIE_SECRET}`;

  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(422).json({
        message: 'Fill your email!',
      });
    }
    if (!password) {
      return res.status(422).json({
        message: 'Fill your email password!',
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      console.log(user);
      return res.status(400).json({
        message: 'User not signed up',
      });
    }

    const expectedHash = authentication(
      user.authentication.salt,
      password,
    );

    if (user.authentication.password !== expectedHash) {
      return res.status(422).json({
        message: 'Invalid password!',
      });
    }

    const salt = randomPass();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString(),
    );

    await user.save();

    res.cookie(
      cookieSecret,
      user.authentication.sessionToken,
      {
        domain: 'localhost',
        path: '/',
      },
    );

    return res.status(201).json({
      message: 'Successfully signed in!',
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export { createUser, getAllUsers, getUserById, loginUser };
