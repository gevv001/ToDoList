import './App.css'
import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  }

  const toggleDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  }

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>
      <TaskForm
        onAdd={addTask}
      ></TaskForm>

      <TaskList
        tasks={tasks}
        onToggleDone={toggleDone}
        onDelete={deleteTask}
      ></TaskList>
    </div>
  )
}

export default App
