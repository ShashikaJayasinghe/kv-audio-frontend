import { useEffect, useState } from "react"
import { formatDate, loadCart } from "../../utils/cart"
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage () {
    const [cart, setCart] = useState(loadCart());

    const today = formatDate(new Date());
    const tomorrow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const [startingDate, setStartingDate] = useState(today);
    const [endingDate, setEndingDate] = useState(tomorrow);
    const [total, setTotal] = useState(0);

    function reloadCart () {
        setCart(loadCart());
        calculateTotal();
    }

    function calculateTotal () {
        const cartInfo = loadCart();
        cartInfo.startingDate = startingDate;       
        cartInfo.endingDate = endingDate;   //frontend to backend
        cartInfo.days = daysBetween;
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`,
            cartInfo       
        ).then ((res)=>{
            console.log(res.data);
            setTotal(res.data.total);
        }).catch ((err)=>{
            console.log(err);
        })
    }

    useEffect (()=>{
        calculateTotal();       //use first time to calculate total
    },[startingDate, endingDate])       //useEffect will run when startingDate or endingDate changes
    function handleBookingCreation () {
        const cart = loadCart();        // we are sending booking as a cart
        cart.startingDate = startingDate;       // frontend to backend(const [startingDate, setStartingDate] = useState(today);)
        cart.endingDate = endingDate; 
        cart.days = daysBetween;  //frontend to backend      

        const token = localStorage.getItem("token");
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res.data);
            localStorage.removeItem("cart");
            toast.success("Booking Success");
            setCart(loadCart());
        }).catch((err) => {
            console.log(err);
            toast.error("An error occured");
        })

    }

    function calculateDaysBetween(start, end) {
        const startObj = new Date(start);
        const endObj = new Date(end);
        const diffTime = endObj.getTime() - startObj.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    const daysBetween = calculateDaysBetween(startingDate, endingDate);

    return (
        <div className="w-full h-full flex flex-col items-center p-6 gap-6 bg-primary min-h-screen">
            <h1 className="text-4xl font-semibold text-accent mb-6 tracking-wide">Create Booking</h1>


            {/* Date Picker Section */}
            <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-6 space-y-4">
                <div>
                    <label className="block text-accent font-semibold mb-1">Starting Date</label>
                    <input 
                        type="date" 
                        value={startingDate} 
                        onChange={(e) => setStartingDate(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition"
                    />
                </div>

                <div>
                    <label className="block text-accent font-semibold mb-1">Ending Date</label>
                    <input 
                        type="date" 
                        value={endingDate} 
                        onChange={(e) => setEndingDate(e.target.value)} 
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent transition"
                    />
                </div>

                <div className="text-sm text-gray-700 font-medium">
                    Total Days: <span className="text-accent">{daysBetween > 0 ? daysBetween : 0}</span> day{daysBetween !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Booking Items Section */}
            <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
                {
                    cart.orderedItems.map((item) => (
                        <BookingItem 
                            key={item.key} 
                            itemKey={item.key} 
                            qty={item.qty} 
                            refresh={reloadCart} 
                        />
                    ))
                }
            </div>

            <div className="w-full max-w-xl mt-4">
  <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col sm:flex-row justify-between items-center">
    <h3 className="text-sm font-medium text-accent mb-2 sm:mb-0">Total Amount</h3>
    <p className="text-xl font-bold text-accent tracking-tight">{total.toFixed(2)}</p>
  </div>
</div>


            <div className="w-full flex justify-center mt-4">
                <button className="w-[200px] h-[50px] bg-blue-500 text-secondary py-2 mb-4 rounded-lg hover:bg-blue-600 transition" onClick={handleBookingCreation}>Create Booking</button>
            </div>
        </div>
    )
}








// import { useState } from "react"
// import { formatDate, loadCart } from "../../utils/cart"
// import BookingItem from "../../components/bookingItem";

// export default function BookingPage () {
//     const [cart, setCart] = useState(loadCart());       //load cart
//     const today = formatDate(new Date());       // run formatDate funtion and get today date
//     const tommorow = formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000));     // run formatDate funtion and get tommorow date
//     console.log(cart);

//     function reloadCart () {
//         setCart(loadCart());        //reload cart   it means again run setCart const [cart, setCart] = useState(loadCart()) full page resfresh
//     }
    

//     return (
//         <div className="w-full h-full flex flex-col items-center">
//             <h1>Create Booking</h1>
//             <div className="w-full flex flex-col items-center">
//                 {
//                     cart.orderedItems.map((item)=>{
//                         return<BookingItem itemKey = {item.key} qty={item.qty} refresh = {reloadCart}/>     //pass itemKey and qty refresh function
//                     })
//                 }
//             </div>
//             <div className="w-full flex justify-center">

//             </div>
//         </div>
//     )
// }