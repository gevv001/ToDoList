import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleDone, onDelete, onUpdate }) {
    if (tasks.length === 0) {
        return <p className="mt-4 text-gray-500">
            No Tasks Yet!
        </p>;
    }

    return (
        <div className="mt-4 border rounded overflow-hidden">
            {tasks.map((task) => {
                return <TaskItem
                    key={task.id}
                    task={task}
                    onToggleDone={onToggleDone}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            })}
        </div>
    )
}