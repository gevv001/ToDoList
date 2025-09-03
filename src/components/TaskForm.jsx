import { useState } from "react";

export default function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Low');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || title.length > 50) return;

        onAdd({
            id: Date.now().toString(),
            title,
            priority,
            dueDate,
            done: false,
            createdAt: Date.now()
        });

        setTitle('');
        setPriority('Low');
        setDueDate('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded flex-1"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border p-2 rounded"
            >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border p-2 rounded"
            />
            <button
                type="submit"
                disabled={!title.trim()}
                className="bg-blue-600 text-white px-4 rounded disabled:opacity-50"
            >
                Add
            </button>
        </form>
    )
}