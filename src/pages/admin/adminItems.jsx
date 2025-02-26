const sampleArr = [
    {
        key: "prod-001",
        name: "Wireless Microphone",
        price: 25,
        category: "Audio Equipment",
        dimensions: "10x5x2 cm",
        description: "A high-quality wireless microphone with noise cancellation.",
        availability: true,
        image: ["https://example.com/wireless-mic.jpg"]
    },
    {
        key: "prod-002",
        name: "Portable Speaker",
        price: 30,
        category: "Audio Equipment",
        dimensions: "30x20x15 cm",
        description: "A powerful portable speaker with Bluetooth connectivity.",
        availability: true,
        image: ["https://example.com/portable-speaker.jpg"]
    },
    {
        key: "prod-006",
        name: "LED Stage Light",
        price: 35,
        category: "Lighting Equipment",
        dimensions: "25x25x10 cm",
        description: "A high-intensity LED stage light with multiple color modes.",
        availability: true,
        image: ["https://example.com/led-stage-light.jpg"]
    },
    {
        key: "prod-004",
        name: "Audio Interface",
        price: 40,
        category: "Audio Equipment",
        dimensions: "20x15x5 cm",
        description: "A high-performance audio interface for studio recordings.",
        availability: true,
        image: ["https://example.com/audio-interface.jpg"]
    },
    {
        key: "prod-005",
        name: "Stage Monitor",
        price: 60,
        category: "Audio Equipment",
        dimensions: "50x40x30 cm",
        description: "A professional stage monitor for live performances.",
        availability: true,
        image: ["https://example.com/stage-monitor.jpg"]
    }
];

import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage () {

    const [items,setItems] = useState(sampleArr);


    return(
        <div className="w-full h-full relative">
            <table>
                <thead>
                    <th>Key</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Dimensions</th>
                    <th>Availability</th>
                </thead>
                <tbody>
                    {
                        items.map((product)=>{
                            console.log(product);
                            return(
                                <tr key={product.key}>
                                    <td>{product.key}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.dimensions}</td>
                                    <td>{product.availability ? "Available" : "Not Available"}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <Link to="/admin/items/add">
                <CiCirclePlus className="text-[80px] absolute bottom-2 right-2 hover:text-red-900"/>
            </Link>
        </div>
    )
}