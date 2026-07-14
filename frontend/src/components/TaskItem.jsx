function TaskItem({
    task,
    onEdit,
    onDelete,
    deleting,
}) {
    return (
        <article>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>

            <button type="button"
                onClick={() => onEdit(task)}
                disabled={deleting}
            >
                Edit
            </button>

            <button type="button"
                onClick={() => onDelete(task)}
                disabled={deleting}
            >
                {deleting ? "Deleting..." : "Delete"}
            </button>
        </article>
    );
}

export default TaskItem;