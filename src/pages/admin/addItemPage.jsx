import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("audio");
  const [productDimension, setProductDimension] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImages, setProductImages] = useState([]);
  const navigate = useNavigate();

  const handleAddItem = async () => {
    if (productImages.length > 5) {
      toast.error("You can only upload up to 5 images.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to add items");
      return;
    }

    try {
      // Upload all images
      const uploadPromises = Array.from(productImages).map(file => mediaUpload(file));
      const imageUrls = await Promise.all(uploadPromises);

      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products`,
        {
          key: productKey,
          name: productName,
          price: productPrice,
          category: productCategory,
          dimensions: productDimension,
          description: productDescription,
          image: imageUrls,
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
      console.error(err);
      toast.error(err?.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-6">Add Items</h1>
      <div className="w-[400px] p-6 shadow-lg bg-white rounded-2xl border flex flex-col gap-4">
        <input
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
          onChange={(e) => setProductPrice(Number(e.target.value))}
        />
        <select
          className="p-2 border rounded-lg"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
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
        <input
          className="p-2 border rounded-lg"
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <input
          type="file"
          multiple
          onChange={(e) => setProductImages(e.target.files)}
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleAddItem}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
        >
          Add
        </button>
        <button
          onClick={() => navigate("/admin/items/")}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import mediaUpload from "../../utils/mediaUpload";

// export default function AddItemPage() {
//   const [productKey, setProductKey] = useState("");
//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState(0);
//   const [productCategory, setProductCategory] = useState("audio");
//   const [productDimension, setProductDimension] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productImages, setProductImages] = useState([])  //To store multiple files
//   const navigate = useNavigate();


//   async function handleAddItem () {   // async function to add item
//   async function handleAddItem () {
//     const promises = []

//     for (let i = 0; i<productImages.length; i++) {
//       console.log(productImages[i])
//       const promise = mediaUpload(productImages[i])
//       promises.push(promise);
//       // if (i == 5) {
//       //   toast.error("You can only upload 5 pictures at a time");
//       //   break;
//       // }
//     }

//     // Promise.all(promises).then((result)=>{
//     //   console.log(result)
//     // }).catch((err)=>{
//     //   toast.error(err)
//     // })


//     console.log(productKey,productName,productPrice,productCategory,productDimension,productDescription);
//     const token = localStorage.getItem("token")

//     if (token) {
//         try{
//             const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,{    //axios call
//             // Promise.all(promises).then((result)=>{
//             //   console.log(result)
//             // }).catch((err)=>{
//             //     toast.error(err)
//             // })
            
//             const imageUrls = await Promise.all(promises);

//             const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/products`,{
//                 key : productKey,
//                 name : productName,
//                 price : productPrice,
//                 category : productCategory,
//                 dimensions : productDimension,
//                 description : productDescription,
//                 image : imageUrls,
//             },
//             {
//                 headers : {
//                     Authorization : "Bearer " + token,
//                 },
//             }
//           );
//             toast.success(result.data.message);
//             navigate("/admin/items");

//         }catch (err) {
//             console.log(err)
//             toast.error(err.response.data.error);
//         } 
        
//     }else {
//         toast.error("You are not authorized to add items")
//     }

//   }

//   return (
//     <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
//       <h1 className="text-2xl font-bold mb-6">Add Items</h1>
//       <div className="w-[400px] p-6 shadow-lg bg-white rounded-2xl border flex flex-col gap-4">
//         <input className="p-2 border rounded-lg" type="text" placeholder="Product Key" value={productKey} onChange={(e) => setProductKey(e.target.value)} />
//         <input className="p-2 border rounded-lg" type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
//         <input className="p-2 border rounded-lg" type="number" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
//         <select className="p-2 border rounded-lg" onChange={(e) => setProductCategory(e.target.value)} value={productCategory}>
//           <option value="audio">Audio</option>
//           <option value="lights">Lights</option>
//         </select>
//         <input className="p-2 border rounded-lg" type="text" placeholder="Product Dimensions" value={productDimension} onChange={(e) => setProductDimension(e.target.value)} />
//         <input className="p-2 border rounded-lg" type="text" placeholder="Product Description" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
//         <input type="file" multiple onChange={(e)=>{setProductImages(e.target.files)}} className="p-2 border rounded-lg" />
//         <button onClick={handleAddItem} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl">Add</button>
//         <button onClick={()=>{navigate("/admin/items/")}} className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl">Cancel</button>
//       </div>
//     </div>
//   );
// }
