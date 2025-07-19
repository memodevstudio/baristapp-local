# 🏁 Sprint 2 - Crear Usuario (Local)

## 🎯 Objetivo principal
Implementar la funcionalidad de creación de usuarios en el sistema local, permitiendo registrar usuarios desde un formulario en el frontend, conectándose a una API backend con Express y base de datos Prisma (PostgreSQL local).

---

## ✅ Tareas completadas

### 🔧 Configuración inicial
- Inicialización del frontend con **Next.js 15** usando `create-next-app`
- Creación de estructura de carpetas (`components`, `pages`, `types`)
- Instalación y configuración de dependencias necesarias

### 🧪 Backend (Express + Prisma)
- Configuración del servidor con `Express`
- Conexión a base de datos local usando Prisma
- Creación de modelo `User` en el schema de Prisma
- Rutas:
  - `POST /api/users` → para crear usuarios
  - `GET /api/users` → para listar usuarios

### 🧩 Frontend (Next.js + TypeScript)
- Componente `UserForm` con formulario funcional
- Componente `UserList` para visualizar los usuarios registrados
- Creación de carpeta `types/` para manejar la interfaz `User`
- Conexión con backend usando `fetch()`
- Uso de `useState` y `useEffect` para manejar estado y recarga dinámica de lista

### 🛡️ Validaciones
- Validación de campos vacíos en el formulario
- Validación del formato de correo electrónico
- Mensajes de error y éxito personalizados

### 🧼 Organización del código
- Separación de componentes (`UserForm.tsx`, `UserList.tsx`)
- Uso de **CSS Modules** (`UserForm.module.css`, `UserList.module.css`)
- Limpieza de lógica innecesaria (evitar duplicaciones)

---

## 📘 Aprendizajes y decisiones clave

- Decidimos **enfocarnos solo en crear usuarios** para entender a profundidad cómo interactúan frontend, backend y base de datos.
- Mover la validación al frontend fue un paso importante para mejorar la experiencia del usuario.
- Separar los tipos en `types/User.ts` permite escalar el proyecto sin repetir código ni cometer errores.
- Acordamos dejar Azure para otro sprint y primero dominar la lógica local.

---

## 📌 Pendientes
- Validar desde backend si el email ya existe (en un futuro sprint)
- Mejorar estilo visual con diseño más profesional
- Agregar tests (unitarios o manuales) de funcionalidad

---

## 🌐 Versión en inglés (opcional)
_Pendiente de traducción si se requiere documentación bilingüe._

---

## 🗂️ Archivos involucrados
- `backend/src/index.js`
- `backend/src/controllers/userController.js`
- `backend/src/routes/userRoutes.js`
- `frontend/pages/index.tsx`
- `frontend/components/UserForm.tsx`
- `frontend/components/UserList.tsx`
- `frontend/types/User.ts`

---

## 💬 Comentario personal
> Este sprint fue clave para entender cómo conectar todas las capas del sistema. Aunque el objetivo era simple (crear un usuario), me ayudó a ordenar mi arquitectura y comenzar a trabajar como si fuera una empresa real. 
> — Guillermo
