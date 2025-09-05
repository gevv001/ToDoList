export default function ControlPanel({ filter, setFilter, sortBy, setSortBy, search, setSearch, deleteCompleted }) {
    return (
        <div className='flex gap-2 mt-4 mb-2'>
            <button
                onClick={deleteCompleted}
                className="px-3 py-1 bg-red-500 text-white rounded"
            >
                Delete Completed Tasks
            </button>

            <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}

            >
                All
            </button>

            <button
                onClick={() => setFilter('active')}
                className={`px-3 py-1 rounded ${filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"}`}

            >
                Active
            </button>

            <button
                onClick={() => setFilter('done')}
                className={`px-3 py-1 rounded ${filter === "done" ? "bg-blue-500 text-white" : "bg-gray-200"}`}

            >
                Done
            </button>

            <input
                type="text"
                placeholder='Search tasks...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='border rounded px-2 py-1 flex-1'
            />

            <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className='border rounded px-2 py-1'
            >
                <option value="desc">Created 'newest first'</option>
                <option value="asc">Created 'oldest first'</option>
                <option value="priority">Priority 'High → Low'</option>
                <option value="dueDate">Due Date 'earliest first'</option>
            </select>
        </div>
    )
}