import { useState } from "react";
import { login } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Login = ({setToken}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{    
            const {data} = await login({email,password});
            setToken(data.token);
            localStorage.setItem("token",data.token);
            navigate("/dashboard");
        }catch(error){
            alert(error);
        }
    }
    return(
        <>
        <Navbar />
        <div className="bg-gray-900 flex justify-center items-center h-screen pt-20">
            <form className="p-6 bg-amber-100 shadow-lg rounded-lg" onSubmit={handleLogin}>
                <h2 className="text-center text-3xl mb-8">Login</h2>
                <input type="email" placeholder="Email" className="rounded border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="rounded border p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full mt-2">Login</button>
                <div className="flex justify-center">
                    <Link className="underline mt-2 hover:text-blue-800" to="/register">New User?</Link>
                </div>
            </form>
        </div>
        </>
    );
};

export default Login;