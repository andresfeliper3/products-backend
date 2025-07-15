# 🧪 Full Stack Product Management App

Aplicación full stack para gestión de productos, usando PostgreSQL, Node.js, TypeScript, Express, React y Vite.

---

## Clonar proyecto

```
git clone https://github.com/andresfeliper3/products-project.git
```

## 🚀 OPCIÓN 1: Ejecutar con Docker

### 1. Requisitos

- Tener instalado [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

### 2. Instrucciones

```bash
# Desde la raíz del proyecto
docker-compose up --build
```

### 3. Acceso a servicios

- Frontend: http://localhost:5173

- Backend API Swagger: http://localhost:3000/api-docs

- Base de datos PostgreSQL:

    - host: localhost

    - puerto: 5432

    - usuario: postgres

    - contraseña: postgres

    - base de datos: productsdb

El archivo db/init.sql se ejecuta automáticamente y crea la tabla products con los datos de prueba.

## 💻 OPCIÓN 2: Ejecutar localmente sin Docker


### 1. Configurar PostgreSQL
Tener PostgreSQL instalado en tu máquina.

Se debe tener configurado el archivo backend/.env con los Stos correctos:
```
DB_HOST=localhost
DB_USER=
DB_PASSWORD=
DB_NAME=products_db
DB_PORT=5432
PORT=3000
FRONTEND_URL=http://localhost:5173
```

#### Opción A: Usar script SQL
1. Inicia sesión en PostgreSQL:
```
psql -U postgres
```
2. Crea la base de datos:
```
CREATE DATABASE productsdb;
\c productsdb
```
3. Ejecuta el archivo _init.sql_, de esta forma desde la raíz del proyecto o acceder con una ruta absoluta desde psql:
```
\i /db/init.sql
```

#### Opción B: Usar Sequelize
Instala las dependencias en el backend:

```
cd backend
npm install 
npm install --save-dev sequelize-cli
```
Para ejecutar las migraciones y los seeders de la base de datos:

```
npm run migrate
npm run seed
```
o también

```
npm reset
```
### 2. Ejecutar el backend
Desde la raíz del proyecto:
```
cd backend
npm install
npm run dev
```
El servidor estará disponible en http://localhost:3000

### 3. Ejecutar el frontend
Desde la raíz del proyecto:
```
cd frontend
npm install
npm run dev 
```
La app estará disponible en http://localhost:5173

Debe haber un archivo .env en /frontend con esta variable:
```
    VITE_API_URL=http://localhost:3000/api
```


