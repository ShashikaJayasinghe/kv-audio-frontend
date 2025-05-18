import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import MobileNavPanel from "./mobileNavPanel";

export default function Header () {
    const [navPanelOpen, setNavPanelOpen] = useState(false);
    const token = localStorage.getItem("token");
    return(
        <header className="w-full h-[70px] shadow-xl flex justify-center items-center relative bg-accent text-secondary">
            <img src="/logo.png" alt="Logo" className="w-[80px] h-[80px] object-cover absolute left-1 top-1"/>
            <div className="hidden w-[450px] md:flex justify-evenly items-center">
                <Link to="/" className="hidden md:block text-[22px]  m-1">Home</Link>
                <Link to="/contact" className="hidden md:block text-[22px]  m-1">Contact</Link>
                <Link to="/gallery" className="hidden md:block text-[22px]  m-1">Gallery</Link>
                <Link to="/items" className="hidden md:block text-[22px]  m-1">Items</Link>
                <Link to="/reviews" className="hidden md:block text-[22px]  m-1">Review</Link>
                <Link to="/booking" className="hidden md:block text-[22px]  m-1 absolute right-24"><FaShoppingCart /></Link>
            </div>
            <GiHamburgerMenu className="absolute right-5 text-[25px] md:hidden" 
            onClick={()=>{
                setNavPanelOpen(true);
            }}/>
            {token != null &&<button className="hidden md:block absolute right-5 text-[25px]" onClick={()=>{        // if token is have then show the logout
                localStorage.removeItem("token");
                window.location.href = "/login";
            }}>logout</button>}
            <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />      
        </header>
    )
}

