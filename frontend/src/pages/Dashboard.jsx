import { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updatedTask } from "../api";

const Dashboard = ({token}) => {
    const [title,setTitle] = useState("");
    const [tasks,setTasks] = useState([]);
    useEffect(() => {
        fetchTasks();
    },[token]);
    const fetchTasks = async () => {
        const {data} = await getTasks(token);
        setTasks(data);
    }
    const handleAddTask = async () => {
        await addTask({title},token);
        setTitle("");
        fetchTasks();
    };
    const handleToggleComplete = async (id,completed) => {
        await updatedTask(id,{completed: !completed},token);
        fetchTasks();
    };
    const handleDeleteTask = async(id) => {
        await deleteTask(id,token);
        fetchTasks();
    };
    return(
        <div className="max-w-xl mx-auto p-4">
            <h2 className="text-2xl text-center">Task Manager</h2>
            <div className="flex mt-4">
                <input type="text" className="p-2 w-full border" placeholder="New Task" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button onClick={handleAddTask} className="bg-green-500 text-white p-2 ml-2">Add</button>
            </div>
            <ul className="mt-4">
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between items-center bg-gray-100 p-2 my-2">
                        <span className={task.completed?"line-through":""}>{task.title}</span>
                        <button onClick={() => handleToggleComplete(task._id,task.completed)} className="bg-yellow-500 text-white p-1 mr-2">{task.completed?"Undo":"Complete"}</button>
                        <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white p-1">Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;