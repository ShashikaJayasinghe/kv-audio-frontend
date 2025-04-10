import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function ProductOverview(){
    const params = useParams();
    const key = params.key;
    const [loadingStatus, setLoadingStatus] = useState("loading");
    const [product, setProduct] = useState({});


    useEffect(()=>{
        axios
    })
    return (
        <div>
            <h1>Product Overview</h1>
        </div>
    )
}