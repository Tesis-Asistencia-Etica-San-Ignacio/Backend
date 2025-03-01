import mongoose from 'mongoose';

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