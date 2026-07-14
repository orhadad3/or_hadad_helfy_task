function TaskItem({
    task,
    onEdit,
    onToggle,
    onDelete,
    changing,
    deleting,
}) {
    const busy = changing || deleting;

    let statusButtonText = task.completed
        ? "Mark pending"
        : "Mark complete";

    if (changing) {
        statusButtonText = "Updating...";
    }

    return (
        <article>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>

            <button
                type="button"
                onClick={() => onEdit(task)}
                disabled={busy}
            >
                Edit
            </button>

            <button
                type="button"
                onClick={() => onToggle(task)}
                disabled={busy}
            >
                {statusButtonText}
            </button>

            <button
                type="button"
                onClick={() => onDelete(task)}
                disabled={busy}
            >
                {deleting ? "Deleting..." : "Delete"}
            </button>
        </article>
    );
}

export default TaskItem;