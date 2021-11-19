import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '../errors/AppError';
import '../typeorm';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(errors());

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((request: Request, response: Response, next: NextFunction) => {
  return response.status(404).json({
    status: 'error',
    message: 'Not found.',
  });
});

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  }
);

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('Server started on port 3333.'));
