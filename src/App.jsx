import './App.css'
import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import ControlPanel from './components/ControlPanel'
import useSearch from './hooks/useSearch'
import useTasks from './hooks/useTasks'

function App() {
  const { tasks, addTask, toggleDone, deleteTask, deleteCompleted, updateTask } = useTasks([])
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('desc');
  const [search, setSearch] = useState('');
  const debouncedSearch = useSearch(search, 300);




  const tasksToShow = tasks
    .filter((t) => {
      if (filter === 'active') return !t.done;
      if (filter === 'done') return t.done;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
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

      <ControlPanel
        filter={filter}
        setFilter={setFilter}
        deleteCompleted={deleteCompleted}
        sortBy={sortBy}
        setSortBy={setSortBy}
        search={search}
        setSearch={setSearch}
      ></ControlPanel>

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
