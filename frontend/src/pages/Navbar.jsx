import { useNavigate } from "react-router-dom";
const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }
    return(
        <nav className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow-md z-50">
                {token ? (
                    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="w-80 text-xl font-bold">Task Manager App</h1>
                    <button onClick={handleLogout} className="w-20 bg-red-500 hover:bg-red-700 text-white px-2 py-2 rounded">Logout</button>
                    </div>
                ):(
                    <div className="max-w-7xl mx-auto px-4 py-3 flex justify-center items-center">
                    <h1 className="text-xl font-bold">Task Manager App</h1>
                    </div>)}
        </nav>
    )
}

export default Navbar;