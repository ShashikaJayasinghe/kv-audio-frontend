import './App.css'
import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { MdOutlineRateReview, MdSpeaker } from "react-icons/md";

function App() {

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[400px] h-full bg-green-200'>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'> <BsGraphDown />Dashboard</button>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><FaRegBookmark />Bookings</button>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><MdSpeaker />Items</button>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><FaRegUser />Users</button>
        <button className='w-full h-[40px] text-[25px] font-bold flex justify-center items-center'><MdOutlineRateReview />Reviews</button>
      </div>
      <div className='w-full bg-red-900'>

      </div>
    </div>
  )
}

export default App
