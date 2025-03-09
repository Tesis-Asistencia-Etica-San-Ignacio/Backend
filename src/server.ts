// /src/server.ts
import express from 'express';
import dotenv from 'dotenv';
import configureMiddlewares from './presentation/middleware';
import createEmailRoutes from './presentation/routes/emailRoutes';
import { SmtpService } from './infrastructure/email/SmtpService'; // <-- Importa SmtpService
// import { connectDB } from './infrastructure/database/mongo';
// import createUserRoutes from './presentation/routes/userRoutes';

dotenv.config();

const app = express();

// 1. Aplicar middlewares
configureMiddlewares(app);

// 2. Inyectar servicios
const smtpService = new SmtpService(); // <-- Usar SMTP
// const userService = new UserService(); // ejemplo, si tuvieras un userService

// 3. Registrar rutas
app.use('/api', createEmailRoutes(smtpService));
// app.use('/api/users', createUserRoutes(userService));

const PORT = process.env.PORT || 3000;

// 4. Conectar a MongoDB y levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
/*
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ No se pudo conectar a MongoDB:', error);
  });
*/
