// Uses the local API by default while allowing deployments to override the URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/tasks";

async function request(path = "", options = {}) {
    const response = await fetch(`${API_URL}${path}`, options);

    if (!response.ok) {
        const responseBody = await response.json().catch(() => null);

        throw new Error(
            responseBody?.error || `Request failed with status ${response.status}`
        );
    }

    if (response.status === 204) {
        return null;
    }

    return response.json();
}

export function getTasks(options = {}) {
    return request("", options);
}

export function createTask(task) {
    return request("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
}

export function updateTask(taskId, task) {
    return request(`/${taskId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
    });
}

export function deleteTask(taskId) {
  return request(`/${taskId}`, {
    method: "DELETE",
  });
}