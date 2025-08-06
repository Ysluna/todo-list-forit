# Todo List ForIT

Aplicación básica de lista de tareas creada como challenge para ingreso a la Academia ForIT 2025.

---

## Descripción

Esta aplicación permite gestionar tareas básicas: crear, leer, actualizar y eliminar (CRUD).  
Está desarrollada con React (Next.js con `use client`), usando hooks para el manejo de estado, y un backend básico en Express (con almacenamiento en memoria).

Cumple con los requisitos del challenge, incluyendo:

- API REST con Express y endpoints para CRUD de tareas.
- Frontend con React usando Vite/Next.js.
- Uso de fetch para llamadas a la API.
- Filtrado y ordenación de tareas.
- Estilos simples con Tailwind CSS.
- Manejo básico de errores y estado de carga.
- Uso de TypeScript en frontend y backend.

---

## Tecnologías usadas

- React 18 / Next.js 13 (app router)
- TypeScript
- Express.js (backend)
- Tailwind CSS (estilos)
- Fetch API para comunicación frontend-backend
- Git para control de versiones

---

## Instalación y ejecución

1. Clonar el repositorio

```bash
git clone https://github.com/Ysluna/todo-list-forit.git
cd todo-list-forit
Instalar dependencias para backend y frontend

bash
Copiar
Editar
cd backend
npm install
cd ../frontend
npm install
Ejecutar backend

bash
Copiar
Editar
cd backend
npm run dev
Ejecutar frontend

bash
Copiar
Editar
cd frontend
npm run dev
Abrir en el navegador

arduino
Copiar
Editar
http://localhost:3000
Estructura del proyecto
bash
Copiar
Editar
/backend       # Servidor Express con API REST
/frontend      # Aplicación React (Next.js)
/frontend/src/components  # Componentes React separados (opcional)
Endpoints disponibles
GET /api/tasks - Obtener todas las tareas

POST /api/tasks - Crear una tarea nueva { title: string }

PUT /api/tasks/:id - Actualizar una tarea { title?, completed? }

DELETE /api/tasks/:id - Eliminar una tarea

Funcionalidades
Crear, editar, eliminar tareas

Marcar tareas como completadas

Filtrar tareas (todas, completadas, incompletas)

Ordenar tareas por fecha o alfabéticamente

Manejo básico de estado de carga y errores

Consideraciones
El backend usa un array en memoria para almacenar las tareas (no persistente)

Ideal para aprender y demostrar conceptos básicos en React y Node.js

Código desarrollado sin uso de AI para demostrar conocimientos personales

Autor
Yamila Luna
https://github.com/Ysluna