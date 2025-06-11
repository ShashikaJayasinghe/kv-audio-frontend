import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { MdOutlineRateReview, MdSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";
import AdminItemsPage from "./adminItems";
import AddItemPage from "./addItemPage";
import UpdateItemPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage () {
    const [userValidated, setUserValidated] = useState(false);    
    useEffect (()=>{
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
      }
      axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`,{    // getting user data ok
        headers : {
          Authorization : `Bearer ${token}`
        }
      }).then((res) => {
        console.log(res.data);
        const user = res.data;
        if (user.role == "admin") {
          setUserValidated(true);
        }
        else {
          window.location.href = "/";
        }
      }).catch((err) => {
        setUserValidated(false);      
        console.log(err);
      })
    },[])
    return (
    <div className='w-full h-screen flex'>
      <div className='w-[200px] h-full bg-green-200'>
        <Link to="/admin" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'> <BsGraphDown />Dashboard</Link>
        <Link to="/admin/orders" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><FaRegBookmark />Orders</Link>
        <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><MdSpeaker />Items</Link>
        <Link to="/admin/users" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><FaRegUser />Users</Link>
        <Link to="/admin/reviews" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><MdOutlineRateReview />Reviews</Link>
      </div>
      <div className='w-[calc(100vw-200px)]'>
        {userValidated && <Routes path="/*">    // only admin can access this path
        
          <Route path="/orders" element={<AdminOrdersPage />}></Route>
          <Route path="/users" element={<AdminUsersPage />}></Route>
          <Route path="/items" element={<AdminItemsPage />}></Route>
          <Route path="/items/add" element={<AddItemPage />}></Route>
          <Route path="/items/edit" element={<UpdateItemPage />} ></Route>
        
        </Routes>}
      </div>
    </div>
    )
}