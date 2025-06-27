import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState(null);     // what is clicking on order
  const [modalOpened, setModalOpened] = useState(false);      // popus modal is open or not we have to keep use state to manage it

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setOrders(res.data.orders);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
    if (loading) {
        setOrders();
    }
  }, [loading]);

  function handleOrderStatusChange (orderId, status) {
    const token = localStorage.getItem("token");
    axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/orders/status/${orderId}`,     //order id and status 
        { 
            status: status,
        }, 
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(() => {
        console.log("Order status updated");
        setLoading(true);      // page refresh to show updated status
        setModalOpened(false);      // close the modal popup
    }).catch((err) => {
        console.log(err);
        setLoading(true);      
    })
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-accent">Admin Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto w-full max-w-7xl">
          <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg">
            <thead className="bg-secondary text-left">
              <tr className="text-center">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Emails</th>
                <th className="px-4 py-2">Order Date</th>
                <th className="px-4 py-2">Starting Date</th>
                <th className="px-4 py-2">Ending Date</th>
                <th className="px-4 py-2">Days</th>
                <th className="px-4 py-2">Total Amount</th>
                <th className="px-4 py-2">Approval Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50 cursor-pointer text-center" onClick={()=>{
                    setActiveOrder(order);      // set active order to clicked order
                    setModalOpened(true);       // set model opened to true
                }}>
                  <td className="px-4 py-2">{order.orderId}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(order.startingDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(order.endingDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{order.days}</td>
                  <td className="px-4 py-2">Rs. {order.totalAmount.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {
        modalOpened && (        // if modal opened then show modal
            <div className="fixed top-0 left-0 w-full h-full bg-[#00000075] flex items-center justify-center">
                <div className="w-[500px] bg-white p-4 rounded-lg shadow-lg relative">
                    <IoMdCloseCircleOutline className="absolute top-2 right-2 text-2xl cursor-pointer hover:text-red-600" onClick={() => setModalOpened(false)}/>
                    <h1 className="text-2xl text-center font-bold mb-5">Order Details</h1>
                    <div>
                        <p className="mb-2"><span className="font-semibold">Order ID:</span> {activeOrder.orderId}</p>
                        <p className="mb-2"><span className="font-semibold">Email:</span> {activeOrder.email}</p>
                        <p className="mb-2"><span className="font-semibold">Order Date:</span> {new Date(activeOrder.orderDate).toLocaleDateString()}</p>
                        <p className="mb-2"><span className="font-semibold">Starting Date:</span> {new Date(activeOrder.startingDate).toLocaleDateString()}</p>
                        <p className="mb-2"><span className="font-semibold">Ending Date:</span> {new Date(activeOrder.endingDate).toLocaleDateString()}</p>
                        <p className="mb-2"><span className="font-semibold">Days:</span> {activeOrder.days}</p>
                        <p className="mb-2"><span className="font-semibold">Total Amount:</span> Rs. {activeOrder.totalAmount.toFixed(2)}</p>
                        <p className="mb-2"><span className="font-semibold">Approval Status:</span> {activeOrder.status}</p>
                    </div>
                    <div className="w-full my-4 flex items-center space-x-4">
                    <button onClick={()=>{
                        handleOrderStatusChange(activeOrder.orderId, "Approved");
                    }} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-1 px-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-green-300">✅ Approve</button>
                    <button onClick={()=>{
                        handleOrderStatusChange(activeOrder.orderId, "Rejected");
                    }} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-6 rounded-lg shadow-md hover:scale-105 transform transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-red-300 ml-4">❌ Reject</button>
                    </div>
                        <table className="w-full mt-4">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {activeOrder.orderedItems.map((item)=>{
                                    return(
                                        <tr key={item.product.key} className="text-center">
                                            <td><img src={item.product.image} alt="" className="w-12" /></td>
                                            <td>{item.product.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>Rs. {item.product.price.toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                </div>
            </div>
        )
      }
    </div>
  );
}














// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function AdminOrdersPage() {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(()=>{
//         if (loading) {
//             const token = localStorage.getItem("token");
//             axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/`,{
//                 headers : {
//                     Authorization : `Bearer ${token}`
//                 }
//             }).then((res)=>{
//                 console.log(res.data);
//                 setOrders(res.data);
//                 setLoading(false);
//             }).catch((err)=>{
//                 console.log(err);
//                 setLoading(false);
//             })
//         }
//     },[loading]);
//   return (
//     <div className="w-full h-full flex flex-col items-center">
//         <h1>Admin Orders Page</h1>
//     </div>
//   )
// }
