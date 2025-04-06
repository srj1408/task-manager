import { useState } from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";

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
        <div className="flex justify-center items-center h-screen">
            <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleLogin}>
                <h2 className="text-2xl mb-4">Login</h2>
                <input type="email" placeholder="Email" className="border p-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="border p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-500 text-white p-2 w-full mt-2">Login</button>
            </form>
        </div>
    );
};

export default Login;