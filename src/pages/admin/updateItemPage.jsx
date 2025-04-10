import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function UpdateItemPage() {
  const location = useLocation();

  console.log(location);

  const [productKey, setProductKey] = useState(location.state.key);
  const [productName, setProductName] = useState(location.state.name);
  const [productPrice, setProductPrice] = useState(location.state.price);
  const [productCategory, setProductCategory] = useState(
    location.state.category
  );
  const [productDimension, setProductDimension] = useState(
    location.state.dimensions
  );
  const [productDescription, setProductDescription] = useState(
    location.state.description
  );
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  async function handleUpdateItem() {

    let updatingImages = location.state.image;

    if (productImages.length > 0) {
      const promises = [];

      for (let i = 0; i < productImages.length; i++) {    //alt + shi + f
        console.log(productImages[i]);
        const promise = mediaUpload(productImages[i]);
        promises.push(promise);
      }
      updatingImages = await Promise.all(promises);
    }

    console.log(
      productKey,
      productName,
      productPrice,
      productCategory,
      productDimension,
      productDescription
    );
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${productKey}`,
          {
            name: productName,
            price: productPrice,
            category: productCategory,
            dimensions: productDimension,
            description: productDescription,
            image : updatingImages
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/items");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.error);
      }
    } else {
      toast.error("You are not authorized to add items");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Update Item</h1>
      <div className="w-[400px] p-6 shadow-lg bg-white rounded-2xl border flex flex-col gap-4">
        <input
          disabled
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
        />
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className="p-2 border rounded-lg"
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <select
          className="p-2 border rounded-lg"
          onChange={(e) => setProductCategory(e.target.value)}
          value={productCategory}
        >
          <option value="audio">Audio</option>
          <option value="lights">Lights</option>
        </select>
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Product Dimensions"
          value={productDimension}
          onChange={(e) => setProductDimension(e.target.value)}
        />
        <textarea
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => {
            setProductImages(e.target.files);
          }}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleUpdateItem}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
        >
          Update Item
        </button>
        <button
          onClick={() => {
            navigate("/admin/items/");
          }}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
