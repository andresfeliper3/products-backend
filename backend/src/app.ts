import express from 'express';
import productRoutes from './routes/product.route';
import { sequelize } from './config/database';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Product routes
app.use('/api/products', productRoutes);

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .then(() => sequelize.sync())
  .catch((err: unknown) => console.error('DB connection error:', err));

export default app;
