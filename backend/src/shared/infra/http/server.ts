import 'reflect-metadata';
import 'express-async-errors';
import '../typeorm';
import '../../container';
import express, { NextFunction, Request, Response } from 'express';
import AppError from '../../errors/AppError';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

app.use((request: Request, response: Response, next: NextFunction) => {
  return response.status(404).json({
    status: 'error',
    message: 'Not found.',
  });
  next();
});

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    });
    next();
  }
);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server started on port 3333.'));
