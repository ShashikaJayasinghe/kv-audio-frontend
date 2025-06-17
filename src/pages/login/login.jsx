import { useState } from "react"
import "./login.css"
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";  // Added Link import
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage () {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");        
    const navigate = useNavigate();                     
    const googleLogin = useGoogleLogin(                                                                                                             
        {
            onSuccess : (res)=>{
                console.log(res);
                toast.success("Login Success");
                navigate("/");
                axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/google`,{     
                    accessToken : res.access_token       
                }).then((res)=>{
                    console.log(res);
                    toast.success("Login Success");
                    const user = res.data.user;
                    localStorage.setItem("token",res.data.token);        

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
            localStorage.setItem("token", res.data.token);        

            if (user.emailVerified === false) {     //user email verified false
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
            <div className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center relative">
                <img src="/logo.png" alt="logo" className="w-[100px] h-[100px] absolute top-1 object-cover pb-[40px] md:w-[150px] md:h-[150px]" />
                <input type="email" placeholder="Email" className="w-[200px] h-[30px] mt-6 bg-transparent border-b-2 border-white text-white text-lg outline-none md:w-[300px]" value={email} onChange={(event)=>{
                    setEmail(event.target.value);
                }}/>
                <input type="password" placeholder="Password" className="w-[200px] h-[30px] mt-4 bg-transparent border-b-2 border-white text-white text-lg outline-none md:w-[300px]" value={password} onChange={(event)=>{
                    setPassword(event.target.value);
                }}/>
                <button className="w-[200px] h-[30px] my-4 bg-accent text-xs text-white rounded-lg md:w-[300px] md:h-[40px] md:text-lg md:hover:bg-blue-600">Login</button>
                <button
                    onClick={googleLogin}       
                    className="w-[200px] h-[30px] my-1 bg-secondary text-xs text-[#3c4043] border border-[#dadce0] rounded-lg flex justify-center items-center gap-2 hover:bg-gray-100 cursor-pointer transition md:w-[300px] md:h-[40px] md:text-lg md:hover:bg-gray-200">
                    <img
                        src="/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5"/>
                            Login with Google
                </button>
                
                {/* Added register link */}
                <p className="text-white text-sm mt-2">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-accent underline hover:text-blue-300">
                        Register here
                    </Link>
                </p>
            </div>
        </form>
    </div>
    )
}