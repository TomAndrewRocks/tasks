import mongoose from 'mongoose';
import express, {
  NextFunction,
  Request,
  Response,
} from 'express';
import { app } from './app';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

dotenv.config();

const port: string | undefined = process.env.PORT;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    app.use(
      (req: Request, res: Response, next: NextFunction) => {
        res.setHeader(
          'Access-Control-Allow-Origin',
          `${process.env.ORIGIN}`,
        );
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        );
        res.setHeader(
          'Access-Control-Allow-Headers',
          'Origin, Content-Type, X-Auth-Token',
        );
        next();
      },
    );
    app.use(express.json());
    app.use(
      '/swagger',
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument),
    );
    app.listen(port, () =>
      console.log(`Server running on ${port}`),
    );
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Connection Fail', error);
  }
};

startServer();
