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
} from './presentation/routes';
import { contIntroRouter } from './presentation'; 
import contInfoGeneralRouter from './presentation/routes/contInfoGeneral.router';
import evaluacionRouter from './presentation/routes/evaluacion.router';
import promptRouter from './presentation/routes/prompt.router';

import authRouter from './presentation/routes/auth.router';
import { validateRoleMiddleware } from './presentation/middleware/jwtMiddleware';
// Crear la aplicación Express
const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Routes
app.use(`${config.api.conventionApi}/user`, userRouter);
app.use(`${config.api.conventionApi}/contIntro`, contIntroRouter);
app.use(`${config.api.conventionApi}/contInfoGeneral`, contInfoGeneralRouter);
app.use(`${config.api.conventionApi}/evaluacion`, evaluacionRouter);
app.use(`${config.api.conventionApi}/cases`, caseRouter);
app.use(`${config.api.conventionApi}/prompt`, promptRouter);
app.use('/auth', authRouter);

// En alguna ruta protegida
app.use('/api/investigador', validateRoleMiddleware, validateRoleMiddleware(['INVESTIGADOR']), (req: express.Request, res: express.Response) => {
  res.json({ message: 'Acceso autorizado solo para Investigadores' });
});





// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor Express funcionando correctamente');
});

// 3. Middleware para manejo de errores
app.use(errorHandlerMiddleware);


const bcrypt = require('bcryptjs');

/* async function encryptPassword() {
    const password = "123456";
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log("Contraseña encriptada:", hashedPassword);
}

encryptPassword(); */


// Conectar la base de datos antes de iniciar el servidor
const startServer = async () => {
  
  try {
    await database.connect(); // Ensure DB is connected before starting the server
    app.listen(config.server.port, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${config.server.port}`);
/*       encryptPassword()
 */    });
  } catch (error) {
    console.error('❌ Error al iniciar la aplicación:', error);
    process.exit(1);
  }
};

// Iniciar la aplicación
startServer();
