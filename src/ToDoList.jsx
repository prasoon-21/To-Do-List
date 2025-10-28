import { useState, useEffect } from "react";
import { taskService } from './services/taskService';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [loading, setLoading] = useState(false);

    // Load tasks from Supabase when component mounts
    useEffect(() => {
        loadTasks();
    }, []);

    async function loadTasks() {
        try {
            setLoading(true);
            const tasksFromDB = await taskService.getTasks();
            setTasks(tasksFromDB);
        } catch (error) {
            console.error("Error loading tasks:", error);
            alert("Failed to load tasks. Check console for details.");
        } finally {
            setLoading(false);
        }
    }

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    async function addTask() {
        if (newTask && newTask.trim() !== "") {
            try {
                console.log("Attempting to add task:", newTask); // Debug log
                const createdTask = await taskService.createTask(newTask);
                console.log("Task created successfully:", createdTask); // Debug log
                setTasks(t => [createdTask, ...t]);
                setNewTask("");
            } catch (error) {
                console.error("Full error object:", error); // Log entire error
                console.error("Error message:", error.message);
                console.error("Error details:", error.details);
                alert("Failed to add task. Check console for details.");
            }
        }
    }

    async function completeTask(index) {
        try {
            const task = tasks[index];
            const updatedTask = await taskService.updateTask(task.id, {
                completed: !task.completed
            });

            const updatedTasks = [...tasks];
            updatedTasks[index] = updatedTask;
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error completing task:", error);
            alert("Failed to update task. Check console for details.");
        }
    }

    async function deleteTask(index) {
        try {
            const task = tasks[index];
            await taskService.deleteTask(task.id);
            const updatedTasks = tasks.filter((_, i) => i !== index);
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error deleting task:", error);
            alert("Failed to delete task. Check console for details.");
        }
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return (
        <div className="to-do-list">
            <div className="input-area">
                <h1>To Do List</h1>
                <div className="input">
                    <input
                        type="text"
                        placeholder="Enter your Task"
                        onChange={handleInputChange}
                        value={newTask || ''}
                        disabled={loading}
                    />
                    <button className="add-button" onClick={addTask} disabled={loading}>
                        {loading ? "⏳" : "➕"}
                    </button>
                </div>
            </div>

            {loading && tasks.length === 0 && (
                <div className="loading">Loading tasks...</div>
            )}

            <ol className="task-list">
                {tasks.map((task, index) => (
                    <li key={task.id} className={task.completed ? "completed" : ""}>
                        <span className="text">
                            {task.completed ? `Congrats! You have completed: ${task.text}` : task.text}
                        </span>
                        <button className="complete-button" onClick={() => completeTask(index)} disabled={loading}>
                            {task.completed ? "↩️" : "✔️"}
                        </button>
                        <button className="delete-button" onClick={() => deleteTask(index)} disabled={loading}>
                            🗑️
                        </button>
                        <button className="move-up-button" onClick={() => moveTaskUp(index)} disabled={loading}>
                            🔼
                        </button>
                        <button className="move-down-button" onClick={() => moveTaskDown(index)} disabled={loading}>
                            🔽
                        </button>
                    </li>
                ))}
            </ol>

            {tasks.length === 0 && !loading && (
                <></>
            )}
        </div>
    );
}

export default ToDoList;