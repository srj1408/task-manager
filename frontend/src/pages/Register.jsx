import { useState } from "react";
import { register } from "../api";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

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
        <>
        <Navbar />
        <div className="bg-gray-900 flex justify-center items-center h-screen pt-20">
            <form className="p-6 bg-amber-100 shadow-lg rounded-lg" onSubmit={handleRegister}>
                <h2 className="text-center text-3xl mb-8">Register</h2>
                <input type="text" placeholder="Name" className="border rounded p-2 w-full" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" className="border rounded p-2 w-full mt-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" className="border rounded p-2 w-full mt-2" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button className="bg-blue-500 text-white p-2 w-full mt-2 rounded hover:bg-blue-700">Register</button>
                <div className="flex justify-center">
                    <Link className="underline mt-2 hover:text-blue-800" to="/login">Back to login</Link>
                </div>
            </form>
        </div>
        </>
    );
};

export default Register;