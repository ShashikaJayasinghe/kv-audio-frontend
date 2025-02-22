import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { MdOutlineRateReview, MdSpeaker } from "react-icons/md";
import { Link, Route, Routes } from "react-router-dom";

export default function AdminPage () {
    return (
    <div className='w-full h-screen flex'>
      <div className='w-[400px] h-full bg-green-200'>
        <Link to="/admin" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'> <BsGraphDown />Dashboard</Link>
        <Link to="/admin/bookings" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><FaRegBookmark />Bookings</Link>
        <Link to="/admin/items" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><MdSpeaker />Items</Link>
        <Link to="/admin/users" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><FaRegUser />Users</Link>
        <Link to="/admin/reviews" className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><MdOutlineRateReview />Reviews</Link>
      </div>
      <div className='w-[calc(100vw-400px)] bg-blue-900'>
        <Routes path="/*">
        
          <Route path="/bookings" element={<h1>Booking Page</h1>}></Route>
          <Route path="/items" element={<h1>Items page</h1>}></Route>
        
        </Routes>
      </div>
    </div>
    )
}