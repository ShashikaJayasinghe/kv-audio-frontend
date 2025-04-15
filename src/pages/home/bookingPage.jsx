import { useState } from "react"
import { loadCart } from "../../utils/cart"
import BookingItem from "../../components/bookingItem";

export default function BookingPage () {
    const [cart, setCart] = useState(loadCart());       //load cart
    console.log(cart);

    function reloadCart () {
        setCart(loadCart());        //reload cart   it means again run setCart const [cart, setCart] = useState(loadCart()) full page resfresh
    }
    

    return (
        <div className="w-full h-full flex flex-col items-center">
            <h1>Create Booking</h1>
            <div className="w-full flex flex-col items-center">
                {
                    cart.orderedItems.map((item)=>{
                        return<BookingItem itemKey = {item.key} qty={item.qty} refresh = {reloadCart}/>     //pass itemKey and qty refresh function
                    })
                }
            </div>
        </div>
    )
}