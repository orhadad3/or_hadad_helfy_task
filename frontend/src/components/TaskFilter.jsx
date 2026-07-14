const filters = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
];

function TaskFilter({ filter, onChange }) {
    return (
        <section aria-labelledby="filter-heading">
            <h2 id="filter-heading">Filter tasks</h2>

            {filters.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => onChange(item.value)}
                    aria-pressed={filter === item.value}
                >
                    {item.label}
                </button>
            ))}
        </section>
    );
}

export default TaskFilter;