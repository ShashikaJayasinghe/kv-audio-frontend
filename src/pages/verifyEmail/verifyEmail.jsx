import axios from "axios";
import { useEffect } from "react";

export default function VerifyEmail () {
    const token = localStorage.getItem("token");
    useEffect (()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`,{
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res);            
        }).catch((err) => {
            console.log(err);
        })
    })
    return(
        <div className="w-full h-screen flex">
            <h1 className="w-full h-full flex justify-center items-center text-[30px] font-bold">Verify Email</h1>
        </div>
    )
}