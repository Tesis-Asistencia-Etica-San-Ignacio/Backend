import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydb';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Conectado a MongoDB correctamente');
    } catch (error) {
        console.error('❌ Error conectando a MongoDB:', error);
        throw error; // Evita que el servidor arranque sin DB
    }
};
