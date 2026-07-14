import TaskItem from "./TaskItem";
import "../styles/carousel.css";

function TaskList({
    tasks,
    onEdit,
    onToggle,
    onDelete,
    changingId,
    deletingId,
    emptyMessage,
}) {
    if (tasks.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    function showTasks(copy = false) {
        return tasks.map((task) => (
            <TaskItem
                key={`${copy ? "copy" : "task"}-${task.id}`}
                task={task}
                onEdit={onEdit}
                onToggle={onToggle}
                onDelete={onDelete}
                changing={changingId === task.id}
                deleting={deletingId === task.id}
                copy={copy}
            />
        ));
    }

    if (tasks.length === 1) {
        return (
            <section className="task-carousel" aria-label="Tasks">
                <div className="single-task">{showTasks()}</div>
            </section>
        );
    }

    const loopTime = Math.max(tasks.length * 8, 20);

    return (
        <section className="task-carousel" aria-label="Tasks">
            <div className="carousel-window">
                <div
                    className="carousel-track"
                    style={{ "--carousel-time": `${loopTime}s` }}
                >
                    <div className="carousel-group">
                        {showTasks()}
                    </div>

                    <div
                        className="carousel-group carousel-copy"
                        aria-hidden="true"
                    >
                        {showTasks(true)}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TaskList;