# 🚀 Guía de Despliegue en Render

## Opción 1: Deploy Automatizado (Recomendado)

### Paso 1: Conectar tu repositorio GitHub

1. Ve a [render.com](https://render.com)
2. **Sign Up** o inicia sesión con GitHub
3. En el dashboard, haz clic en **+ New +** → **Web Service**
4. Selecciona **Connect a repository**
5. Autoriza Render para acceder a tus repositorios GitHub
6. Selecciona: `keyli-github/SEM8`

### Paso 2: Configurar el Backend (Express API)

1. **Name**: `lab07-backend` (o el nombre que prefieras)
2. **Environment**: Node
3. **Build Command**: 
   ```
   cd backend && pnpm install
   ```
4. **Start Command**:
   ```
   cd backend && pnpm start
   ```
5. **Region**: Elige la más cercana (ej: Ohio)

### Paso 3: Variables de Entorno - Backend

En la sección **Environment**, agrega estas variables:

| Variable | Valor | Descripción |
|----------|-------|------------|
| `DB_HOST` | `localhost` o tu host BD | Host de MySQL/PostgreSQL |
| `DB_USER` | Tu usuario BD | Usuario de base de datos |
| `DB_PASSWORD` | Tu contraseña BD | Contraseña de BD |
| `DB_NAME` | `lab07` | Nombre de la base de datos |
| `DB_PORT` | `3306` (MySQL) o `5432` (PostgreSQL) | Puerto de BD |
| `DB_DIALECT` | `mysql` o `postgres` | Tipo de base de datos |
| `JWT_SECRET` | `tu_clave_secreta_aqui` | Clave para firmar tokens JWT |
| `NODE_ENV` | `production` | Entorno de producción |

**Ejemplo de valores reales:**
```
DB_HOST=db.example.com
DB_USER=admin
DB_PASSWORD=MiContraseña123!
DB_NAME=lab07_db
DB_PORT=3306
DB_DIALECT=mysql
JWT_SECRET=oT9hX2mK7vB4cN1pQ8rL5sZ3dF6gJ9wE
NODE_ENV=production
```

### Paso 4: Crear Servicio Frontend (React)

1. **+ New +** → **Web Service**
2. Conecta el mismo repositorio GitHub
3. **Name**: `lab07-frontend`
4. **Environment**: Node
5. **Build Command**:
   ```
   cd react-frontend && pnpm install && pnpm build
   ```
6. **Start Command**:
   ```
   npx serve -s react-frontend/dist -l 3000
   ```

O mejor aún, usa **Static Site**:
- **+ New +** → **Static Site**
- **Name**: `lab07-frontend`
- **Build Command**:
  ```
  cd react-frontend && pnpm install && pnpm build
  ```
- **Publish Directory**: `react-frontend/dist`

### Paso 5: Conectar Frontend con Backend

En `react-frontend/src/services/AuthService.js`, cambia:

```javascript
// Desarrollo
const API_URL = "/api/auth/";

// Producción - Descomenta la línea según tu dominio en Render
// const API_URL = "https://lab07-backend.onrender.com/api/auth/";
```

O mejor, usa una variable de entorno. Crea `.env` en `react-frontend/`:

```env
VITE_API_URL=https://lab07-backend.onrender.com/api
```

Luego en `AuthService.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL + "/auth/";
```

---

## Opción 2: Deploy Manual (CLI)

Si prefieres usar la línea de comandos:

```bash
# 1. Instala Render CLI
npm install -g render

# 2. Autentica
render login

# 3. Deploya
render deploy
```

---

## 🔑 Datos Importantes para Render

### Backend URL (después de desplegar)
```
https://lab07-backend.onrender.com
```

### Frontend URL (después de desplegar)
```
https://lab07-frontend.onrender.com
```

### CORS para Render
Actualiza `backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    "http://localhost:5180",  // Desarrollo
    "https://lab07-frontend.onrender.com"  // Producción
  ],
  credentials: true
};
```

---

## ⚠️ Problemas Comunes

### "Module not found: pnpm"
- Render instala pnpm automáticamente, pero asegúrate de tener `pnpm-lock.yaml` en el repo

### Backend no responde
- Verifica que la variable `PORT` esté configurada correctamente
- El default es 3000, pero Express usa 3001 en `server.js`

Solución en `backend/server.js`:
```javascript
const PORT = process.env.PORT || 3001;
```

### Base de datos no conecta
- Verifica todas las variables de entorno en Render dashboard
- Asegúrate que tu BD es accesible desde internet
- Si usas MySQL local, deberás subir la BD a un servicio como PlanetScale o Railway

---

## 📊 Opciones de Bases de Datos (Gratuitas/Baratas)

| BD | Servicio | Plan Gratuito |
|----|---------|----|
| MySQL | PlanetScale | 5GB |
| PostgreSQL | Railway | $5/mes |
| MongoDB | MongoDB Atlas | 512MB |

---

## ✅ Resumen Rápido

1. ✅ Conecta tu GitHub a Render
2. ✅ Crea servicio para **Backend** (Node)
3. ✅ Crea servicio para **Frontend** (Static Site)
4. ✅ Agrega variables de entorno
5. ✅ Configura la BD
6. ✅ Actualiza URLs de API en el frontend
7. ✅ ¡Deploy automático en cada push a GitHub!

---

¿Necesitas ayuda con algún paso específico? 🚀
