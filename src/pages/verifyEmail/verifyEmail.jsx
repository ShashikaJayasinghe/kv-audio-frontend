import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const token = localStorage.getItem("token");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  function handleSendOTP() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        toast.success("OTP sent to your email");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to send OTP");
      });
  }

  function handleVerifyEmail() {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`,
        { code: parseInt(otp) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        console.log(res);
        toast.success("Email Verified Successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid OTP");
      });
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Verify Your Email
        </h1>

        <p className="text-center text-gray-600 mb-4">
          Please enter the OTP sent to your email address
        </p>

        <input
          type="number"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-accent"
        />

        {/* Send OTP Button */}
        <button
          onClick={handleSendOTP}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg rounded-lg mb-4 transition duration-300"
        >
          Send OTP
        </button>

        {/* Verify OTP Button */}
        <button
          onClick={handleVerifyEmail}
          className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-bold text-lg rounded-lg transition duration-300"
        >
          Verify
        </button>
      </div>
    </div>
  );
}



// import axios from "axios";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function VerifyEmail() {
//   const token = localStorage.getItem("token");
//   const [otp,setOtp] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/sendOTP`, {
//         // send otp to user
//         headers: {
//           // backend to frontend
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   },[]);
//   function handleVerifyEmail() {
//     axios
//       .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/verifyEmail`, {
//         // send otp to user
//         code : parseInt(otp)},       // frontend "code" it has backend req.body.code
//         {headers: {
//           // backend to frontend
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         toast.success("Email Verified");
//         navigate("/");
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error("Invalid OTP");
//       });
//   }
//   return (
//     <div className="w-full h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Verify Your Email
//         </h1>

//         <p className="text-center text-gray-600 mb-4">
//           Please enter the OTP sent to your email address
//         </p>

//         <input
//           type="number"
//           placeholder="Enter OTP"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-accent"
//         />

//         <button
//           onClick={handleVerifyEmail}
//           className="w-full py-3 bg-accent hover:bg-accent-dark text-white font-bold text-lg rounded-lg transition duration-300"
//         >
//           Verify
//         </button>
//       </div>
//     </div>
//   );
// }
