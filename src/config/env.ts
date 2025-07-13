import dotenv from 'dotenv';

dotenv.config();

function getEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
}

export const env = {
  DB_HOST: getEnvVariable("DB_HOST"),
  DB_USER: getEnvVariable("DB_USER"),
  DB_PASSWORD: getEnvVariable("DB_PASSWORD"),
    DB_NAME: getEnvVariable("DB_NAME"),
  DB_PORT: Number(getEnvVariable("DB_PORT")),
  PORT: Number(getEnvVariable("PORT")),
};