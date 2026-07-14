import { useEffect, useState } from "react";
import TaskList from "./components/TaskList";
import { getTasks } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTasks() {
      try {
        const data = await getTasks({
          signal: controller.signal,
        });

        setTasks(data);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
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

      { isLoading && <p role="status">Loading tasks...</p> }
      { error && <p role="alert">{error}</p> }
      { !isLoading && !error && <TaskList tasks={tasks} /> }
    </main>
  );
}

export default App;