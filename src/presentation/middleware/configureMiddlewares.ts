import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

export const configureMiddlewares = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));

  app.use(helmet());
  app.use(morgan('dev'));

  app.use((req, res, next) => {
    req.setTimeout(15000, () => {
      console.log('⏳ Tiempo de espera agotado en la solicitud.');
      res.status(408).send('Timeout en la solicitud.');
    });
    next();
  });
};
