import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ProductOverview(){
    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});


    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`).then((res)=>{
            setProduct(res.data);
            setLoadingStatus("loaded");
            console.log(res.data);
        }).catch((err)=>{
            console.error(err);
            setLoadingStatus("error");
        })
    },[])
    return (
        <div className="w-full h-full flex justify-center">
            {
                loadingStatus == "loading" && <div className="w-full h-full flex justify-center items-center">
                        <div className="w-[70px] h-[70px] border-b-2 border-b-accent animate-spin rounded-full"></div>
                    </div>
            }
            {
                loadingStatus == "loaded" && <div className="w-full h-full flex justify-center items-center">

                </div>
            }
        </div>
    )
}