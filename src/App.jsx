import { useState } from 'react'
import './App.css'
import TaskForm from './components/TaskForm'

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([task, ...tasks]);
  };

  return (
    <div className='min-h-screen p-4 bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>To-Do List</h1>
      <TaskForm onAdd={addTask}></TaskForm>
    </div>
  )
}

export default App
