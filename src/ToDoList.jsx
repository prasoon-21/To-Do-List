import { useState } from "react";


function ToDoList (){
    const [tasks, setTask] = useState([]);
    const [newTask, setNewTask] = useState();

    function handleInputChange(event){
        setNewTask(event.target.value)
    }
    function addTask(){
        if(newTask && newTask.trim() !== ""){
            setTask(t => [...t, newTask]);
            setNewTask("");
        }
    }
    function completeTask(index){
    const updatedTask = [...tasks];
    updatedTask[index] = `Congrats! You have completed ${tasks[index]}`;
    setTask(updatedTask);
    }
    function deleteTask(index){
        const updatedTask = tasks.filter((_, i) => i !== index);
        setTask(updatedTask);
    }
    function moveTaskUp(index){
        if(index > 0){
            const updatedTask = [...tasks];
            [updatedTask[index],updatedTask[index-1]] = [updatedTask[index-1],updatedTask[index]]
            setTask(updatedTask)
        }
    }
    function moveTaskDown(index){
         if(index < tasks.length - 1){
            const updatedTask = [...tasks];
            [updatedTask[index],updatedTask[index+1]] = [updatedTask[index+1],updatedTask[index]]
            setTask(updatedTask)
        }
    }

    // const Date = new Date();

    return(
    <div className="to-do-list">
        <div className="input-area">
        <h1>To Do List</h1>
        <div className="input">
            <input type="text" placeholder="Enter your Task" onChange={handleInputChange} value={newTask || ''}/>
            <button className="add-button" onClick={addTask}>➕</button>
        </div>
        </div>
        <ol className="task-list">
            {
                tasks.map((task,index)=>
                <li key={index}>
                    <span className="text">{task}</span>
                    <button className="complete-button" onClick={() => completeTask(index) }>✔️</button>
                    <button className="delete-button" onClick={() => deleteTask(index)}>🗑️</button>
                    <button className="move-up-button" onClick={() => moveTaskUp(index)}>🔼</button>
                    <button className="move-down-button" onClick={() => moveTaskDown(index)}>🔽</button>
                </li>) 
            }
        </ol>
        
    </div>)

}

export default ToDoList