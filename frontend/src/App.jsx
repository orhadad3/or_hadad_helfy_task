import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import {
  createTask,
  getTasks,
  updateTask,
} from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
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

      {!loading && !errorMessage && (
        <TaskList
          tasks={tasks}
          onEdit={setEditTask}
        />
      )}
    </main>
  );
}

export default App;