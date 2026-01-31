# 📱 Bajatel - Plataforma de Gestión de Servicios de Telecomunicaciones

> Trabajo de Fin de Grado - Desarrollo de Aplicaciones Web (DAW)  
> Aplicación web full-stack para la gestión de contratos de servicios de telecomunicaciones (Fibra, TV y Móvil)

---

## 🌐 URLs de Producción

- **Frontend**: [https://ramonmendoza13.github.io/TFGBajatel/](https://ramonmendoza13.github.io/TFGBajatel/)
- **Backend API**: [https://api-bajatel.onrender.com](https://api-bajatel.onrender.com)
- **Documentación API (Swagger)**: [https://api-bajatel.onrender.com/](https://api-bajatel.onrender.com/)

---

## 🔑 Credenciales de Prueba

Para probar la aplicación, puedes utilizar las siguientes credenciales de usuarios de prueba:

| Rol | Email | Contraseña | Descripción |
|-----|-------|------------|-------------|
| **Admin** | rmc1@email.com | RMC1 | Acceso completo al sistema |
| **Gestor** | fad@gmail.com | FAD1 | Gestión de contratos y servicios |
| **Cliente** | laura@gmail.com | LGP1 | Usuario cliente estándar |
| **Cliente** | paco@gmail.com | PSC1 | Usuario cliente estándar |

---

## 📋 Descripción del Proyecto

**Bajatel** es una aplicación web completa que permite a los usuarios gestionar contratos de servicios de telecomunicaciones. Los clientes pueden contratar, modificar y cancelar servicios de fibra óptica, televisión y líneas móviles, mientras que los administradores y gestores tienen acceso a funcionalidades avanzadas de gestión.

### Características Principales

- ✅ **Autenticación y autorización** mediante Laravel Sanctum
- ✅ **Gestión de contratos** (crear, editar, eliminar)
- ✅ **Servicios personalizables** (Fibra, TV, Móvil)
- ✅ **Panel de administración** para gestores y administradores
- ✅ **Interfaz responsive** adaptada a dispositivos móviles
- ✅ **API RESTful** completamente documentada con Swagger
- ✅ **Sistema de roles** (Admin, Gestor, Cliente)

---

## 🛠️ Tecnologías Utilizadas

### Backend
- **Laravel 12** - Framework PHP para el desarrollo de la API REST
- **PHP 8.2** - Lenguaje de programación del backend
- **SQLite** - Base de datos (producción en Render)
- **Laravel Sanctum** - Autenticación basada en tokens
- **L5-Swagger** - Generación automática de documentación API (OpenAPI 3.0)
- **PHPUnit** - Testing unitario e integración

### Frontend
- **React 19** - Librería JavaScript para interfaces de usuario
- **Vite 7** - Build tool y servidor de desarrollo
- **React Router DOM 7** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para consumir la API
- **TailwindCSS 3** - Framework CSS utility-first
- **Lucide React** - Iconos modernos
- **React Helmet Async** - Gestión de metadatos SEO

### DevOps y Deployment
- **Docker** - Contenedorización del backend
- **GitHub Pages** - Hosting del frontend
- **Render** - Hosting del backend y API
- **GitHub Actions** - CI/CD (opcional)

---

## 📁 Estructura del Proyecto

```
Bajatel/
├── API_BAJATEL/              # Backend Laravel
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/  # Controladores de la API
│   │   │   ├── Requests/     # Validación de peticiones
│   │   │   └── Middleware/   # Middleware personalizado
│   │   └── Models/           # Modelos Eloquent
│   ├── database/
│   │   ├── migrations/       # Migraciones de base de datos
│   │   └── seeders/          # Datos de prueba
│   ├── routes/
│   │   └── api.php           # Definición de rutas API
│   ├── tests/                # Tests unitarios e integración
│   ├── Dockerfile            # Configuración Docker
│   └── composer.json         # Dependencias PHP
│
└── front_bajatel/            # Frontend React
    ├── src/
    │   ├── components/       # Componentes reutilizables
    │   ├── pages/            # Páginas de la aplicación
    │   ├── api/              # Servicios API (Axios)
    │   ├── context/          # Context API (AuthContext)
    │   ├── hooks/            # Custom hooks
    │   └── App.jsx           # Componente principal
    ├── public/               # Archivos estáticos
    └── package.json          # Dependencias JavaScript
```

---

## 🚀 Instalación y Configuración Local

### Requisitos Previos
- PHP >= 8.2
- Composer
- Node.js >= 18
- SQLite3

### Backend (Laravel)

```bash
# Navegar al directorio del backend
cd API_BAJATEL

# Instalar dependencias
composer install

# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Crear base de datos SQLite
touch database/database.sqlite

# Ejecutar migraciones
php artisan migrate

# Ejecutar seeders (datos de prueba)
php artisan db:seed

# Generar documentación Swagger
php artisan l5-swagger:generate

# Iniciar servidor de desarrollo
php artisan serve
```

La API estará disponible en `http://localhost:8000`

### Frontend (React)

```bash
# Navegar al directorio del frontend
cd front_bajatel

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📚 Documentación de la API

La documentación completa de la API está disponible mediante Swagger UI:

- **Local**: [http://localhost:8000/](http://localhost:8000/)
- **Producción**: [https://api-bajatel.onrender.com/](https://api-bajatel.onrender.com/)

### Endpoints Principales

#### Autenticación
- `POST /api/registro` - Registro de nuevos usuarios
- `POST /api/login` - Inicio de sesión
- `POST /api/logout` - Cierre de sesión

#### Servicios
- `GET /api/servicios/disponibles` - Listar servicios disponibles

#### Contratos (requiere autenticación)
- `GET /api/contratos/mostrar` - Listar contratos del usuario
- `POST /api/contratos/contratar` - Crear nuevo contrato
- `PUT /api/contratos/editar/{id}` - Editar contrato
- `DELETE /api/contratos/eliminar/{id}` - Eliminar contrato

#### Administración (requiere rol admin/gestor)
- `GET /api/admin/servicios/mostrar` - Listar todos los servicios
- `POST /api/admin/fibra/crear` - Crear opción de fibra
- `PUT /api/admin/fibra/editar/{id}` - Editar opción de fibra
- `DELETE /api/admin/fibra/eliminar/{id}` - Eliminar opción de fibra
- *(Similar para TV y Móvil)*

---

## 🧪 Testing

### Backend (PHPUnit)

```bash
cd API_BAJATEL

# Ejecutar todos los tests
php artisan test

# Ejecutar tests con cobertura
php artisan test --coverage
```

Los tests incluyen:
- **Tests Unitarios**: Validación de modelos y lógica de negocio
- **Tests de Integración**: Validación de endpoints API

---

## 🌍 Deployment

### Backend (Render)

El backend está desplegado en Render utilizando Docker:

1. El `Dockerfile` configura el entorno PHP 8.2
2. El `entrypoint.sh` ejecuta migraciones y seeders automáticamente
3. La aplicación se sirve en el puerto 8000

### Frontend (GitHub Pages)

El frontend está desplegado en GitHub Pages:

```bash
cd front_bajatel

# Build y deploy
npm run deploy
```

Esto ejecuta automáticamente:
1. `npm run build` - Genera la carpeta `dist/`
2. `gh-pages -d dist` - Publica en la rama `gh-pages`

---

## 👥 Roles y Permisos

| Rol | Permisos |
|-----|----------|
| **Cliente** | Ver y gestionar sus propios contratos |
| **Gestor** | Gestionar servicios y ver todos los contratos |
| **Admin** | Acceso completo al sistema (CRUD de servicios, usuarios, contratos) |

---

## 📝 Licencia

Este proyecto es un Trabajo de Fin de Grado desarrollado con fines académicos.

---

## 👨‍💻 Autor

**Ramón Mendoza Candelario**  
Ciclo Formativo de Grado Superior - Desarrollo de Aplicaciones Web (DAW)  
Año académico: 2025-2026

---

## 📧 Contacto

Para cualquier consulta sobre el proyecto, puedes contactar a través de:
- GitHub: [@Ramonmendoza13](https://github.com/Ramonmendoza13)
- Email: ramonm828@gmail.com
---