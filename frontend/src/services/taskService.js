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