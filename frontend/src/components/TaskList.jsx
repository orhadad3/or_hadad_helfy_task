import TaskItem from "./TaskItem";

function TaskList({
    tasks,
    onEdit,
    onDelete,
    deletingId,
}) {
    if (tasks.length === 0) {
        return <p>No tasks yet</p>;
    }

    return (
        <section aria-label="Tasks">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    deleting={deletingId === task.id}
                />
            ))}
        </section>
    );
}

export default TaskList;