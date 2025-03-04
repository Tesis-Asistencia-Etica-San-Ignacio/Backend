import express from 'express';
import dotenv from 'dotenv';
import configureMiddlewares from './middleware';
import createEmailRoutes from './presentation/routes/emailRoutes';
import { ResendService } from './infrastructure/email/resendService.ts';
import { connectDB } from './infrastructure/database/mongo';
// import createUserRoutes from './presentation/routes/userRoutes';

dotenv.config();

const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);

// 2. Inyectar servicios
const resendService = new ResendService();
// const userService = new UserService(); // ejemplo, si tuvieras un userService

// 3. Registrar rutas
app.use('/api', createEmailRoutes(resendService));
// app.use('/api/users', createUserRoutes(userService));

const PORT = process.env.PORT || 3000;

// 4. Conectar a MongoDB y levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
/* connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ No se pudo conectar a MongoDB:', error);
  }); */
