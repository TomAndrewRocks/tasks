import express, { Application } from 'express';
import router from './routes/routes';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api', router);

export { app };
