import express from 'express';
import {
  configureMiddlewares,
  errorHandlerMiddleware,
} from './presentation/middleware';
import config from './infrastructure/config';
import { database } from './infrastructure';
import {
  caseRouter,
  userRouter,
  contIntroRouter,
  contInfoGeneralRouter,
  evaluacionRouter,
  promptRouter,
  authRouter
} from './presentation/routes';

// 1 Crear la aplicación Express
const app = express();

configureMiddlewares(app);


// 2 Definición de rutas protegidas para cada rol
app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(`${config.api.conventionApi}/contIntro`, contIntroRouter);
app.use(`${config.api.conventionApi}/contInfoGeneral`, contInfoGeneralRouter);
app.use(`${config.api.conventionApi}/evaluacion`, evaluacionRouter);
app.use(`${config.api.conventionApi}/cases`, caseRouter);
app.use(`${config.api.conventionApi}/prompt`, promptRouter);
app.use(`${config.api.conventionApi}/auth`, authRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

// 3. Middleware para manejo de errores
app.use(errorHandlerMiddleware);



// Conectar la base de datos antes de iniciar el servidor
const startServer = async () => {

  try {
    await database.connect(); // Ensure DB is connected before starting the server
    app.listen(config.server.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${config.server.port}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer();
