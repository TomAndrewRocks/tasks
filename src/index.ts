import mongoose from 'mongoose';
import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import { app } from './app';
import dotenv from 'dotenv';

dotenv.config();

const port: string | undefined = process.env.PORT;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    app.use(
      (req: Request, res: Response, next: NextFunction) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
      },
    );
    app.use(express.json());
    app.listen(port, () =>
      console.log(`Server running on ${port}`),
    );
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Connection Fail', error);
  }
};

startServer();
