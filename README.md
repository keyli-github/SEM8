# 🚀 Lab07 - Monorepo (Backend + Frontend)

Este es un **monorepo** que contiene tanto el backend (Express/Node.js) como el frontend (React/Vite) en un mismo repositorio.

## 📁 Estructura del Proyecto

```
lab07/
├── backend/           # API REST con Express.js
├── react-frontend/    # Aplicación React con Vite
├── package.json       # Package.json del monorepo
└── pnpm-workspace.yaml # Configuración de pnpm workspaces
```

## 📋 Requisitos Previos

- **Node.js** (v18+)
- **pnpm** (v8+) - Gestor de paquetes

Para instalar pnpm:
```bash
npm install -g pnpm
```

## 🔧 Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone https://github.com/keyli-github/SEM8.git
cd lab07
pnpm install
```

## ▶️ Ejecutar la Aplicación

### Opción 1: Ejecutar Backend y Frontend juntos (recomendado)

```bash
pnpm dev
```

Esto ejecutará:
- **Backend**: http://localhost:3001
- **Frontend**: http://localhost:5180

### Opción 2: Ejecutar por separado

**Backend:**
```bash
pnpm dev:backend
```
Accede en: http://localhost:3001

**Frontend:**
```bash
pnpm dev:frontend
```
Accede en: http://localhost:5180

## 🏗️ Build para Producción

```bash
pnpm build
```

Esto compilará:
- Backend (si aplica)
- Frontend en `react-frontend/dist/`

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|------------|
| `pnpm dev` | Ejecuta backend y frontend en desarrollo |
| `pnpm dev:backend` | Solo backend |
| `pnpm dev:frontend` | Solo frontend |
| `pnpm build` | Build de producción |
| `pnpm start:backend` | Inicia el servidor |

## 🔐 Variables de Entorno

El backend necesita configuración de base de datos. Crea un archivo `.env` en `backend/`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_datos
```

También hay un archivo `.env.example` como referencia.

## 🌐 Comunicación Backend-Frontend

- El frontend (Vite) tiene un proxy configurado en `vite.config.js`
- Las rutas `/api/*` se redirigen automáticamente a `http://localhost:3001`
- No necesitas configurar CORS manualmente durante desarrollo

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/signup` - Registrar usuario
- `POST /api/auth/signin` - Iniciar sesión

### Usuario
- `GET /api/test/all` - Acceso público
- `GET /api/test/user` - Requiere autenticación
- `GET /api/test/mod` - Requiere rol moderador
- `GET /api/test/admin` - Requiere rol admin

## ✅ Testing

Ejecutar tests:
```bash
pnpm test
```

## 🚀 Despliegue

Para desplegar a Render u otro servicio, consulta los archivos de configuración en cada carpeta.

---

**Creado con ❤️ como monorepo en Node.js**
