# Todo List ForIT

¡Hola! Soy Yamila
Hice una aplicación de lista de tareas para el challenge de ingreso a la Academia ForIT 2025.

Imagenes del servidor corriendo:

<img width="1919" height="1079" alt="Captura de pantalla 2025-08-06 120848" src="https://github.com/user-attachments/assets/137e1ee7-4dfb-4b8b-9384-12b8e143856b" />
<img width="1919" height="1079" alt="Captura de pantalla 2025-08-06 120925" src="https://github.com/user-attachments/assets/d9c864a4-92f3-432e-b5e8-82c43d80ff15" />
<img width="1919" height="1079" alt="Captura de pantalla 2025-08-06 121028" src="https://github.com/user-attachments/assets/9979e6ea-00a5-4613-8212-790aa3ec553d" />

Fue todo un desafío para mi porque no pude usar mi computadora y tuve que hacerlo con la computadora de mi trabajo, la cual no puedo instalar nada, así que pensé, investigué y busqué la forma de completar el desafío. Lo que se me ocurrió fue usar un editor de código en internet, en este caso usé REPLIT, y tras varios intentos pude hacer la aplicación y subirla a mi github.

---

# Descripción

Esta aplicación permite gestionar tareas básicas: crear, leer, actualizar y eliminar (CRUD).  
Está desarrollada con React (Next.js con `use client`), usando hooks para el manejo de estado, y un backend básico en Express (con almacenamiento en memoria).

Alguno de los requisitos+bonus hechos son:

- API REST con Express y endpoints para CRUD de tareas.
- Frontend con React usando Vite/Next.js.
- Uso de fetch para llamadas a la API.
- Filtrado y orden de tareas.
- Estilos personales y modernos con Tailwind CSS.
- Manejo básico de errores y estado de carga.
- Uso de TypeScript en frontend y backend.

---

## Tecnologías usadas

- React 18 / Next.js 13 (app router)
- TypeScript
- Express.js
- Tailwind CSS
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
/backend
/frontend
Endpoints disponibles

GET /api/tasks - Obtener todas las tareas

POST /api/tasks - Crear una tarea nueva { title: string }

PUT /api/tasks/:id - Actualizar una tarea { title?, completed? }

DELETE /api/tasks/:id - Eliminar una tarea

## Funcionalidades
Crear, editar, eliminar tareas

Marcar tareas como completadas

Filtrar tareas (todas, completadas, incompletas)

Ordenar tareas por fecha o alfabéticamente

Manejo básico de estado de carga y errores

Uso de SQLite3 para el almacenamiento

Autor
Yamila Luna
https://github.com/Ysluna
