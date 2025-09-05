import { useLocalStorage } from "./useLocalStorage";

export default function useTasks(init = []) {
    const [tasks, setTasks] = useLocalStorage('tasks', init);

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

    return { tasks, addTask, toggleDone, deleteCompleted, deleteTask, updateTask }
}