import { useState } from "react";
import "./register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    function onHandleSubmit(event) {
        event.preventDefault();
        console.log({ firstName, lastName, email, password, address, phone });
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{
            email : email,
            firstName : firstName,
            lastName : lastName,
            password : password,
            address : address,
            phone : phone
        }).then (()=>{
            toast.success("Registration Success");
            navigate("/login");
        }).catch((err)=>{
            toast.error(err?.response?.data?.error||"An error occured");
        })
    }

    return (
        <div className="bg-picture h-screen flex justify-center items-center">
            <form onSubmit={onHandleSubmit} className="w-[400px] bg-white bg-opacity-20 p-8 rounded-3xl shadow-lg backdrop-blur-lg flex flex-col items-center">
                <img src="/logo.png" alt="logo" className="w-[120px] h-[120px] mb-6" />
                <h2 className="text-white text-2xl font-bold mb-4">Create an Account</h2>
                <input type="text" placeholder="First Name" className="w-full px-4 py-3 mb-3 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-white focus:border-teal-300 transition" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <input type="text" placeholder="Last Name" className="w-full px-4 py-3 mb-3 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-white focus:border-teal-300 transition" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <input type="email" placeholder="Email" className="w-full px-4 py-3 mb-3 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-white focus:border-teal-300 transition" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="w-full px-4 py-3 mb-3 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-white focus:border-teal-300 transition" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="text" placeholder="Address" className="w-full px-4 py-3 mb-3 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-white focus:border-teal-300 transition" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Phone" className="w-full px-4 py-3 mb-3 bg-transparent border-b-2 border-white text-white text-lg outline-none placeholder-white focus:border-teal-300 transition" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <button className="w-full py-3 mt-6 bg-gradient-to-r from-teal-400 to-blue-500 text-xl text-white font-semibold rounded-xl shadow-lg hover:scale-105 transition-transform">Register</button>
            </form>
        </div>
    );
}