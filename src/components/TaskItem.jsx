export default function TaskItem({ task, onToggleDone, onDelete }) {
    return (
        <div
            className={`flex items-center justify-between p-2 border-b ${task.done ? "bg-green-100" : "bg-white"
                }`}
        >
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggleDone(task.id)}
                />
                <span
                    className={
                        task.done ?
                            "line-through" :
                            "bg-white"}
                >{task.title}</span>
                <span
                    className={`px-2 py-1 rounded text-white text-xs 
                        ${task.priority === "High"
                            ? "bg-red-500"
                            : task.priority === "Medium"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                        }`}
                >
                    {task.priority}
                </span>
                {task.dueDate && <span className="text-gray-500 text-sm">{task.dueDate}</span>}
            </div>
            <button
                onClick={() => onDelete(task.id)}
                className="text-red-500 font-bold"
            >
                Delete
            </button>
        </div>
    )
}