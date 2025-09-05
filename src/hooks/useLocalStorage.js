import { useState, useEffect } from "react";

export function useLocalStorage(key, initVal) {
    const [tasks, setTasks] = useState(() => {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : initVal;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(tasks));
    }, [key, tasks])

    return [tasks, setTasks];
}