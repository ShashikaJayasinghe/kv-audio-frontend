import { useState } from "react";

export default function ImageSlider (props) {
    const images = props.images;
    console.log(images);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    return(
        <div className="w-full bg-red-500 h-full flex flex-col items-center">
            <img src={selectedImage} alt="product" className="w-full h-[450px] object-cover"/>
            <div className="w-full mt-[20px] h-[150px] flex justify-center">
                {
                    images.map((image,index)=>{
                        return <img key={index} src={image} alt="product" className="w-[100px] h-[100px] mr-[2px] object-cover cursor-pointer" onClick={
                            ()=>{
                                selectedImage(image);
                            }}/>
                    })   
                }
            </div>
        </div>
    )
}