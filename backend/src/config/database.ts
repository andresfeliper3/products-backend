import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { env } from "./env";


dotenv.config();

export const sequelize = new Sequelize(
  env.DB_NAME!,
  env.DB_USER!,
  env.DB_PASSWORD!,
  {
    host: env.DB_HOST,
    dialect: 'postgres',
    port: Number(env.DB_PORT),
    logging: false,
  }
);
