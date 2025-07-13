import express from 'express';
import productRoutes from './routes/product.routes';
import { sequelize } from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', productRoutes);

// Verifica la conexión y sincroniza modelos
sequelize.authenticate()
  .then(() => console.log('DB conectada'))
  .then(() => sequelize.sync()) // crea tabla si no existe
  .catch(err => console.error('Error al conectar a DB:', err));

export default app;
