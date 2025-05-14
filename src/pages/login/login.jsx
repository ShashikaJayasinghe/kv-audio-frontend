import { useState } from "react"
import "./login.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage () {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");        //array
    const navigate = useNavigate();                     //function
    const googleLogin = useGoogleLogin(                                                                                                             
        {
            onSuccess : (res)=>{
                console.log(res);
                toast.success("Login Success");
                navigate("/");
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`,{     // we send backend received from the token in g
                    accessToken : res.access_token      //access token name should be backend end point name(accessToken), res.access_token is google access token means console.log it comes access_token  
                }).then((res)=>{
                    console.log(res);
                    toast.success("Login Success");
                    const user = res.data.user;
                    localStorage.setItem("token",res.data.token);        //token save when login a user

                    if (user.role === "admin") {        // if user is admin
                        navigate("/admin/");
                    }else {
                        navigate("/");
                    }
                }).catch ((err)=>{
                    console.log(err);
                    toast.error(err.response.data.error);
                })
            }
        }
    );

    function onHandleSubmit (event) {
        event.preventDefault();
        const backendUrl = import.meta.env.VITE_BACKEND_URL

        axios.post(`${backendUrl}/api/users/login`,{
            email : email,
            password : password
        }).then((res)=>{
            console.log(res);
            toast.success("Login Success");
            const user = res.data.user;
            localStorage.setItem("token", res.data.token);        //token save when login a user

            if (user.emailVerified === false) {
                        navigate("/verify-email");
                        return;
                    }

            if (user.role === "admin") {
                navigate("/admin/");
            }else {
                navigate("/");
            }

        }).catch ((err)=>{
            console.log(err);
            toast.error(err.response.data.error);
        })
    }

    return(
    <div className="bg-picture w-full h-screen flex justify-center items-center">
        <form onSubmit={onHandleSubmit}>
            <div className="w-[400px] h-[400px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
                <img src="/logo.png" alt="logo" className="w-[150px] h-[150px] absolute top-1 object-cover mt-4" />
                <input type="email" placeholder="Email" className="w-[300px] h-[30px] mt-6 bg-transparent border-b-2 border-white text-white text-lg outline-none" value={email} onChange={(event)=>{
                    setEmail(event.target.value);
                }}/>
                <input type="password" placeholder="Password" className="w-[300px] h-[30px] mt-6 bg-transparent border-b-2 border-white text-white text-lg outline-none" value={password} onChange={(event)=>{
                    setPassword(event.target.value);
                }}/>
                <button className="w-[300px] h-[50px] my-4 bg-[#36bbbf] text-xl text-white rounded-lg">Login</button>
                <div className="w-[300px] h-[50px] my-4 bg-[#36bbbf] text-xl text-white rounded-lg" onClick={googleLogin}>Login with Google</div>
            </div>
        </form>
    </div>
    )
}