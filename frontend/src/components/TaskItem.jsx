function TaskItem({ task, onEdit }) {
    return (
        <article>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? "Completed" : "Pending"}</p>

            <button type="button" onClick={() => onEdit(task)}>
                Edit
            </button>
        </article>
    );
}

export default TaskItem;