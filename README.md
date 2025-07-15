# 📦 Full Stack Product Management App

Aplicación full stack para listar, crear y eliminar productos con React + Node + PostgreSQL.

---

## 📁 Estructura del Proyecto
project/
├── backend/ → API REST en Node.js + Express + TypeScript
├── frontend/ → Interfaz en React + Vite + TypeScript
├── seed.sql → Script SQL para crear la tabla y poblarla


## ⚙️ Requisitos Previos
- Node.js ≥ 18
- PostgreSQL ≥ 12
- npm 
- Un editor de texto como VSCode


## 🗄️ 1. Configurar Base de Datos

1. Abre tu terminal y entra a PostgreSQL:

```bash
psql -U tu_usuario
``` 

2. Crea la base de datos y entra en ella:

```
CREATE DATABASE productsdb;
\c productsdb
```


3. Ejecuta el script SQL para crear la tabla e insertar los datos:
```
\i path/a/tu/project/seed.sql
```

## 🗄️ 2. Ejecutar el backend
1. Crea un archivo .env en la carpeta de /backend con el siguiente contenido:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=productsdb
```
2. Dentro de la carpeta /backend, ejecuta 
```
npm install
npm run dev
```

El Swagger de backend se ejecutará en
_http://localhost:3000/api-docs_

## 🗄️ 3. Ejecutar el frontend

1. Crea un archivo .env en la carpeta /frontend con el siguiente contenido:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

1. Dentro de la carpeta /frontend, ejecuta 
```
npm install
npm run dev
```