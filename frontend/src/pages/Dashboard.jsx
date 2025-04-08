import { useEffect, useState } from "react";
import { addTask, deleteTask, getTasks, updatedTask } from "../api";
import Navbar from "./Navbar";

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
        <>
        <Navbar />
        <div className="bg-gray-900 pt-20 h-screen">
        <div className="max-w-xl mx-auto p-4">
            <div className="flex mt-4">
                <input type="text" className="bg-amber-100 rounded p-2 w-full border" placeholder="New Task" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button onClick={handleAddTask} className="bg-green-500 text-white p-2 ml-2 rounded hover:bg-green-700">Add</button>
            </div>
            <ul className="bg-white rounded-lg mt-4 p-4 space-y-3">
                {tasks.map((task) => (
                    <li key={task._id} className="flex justify-between items-center bg-gray-200 px-4 py-3 rounded-lg hover:bg-gray-300 transition">
                        <span className={task.completed?"line-through":""}>{task.title}</span>
                        <div>
                            <button onClick={() => handleToggleComplete(task._id,task.completed)} className="bg-yellow-500 text-white text-sm p-1 mr-2 rounded hover:bg-amber-700">{task.completed?"Undo":"Complete"}</button>
                            <button onClick={() => handleDeleteTask(task._id)} className="bg-red-500 text-white text-sm p-1 rounded hover:bg-red-700">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        </>
    );
};

export default Dashboard;