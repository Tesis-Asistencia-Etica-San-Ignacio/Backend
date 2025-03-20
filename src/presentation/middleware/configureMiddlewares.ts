import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

export const configureMiddlewares = (app: express.Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));

  app.use((req, res, next) => {
    req.setTimeout(5000, () => {
      console.log('⏳ Tiempo de espera agotado en la solicitud.');
      res.status(408).send('Timeout en la solicitud.');
    });
    next();
  });
};
