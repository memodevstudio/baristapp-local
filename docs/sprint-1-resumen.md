# 🧾 Sprint 1 - Documentación

## 🎯 Objetivo
Configurar el entorno de desarrollo local y construir una API funcional con Express, PostgreSQL y Prisma que permita registrar usuarios.

---

## ✅ Tareas realizadas

- [x] Creación del repositorio Git (`baristapp-local`)
- [x] Estructura inicial de carpetas (`src/`, `routes/`, `controllers/`, `prisma/`)
- [x] Archivo `.gitignore` configurado
- [x] Configuración de servidor Express con endpoint `/`
- [x] Configuración del archivo `.env`
- [x] Instalación de PostgreSQL local
- [x] Creación de la base de datos `baristapp`
- [x] Instalación y configuración de Prisma
- [x] Definición del primer modelo (`User`)
- [x] Ejecución de migración (`prisma migrate dev`)
- [x] Generación del cliente Prisma (`prisma generate`)
- [x] Implementación de rutas API `/api/users` (GET y POST)
- [x] Pruebas exitosas con `curl` y navegador (`http://localhost:3000/api/users`)

---

## 📦 Modelo creado

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
