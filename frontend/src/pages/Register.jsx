import { useState } from "react";
import { register } from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try{
            await register({name,email,password});
            navigate("/login");
        }catch(error){
            alert(error);
        }
    };
    return(
        <div className="flex justify-center items-center h-screen">
            <form className="p-6 bg-white shadow-lg rounded-lg" onSubmit={handleRegister}>
                <h2 className="text-2xl mb-4">Register</h2>
                <input type="text" placeholder="Name" className="border p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" className="border p-2 w-full mt-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="border p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-500 text-white p-2 w-full mt-2">Register</button>
            </form>
        </div>
    );
};

export default Register;