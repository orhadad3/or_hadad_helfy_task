const filters = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
];

function TaskFilter({ filter, onChange }) {
    return (
        <section
            className="task-filter"
            aria-labelledby="filter-heading"
        >
            <h2 id="filter-heading" className="screen-reader-only">
                Filter tasks
            </h2>

            <div className="filter-buttons">
                {filters.map((item) => (
                    <button
                        className={
                            filter === item.value
                                ? "filter-button active"
                                : "filter-button"
                        }
                        key={item.value}
                        type="button"
                        onClick={() => onChange(item.value)}
                        aria-pressed={filter === item.value}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </section>
    );
}

export default TaskFilter;