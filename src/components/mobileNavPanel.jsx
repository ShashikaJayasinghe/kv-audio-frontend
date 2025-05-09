import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { MdContacts, MdPhotoLibrary, MdRateReview } from "react-icons/md";
import { FaHome, FaRegCalendarCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsSpeakerFill } from "react-icons/bs";

export default function MobileNavPanel({ isOpen, setOpen }) {
    const [slideIn, setSlideIn] = useState(false);
    const navigate = useNavigate();

    function goTo(route) {
        navigate(route);
        setOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setSlideIn(true), 100);
        } else {
            setSlideIn(false);
        }
    }, [isOpen]);

    const navItems = [
        { icon: <FaHome />, label: "Home", route: "/" },
        { icon: <BsSpeakerFill />, label: "Items", route: "/items" },
        { icon: <MdContacts />, label: "Contacts", route: "/contact" },
        { icon: <MdPhotoLibrary />, label: "Gallery", route: "/gallery" },
        { icon: <MdRateReview />, label: "Reviews", route: "/reviews" },
        { icon: <FaRegCalendarCheck />, label: "Booking", route: "/booking" },
    ];

    return (
        <>
            {isOpen && (
                <div className="w-full h-screen bg-black/60 fixed top-0 left-0 z-50 transition-opacity duration-300">
                    <div
                        className={`h-full bg-primary w-[calc(100vw-50px)] fixed top-0 left-0 transform transition-transform duration-300 ease-in-out ${
                            slideIn ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        {/* Header */}
                        <div className="bg-accent w-full h-[70px] flex relative justify-center items-center shadow-md">
                            <img
                                src="/logo.png"
                                alt="Logo"
                                className="w-[60px] h-[60px] object-cover rounded-md absolute left-3 top-2"
                            />
                            <IoMdClose
                                className="absolute right-4 text-[26px] text-white hover:text-red-400 cursor-pointer transition duration-200"
                                onClick={() => setOpen(false)}
                            />
                        </div>

                        {/* Navigation Items */}
                        <div className="flex flex-col mt-4 gap-2">
                            {navItems.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => goTo(item.route)}
                                    className="flex items-center gap-3 text-accent text-lg px-4 py-3 rounded-xl hover:bg-accent/20 hover:text-white transition-all duration-200 cursor-pointer"
                                >
                                    <span className="text-[22px]">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}









// import { IoMdClose } from "react-icons/io";
// import { useEffect, useState } from "react";
// import { CiHome } from "react-icons/ci";
// import { useNavigate } from "react-router-dom";

// export default function MobileNavPanel({ isOpen, setOpen }) {
//     const [slideIn, setSlideIn] = useState(false);
//     const navigate = useNavigate();



//     function goTo(route){
//         navigate(route);
//         setOpen(false);
//     }

//     useEffect(() => {
//         if (isOpen) {
//             // Delay to allow mounting before slide-in
//             setTimeout(() => setSlideIn(true), 100);
//         } else {
//             setSlideIn(false);
//         }
//     }, [isOpen]);

//     return (
//         <>
//             {isOpen && (
//                 <div className="w-full h-screen bg-[#00000070] fixed top-0 left-0 z-50 transition-opacity duration-300">
//                     <div
//                         className={`h-full bg-primary w-[calc(100vw-50px)] fixed top-0 left-0 transform transition-transform duration-300 ease-in-out ${
//                             slideIn ? "translate-x-0" : "-translate-x-full"
//                         }`}
//                     >
//                         <div className="bg-accent w-full h-[70px] flex relative justify-center items-center">
//                             <img
//                                 src="/logo.png"
//                                 alt="Logo"
//                                 className="w-[70px] h-[70px] object-cover absolute left-1 top-2"
//                             />
//                             <IoMdClose
//                                 className="absolute right-3 text-[25px] cursor-pointer"
//                                 onClick={() => setOpen(false)}
//                             />
//                         </div>
//                         <div onClick={()=>{goTo("/")}} className="w-full h-[40px] text-accent text-[20px] flex justify-center items-center cursor-pointer">
//                             <CiHome />
//                             Home
//                         </div>
//                         {/* contacts, gallery, items, reviews, booking */}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }



// import { IoMdClose } from "react-icons/io";

// export default function MobileNavPanel (props) {
//     const isOpen = props.isOpen;
//     const setOpen = props.setOpen;
//     return (
//         <>
//            {isOpen&&<div className="w-full h-screen bg-[#00000070] fixed top-0 left-0">
//                 <div className="h-full bg-primary w-[calc(100vw-50px)]">
//                     <div className="bg-accent w-full h-[70px] flex relative justify-center items-center">
//                         <img src="/logo.png" alt="Logo" className="w-[70px] h-[70px] object-cover absolute left-1 top-2" />
//                         <IoMdClose
//                             className="absolute right-3 text-[25px] cursor-pointer"
//                             onClick={() => {
//                                 setOpen(false);
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>}
//         </>
//     )
// }