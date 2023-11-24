import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.route';

const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//application routes
app.use('/POST/api', userRoutes);
app.use('/GET/api', userRoutes);
app.use('/GET/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
