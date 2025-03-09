import express from 'express';
//	Habilita acceso a la API desde otros dominios
import cors from 'cors';
//Protege contra ataques web
import helmet from 'helmet';
//Registra logs de cada solicitud HTTP
import morgan from 'morgan';

const configureMiddlewares = (app: express.Application) => {
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

export default configureMiddlewares;
