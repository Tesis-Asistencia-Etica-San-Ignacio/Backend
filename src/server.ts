import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Conexión a MongoDB usando una variable de entorno
const MONGO_URI = process.env.MONGO_URI || 'mongodb://prueba123:prueba123@mongo:27017/mydb?authSource=admin';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conectado a MongoDB correctamente');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    process.exit(1);
  }
};

// Ejemplo de ruta (definida en interfaces/routes, por ejemplo)
app.get('/', (req, res) => {
    res.send('carlos es una mierda :3');
});


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});