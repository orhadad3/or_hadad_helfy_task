import "./styles/app.css";
import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
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
  const [filter, setFilter] = useState("all");

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

  let shownTasks = tasks;
  let emptyMessage = "No tasks yet.";

  if (filter === "completed") {
    shownTasks = tasks.filter((task) => task.completed);
    emptyMessage = "No completed tasks.";
  }

  if (filter === "pending") {
    shownTasks = tasks.filter((task) => !task.completed);
    emptyMessage = "No pending tasks.";
  }

  let taskHeading = "All Tasks";

  if (filter === "completed") {
    taskHeading = "Completed Tasks";
  }

  if (filter === "pending") {
    taskHeading = "Active Tasks";
  }

  return (
    <>
      <header className="top-bar">
        <div className="top-bar-content">
          <span className="brand">Task Manager</span>
        </div>
      </header>

      <main className="app">
        <TaskForm
          key={editTask?.id || "create"}
          task={editTask}
          onSave={saveTask}
          onCancel={() => setEditTask(null)}
          saving={saving}
        />

        <TaskFilter
          filter={filter}
          onChange={setFilter}
        />

        {errorMessage && (
          <p className="error-message" role="alert">
            {errorMessage}
          </p>
        )}

        <section
          className="tasks-section"
          aria-labelledby="tasks-heading"
        >
          <div className="tasks-heading">
            <h2 id="tasks-heading">{taskHeading}</h2>
            <span>{shownTasks.length} tasks</span>
          </div>

          {loading && (
            <p className="loading-message" role="status">
              Loading tasks...
            </p>
          )}

          {!loading && (
            <TaskList
              tasks={shownTasks}
              onEdit={setEditTask}
              onToggle={changeTaskStatus}
              onDelete={removeTask}
              changingId={changingId}
              deletingId={deletingId}
              emptyMessage={emptyMessage}
            />
          )}
        </section>
      </main>
    </>
  );
}

export default App;