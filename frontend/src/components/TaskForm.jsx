import { useState } from "react";

function TaskForm({ task, onSave, onCancel, saving }) {
    const editing = Boolean(task);

    const [title, setTitle] = useState(task?.title || "");
    const [description, setDescription] = useState(
        task?.description || ""
    );
    const [priority, setPriority] = useState(
        task?.priority || "medium"
    );
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        const cleanTitle = title.trim();
        const cleanDescription = description.trim();

        if (!cleanTitle || !cleanDescription) {
            setErrorMessage("Title and description are required.");
            return;
        }

        setErrorMessage("");

        const success = await onSave({
            title: cleanTitle,
            description: cleanDescription,
            priority,
        });

        if (success && !editing) {
            setTitle("");
            setDescription("");
            setPriority("medium");
        }
    }

    let buttonText = editing ? "Save changes" : "Add task";

    if (saving) {
        buttonText = "Saving...";
    }

    return (
        <section aria-labelledby="task-form-heading">
            <h2 id="task-form-heading">
                {editing ? "Edit task" : "Add a task"}
            </h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="task-title">Title</label>
                <input
                    id="task-title"
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    disabled={saving}
                    required
                />

                <label htmlFor="task-description">Description</label>
                <textarea
                    id="task-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    disabled={saving}
                    required
                />

                <label htmlFor="task-priority">Priority</label>
                <select
                    id="task-priority"
                    value={priority}
                    onChange={(event) => setPriority(event.target.value)}
                    disabled={saving}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                {errorMessage && <p role="alert">{errorMessage}</p>}

                <button type="submit" disabled={saving}>
                    {buttonText}
                </button>

                {editing && (
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={saving}
                    >
                        Cancel
                    </button>
                )}
            </form>
        </section>
    );
}

export default TaskForm;