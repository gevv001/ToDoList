import './App.css'
import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : []
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  const tasksToShow = tasks.filter((t) => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
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
