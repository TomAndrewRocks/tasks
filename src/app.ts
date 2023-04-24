import express, {
  Application
} from 'express';
import router from './routes/routes';
import cors from 'cors';

const app: Application = express();

app.use(express.json());
app.use(
  cors(),
);
app.use('/api', router);
// app.use(
//   (req: Request, res: Response, next: NextFunction) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', '*');
//     res.setHeader('Access-Control-Allow-Headers', '*');
//     next();
//     app.use(
//       cors({
//         origin: true,
//         credentials: true
//       }),
//     );
//   },
// );

export { app };
