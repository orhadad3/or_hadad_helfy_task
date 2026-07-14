function TaskItem({
    task,
    onEdit,
    onToggle,
    onDelete,
    changing,
    deleting,
    copy = false,
}) {
    const busy = changing || deleting;
    const tabIndex = copy ? -1 : undefined;

    let statusButtonText = task.completed
        ? "Mark pending"
        : "Mark complete";

    if (changing) {
        statusButtonText = "Updating...";
    }

    return (
        <article className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>

            <button
                type="button"
                onClick={() => onEdit(task)}
                disabled={busy}
                tabIndex={tabIndex}
            >
                Edit
            </button>

            <button
                type="button"
                onClick={() => onToggle(task)}
                disabled={busy}
                tabIndex={tabIndex}
            >
                {statusButtonText}
            </button>

            <button
                type="button"
                onClick={() => onDelete(task)}
                disabled={busy}
                tabIndex={tabIndex}
            >
                {deleting ? "Deleting..." : "Delete"}
            </button>
        </article>
    );
}

export default TaskItem;