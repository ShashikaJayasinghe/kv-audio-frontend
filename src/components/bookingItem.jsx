import axios from "axios";
import { useEffect, useState } from "react";
import { removeFromCart } from "../utils/cart";
import { FaTrash } from "react-icons/fa";

export default function BookingItem(props) {
  const { itemKey, qty, refresh } = props;
  const [item, setItem] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (status === "loading") {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setStatus("success");
        })
        .catch((err) => {
          console.log(err);
          removeFromCart(itemKey);
          refresh();
        });
    }
  }, [status]);

  if (!item) {
    return (
      <div className="bg-secondary p-4 rounded-lg shadow-md mb-4">
        <p className="text-accent font-semibold">Loading item...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-lg bg-secondary shadow-sm mb-4 transition duration-200">
      {/* Product Image */}
      <img
        src={item.image[0]}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md border border-gray-200"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-accent">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.category}</p>
        <p className="mt-1 text-sm text-gray-700">Qty: <span className="font-medium">{qty}</span></p>
        <p className="mt-1 text-sm text-gray-700">
          Price: <span className="font-medium">LKR.{item.price.toFixed(2)}</span>
        </p>
        <p className="mt-1 text-sm font-semibold text-accent">
          Total: LKR.{(item.price * qty).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        className="mt-2 sm:mt-0 flex items-center gap-2 text-red-600 hover:text-red-800 transition duration-150"
        onClick={() => {
          removeFromCart(itemKey);
          refresh();
        }}
      >
        <FaTrash /> <span className="text-sm">Remove</span>
      </button>
    </div>
  );
}




































































// import axios from "axios";
// import { useEffect, useState } from "react";
// import { removeFromCart } from "../utils/cart";

// export default function BookingItem (props) {       //In properties or props we have itemKey and qty
//     const {itemKey, qty, refresh} = props;      //destructure the props and get itemKey and qty and refresh function ok
//     const [item, setItem] = useState(null);
//     const [status, setStatus] = useState("loading");        //loading, success, error

//     useEffect (()=>{        //page refresh 
//         if (status == "loading") {          //if status is loading
//             axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${itemKey}`).then((res)=>{         //fetch the data 
//                 setItem(res.data);              //set the item
//                 console.log(res.data);
//                 setItem("success");             //set status to success
//             }).catch((err)=>{                    
//                 console.log(err);               
//                 removeFromCart(itemKey);        //If its error then remove item from cart  
//                 refresh();                      //refresh cart      
//             })
//         }
//     },[status]);      //useEffect will run when status changes. depending on status we will do something

//     return (
//         <div className="flex flex-row items-center">
//             <span>{itemKey}</span>
//             <span> x {qty}</span>
//         </div>
//     )
// }