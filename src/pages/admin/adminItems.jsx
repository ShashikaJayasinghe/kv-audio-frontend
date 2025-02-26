import axios from "axios";
import { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (key) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
        setItems(items.filter((item) => item.key !== key));
        const token = localStorage.getItem("token");
        axios.delete(`http://localhost:3000/api/products/${key}`, {
            headers : { Authorization: `Bearer ${token}` },
        }).then((res)=>{
            console.log(res.data);
            window.location.reload();
        }).catch ((err)=>{
            console.log(err);
        })
    }
  };

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 text-left">Key</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Dimensions</th>
              <th className="p-3 text-left">Availability</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((product) => (
              <tr key={product.key} className="border-b hover:bg-gray-100">
                <td className="p-3 border">{product.key}</td>
                <td className="p-3 border">{product.name}</td>
                <td className="p-3 border">${product.price}.00</td>
                <td className="p-3 border">{product.category}</td>
                <td className="p-3 border">{product.dimensions}</td>
                <td className="p-3 border text-green-600 font-bold">
                  {product.availability ? "Available" : "Not Available"}
                </td>
                <td className="p-3 flex justify-center gap-4">
                  <Link to={`/admin/items/edit/${product.key}`} className="text-blue-500 hover:text-blue-700 rounded transition">
                    <FaEdit size={18} className="inline mr-1" />Edit
                  </Link>
                  <button onClick={() => handleDelete(product.key)} className="text-red-500 hover:text-red-700 rounded transition">
                    <FaTrashAlt size={18} className="inline mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/admin/items/add" className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-800 transition-all">
        <CiCirclePlus size={50} />
      </Link>
    </div>
  );
}
