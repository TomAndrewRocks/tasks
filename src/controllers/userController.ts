import { NextFunction, Request, Response } from 'express';
import User from '../models/userModel';

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
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        error: 'Oops',
        message: 'User already registered',
      });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).send({
      error: 'Registration failed',
      message: error,
    });
  }
};

export { createUser, getAllUsers, getUserById };
