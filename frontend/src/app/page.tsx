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
    fetch(BACKEND_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    })
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

  // EDICION

  return (
    <main className="p-6 max-w-md mx-auto bg-white min-h-screen mt-40">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#1a183e]">
        Lista de tareas
      </h1>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-8 justify-center mb-8">
        {/* Filtro por estado */}
        <div className="flex flex-col w-full max-w-[200px]">
          <button
            onClick={() => setFilter("all")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              filter === "all"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              filter === "completed"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            Completadas
          </button>
          <button
            onClick={() => setFilter("incomplete")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              filter === "incomplete"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            Incompletas
          </button>
        </div>

        {/* Filtro por orden */}
        <div className="flex flex-col w-full max-w-[200px]">
          <button
            onClick={() => setOrder("newest")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              order === "newest"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            Más nuevas
          </button>
          <button
            onClick={() => setOrder("oldest")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              order === "oldest"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            Más antiguas
          </button>
          <button
            onClick={() => setOrder("az")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              order === "az"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            A - Z
          </button>
          <button
            onClick={() => setOrder("za")}
            className={`py-3 px-4 text-left transition-all border-l-4 ${
              order === "za"
                ? "border-[#6072fe] bg-white text-[#6072fe] font-semibold"
                : "border-transparent hover:bg-gray-100 text-gray-600"
            }`}
          >
            Z - A
          </button>
        </div>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Nueva tarea..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-100 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6072fe]"
        />
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-[#6072fe] text-white rounded-2xl hover:bg-[#4051d7] transition"
        >
          Agregar
        </button>
      </form>

      {/* Mensaje */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#353239] text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}

      {/* Lista de tareas */}
      <ul className="space-y-4">
        {orderedTasks.map((task) => (
          <li
            key={task.id}
            className={`rounded-xl px-5 py-4 transition-all font-bold ${
              editingId === task.id ? "bg-[#eef0fd]" : "bg-[#f5f5f5]"
            }`}
          >
            {editingId === task.id ? (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 px-3 py-2"
                />
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => saveEditing(task.id)}
                    className="px-3 py-1"
                  >
                    ✔️
                  </button>
                  <button onClick={cancelEditing} className="px-3 py-1 ">
                    ❌
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task)}
                    className="appearance-none h-5 w-5 rounded-full border-2 border-[#6072fe] checked:bg-gray-100 checked:border-gray-300 transition-all cursor-pointer"
                  />
                  <span
                    className={`${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(task)}
                    className="text-sm "
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-sm"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
