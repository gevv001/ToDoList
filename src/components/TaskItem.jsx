import { useState } from "react"

export default function TaskItem({ task, onToggleDone, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(task.dueDate || '');

    const handleSave = () => {
        const cleanTitle = title.trim();

        if (!cleanTitle) return;

        onUpdate(task.id, {
            title: cleanTitle,
            priority,
            dueDate: dueDate || null
        })
    }
    console.log(isEditing);


    if (isEditing) {
        return (
            <div className="flex items-center justify-between p-3 border-b bg-yellow-50">
                <div className="flex gap-2 items-center flex-1">
                    <input
                        className="border p-1 rounded flex-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <select
                        className="border p-1 rounded"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                    <input
                        type="date"
                        className="border p-1 rounded"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => {
                            handleSave();
                            setIsEditing(false)
                        }}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="px-2 py-1 bg-gray-300 rounded text-sm"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        )
    }

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
            <div className="flex gap-2">
                <button
                    onClick={() => setIsEditing(true)}
                    className="px-2 py-1 bg-yellow-300 rounded text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}