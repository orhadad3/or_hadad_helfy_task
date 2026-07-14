import TaskItem from "./TaskItem";

function TaskList({
    tasks,
    onEdit,
    onToggle,
    onDelete,
    changingId,
    deletingId,
}) {
    if (tasks.length === 0) {
        return <p>No tasks yet. Create your first task.</p>;
    }

    return (
        <section aria-label="Tasks">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    changing={changingId === task.id}
                    deleting={deletingId === task.id}
                />
            ))}
        </section>
    );
}

export default TaskList;