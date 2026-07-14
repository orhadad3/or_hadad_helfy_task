import TaskItem from "./TaskItem";

function TaskList({ tasks, onEdit }) {
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
                />
            ))}
        </section>
    );
}

export default TaskList;