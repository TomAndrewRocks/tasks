import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from 'express';
import router from './routes/routes';

const app: Application = express();

app.use(express.json());
app.use('/api', router);
app.use(
  (req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
  },
);


export { app };
