import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [changingId, setChangingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  async function saveTask(taskData) {
    setErrorMessage("");
    setSaving(true);

    try {
      if (editTask) {
        const updatedTask = await updateTask(
          editTask.id,
          taskData
        );

        setTasks((oldTasks) =>
          oldTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        setEditTask(null);
      } else {
        const newTask = await createTask(taskData);

        setTasks((oldTasks) => [...oldTasks, newTask]);
      }

      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function removeTask(task) {
    const userClickedOk = window.confirm(
      `Delete "${task.title}"?`
    );

    if (!userClickedOk) {
      return;
    }

    setErrorMessage("");
    setDeletingId(task.id);

    try {
      await deleteTask(task.id);

      setTasks((oldTasks) =>
        oldTasks.filter((item) => item.id !== task.id)
      );

      if (editTask?.id === task.id) {
        setEditTask(null);
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setDeletingId(null);
    }
  }

  async function changeTaskStatus(task) {
    setErrorMessage("");
    setChangingId(task.id);

    try {
      const changedTask = await toggleTask(task.id);

      setTasks((oldTasks) =>
        oldTasks.map((item) =>
          item.id === changedTask.id ? changedTask : item
        )
      );
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setChangingId(null);
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        const data = await getTasks({
          signal: controller.signal,
        });

        setTasks(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setErrorMessage(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTasks();

    return () => controller.abort();
  }, []);

  return (
    <main>
      <header>
        <h1>Task Manager</h1>
        <p>Create, organize, and complete your tasks.</p>
      </header>

      <TaskForm
        key={editTask?.id || "create"}
        task={editTask}
        onSave={saveTask}
        onCancel={() => setEditTask(null)}
        saving={saving}
      />

      {loading && <p role="status">Loading tasks...</p>}

      {errorMessage && (
        <p role="alert">{errorMessage}</p>
      )}

      {!loading && (
        <TaskList
          tasks={tasks}
          onEdit={setEditTask}
          onToggle={changeTaskStatus}
          onDelete={removeTask}
          changingId={changingId}
          deletingId={deletingId}
        />
      )}
    </main>
  );
}

export default App;