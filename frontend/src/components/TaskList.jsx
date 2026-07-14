function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return <p>No tasks yet</p>;
    }

    return (
        <section aria-label="Tasks">
            {tasks.map((task) => (
                <article key={task.id}>
                    <strong>{task.title}</strong>
                    <p>{task.description}</p>
                    <p>Priority: {task.priority}</p>
                    <p>Status: {task.completed ? "Completed" : "Pending"}</p>
                </article>
            ))}
        </section>
    );
}

export default TaskList;