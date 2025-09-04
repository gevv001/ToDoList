import './App.css'
import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : []
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [filter, setFilter] = useState('all');

  const [search, setSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(search);
    }, 300)

    return () => clearTimeout(handler)
  }, [search])

  const [sortBy, setSortBy] = useState('desc');

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  }

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  const updateTask = (id, updated) => {
    setTasks((prev) =>
      prev.map((t) => t.id === id ? { ...t, ...updated } : t)
    )
  }

  const deleteCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.done))
  }

  const tasksToShow = tasks
    .filter((t) => {
      if (filter === 'active') return !t.done;
      if (filter === 'done') return t.done;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
      if (sortBy === 'desc') return b.createdAt - a.createdAt;
      if (sortBy === 'asc') return a.createdAt - b.createdAt;
      if (sortBy === 'priority') {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    })

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>
      <TaskForm onAdd={addTask} />

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

      <TaskList
        tasks={tasksToShow}
        onToggleDone={toggleDone}
        onDelete={deleteTask}
        onUpdate={updateTask}
      ></TaskList>
    </div>
  )
}

export default App
