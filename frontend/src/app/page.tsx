"use client";

import { useEffect, useState } from "react";

const BACKEND_URL =
  "https://bf1e1d2b-8cce-4419-823b-3162c6822431-00-fsbd5chfcm8s.worf.replit.dev/tasks";

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (msg: string, duration = 3000) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), duration);
  };

  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">(
    "all",
  );
  const [order, setOrder] = useState<"az" | "za" | "newest" | "oldest">(
    "newest",
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const loadTasks = () => {
    setLoading(true);
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSaving(true);
    fetch(
      "https://bf1e1d2b-8cce-4419-823b-3162c6822431-00-fsbd5chfcm8s.worf.replit.dev/tasks",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      },
    )
      .then((res) => res.json())
      .then(() => {
        setNewTitle("");
        setSaving(false);
        loadTasks();
        showMessage("✅ Tarea agregada correctamente");
      })
      .catch(() => {
        setSaving(false);
        showMessage("❌ Error al agregar la tarea");
      });
  };

  const toggleCompleted = (task: Task) => {
    fetch(`${BACKEND_URL}/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then((res) => res.json())
      .then(() => loadTasks());
  };

  const deleteTask = (id: number) => {
    fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
    }).then(() => loadTasks());
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingTitle(task.title);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const saveEditing = (id: number) => {
    if (!editingTitle.trim()) return;

    fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTitle.trim() }),
    })
      .then((res) => res.json())
      .then(() => {
        cancelEditing();
        loadTasks();
      });
  };

  if (loading) return <div className="p-4 text-center">Cargando tareas...</div>;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  const orderedTasks = filteredTasks.sort((a, b) => {
    if (order === "az") return a.title.localeCompare(b.title);
    if (order === "za") return b.title.localeCompare(a.title);
    if (order === "newest") return b.id - a.id;
    if (order === "oldest") return a.id - b.id;
    return 0;
  });

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Lista de tareas</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 ">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="border rounded px-3 py-2"
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="incomplete">Incompletas</option>
        </select>

        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as any)}
          className="border rounded px-3 py-2"
        >
          <option value="newest">Más nuevas</option>
          <option value="oldest">Más viejas</option>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nueva tarea"
          className="flex-grow border rounded px-3 py-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          disabled={saving}
        />
        <button
          type="submit"
          disabled={saving || !newTitle.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Guardando..." : "Agregar"}
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No hay tareas.</p>
      ) : (
        <ul>
          {orderedTasks.map((task) => (
            <li
              key={task.id}
              className={`mb-3 p-3 rounded border flex items-center gap-3 justify-between ${
                task.completed ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3 flex-grow">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompleted(task)}
                  className="w-5 h-5"
                />

                {editingId === task.id ? (
                  <>
                    <input
                      type="text"
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="flex-grow border rounded px-2 py-1"
                    />
                    <button
                      onClick={() => saveEditing(task.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded ml-2"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-400 text-white px-3 py-1 rounded ml-2"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      className={`flex-grow ${
                        task.completed ? "line-through text-green-700" : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    <button
                      onClick={() => startEditing(task)}
                      className="text-blue-600 px-3 py-1 rounded hover:bg-blue-100"
                    >
                      Editar
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-600 font-bold px-2 py-1 rounded hover:bg-red-100"
                aria-label={`Borrar tarea ${task.title}`}
              >
                X
              </button>
            </li>
          ))}
        </ul>
      )}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}
    </main>
  );
}
