function TaskItem({
    task,
    onEdit,
    onToggle,
    onDelete,
    changing,
    deleting,
}) {
    const busy = changing || deleting;
    const date = new Date(task.createdAt).toLocaleDateString();

    let statusButtonText = task.completed
        ? "Mark pending"
        : "Mark complete";

    if (changing) {
        statusButtonText = "Updating...";
    }

    return (
        <article
            className={`task-card task-card-${task.priority} ${task.completed ? "task-card-completed" : ""
                }`}
        >
            <div className="task-card-top">
                <span
                    className={`priority-badge priority-${task.priority}`}
                >
                    {task.priority} priority
                </span>

                <span className="task-status">
                    {task.completed ? "Completed" : "Pending"}
                </span>
            </div>

            <h3>{task.title}</h3>

            <p className="task-description" title={task.description}>
                {task.description}
            </p>

            <time className="task-date" dateTime={task.createdAt}>
                Created {date}
            </time>

            <div className="task-actions">
                <button
                    className="task-button"
                    type="button"
                    onClick={() => onEdit(task)}
                    disabled={busy}
                >
                    Edit
                </button>

                <button
                    className="task-button complete-button"
                    type="button"
                    onClick={() => onToggle(task)}
                    disabled={busy}
                >
                    {statusButtonText}
                </button>

                <button
                    className="task-button delete-button"
                    type="button"
                    onClick={() => onDelete(task)}
                    disabled={busy}
                >
                    {deleting ? "Deleting..." : "Delete"}
                </button>
            </div>
        </article>
    );
}

export default TaskItem;