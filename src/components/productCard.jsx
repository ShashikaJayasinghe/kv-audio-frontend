import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
    return (
        <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl relative p-6 w-80 transition-transform transform hover:scale-105 hover:shadow-2xl m-4 border border-gray-100 hover:border-blue-200 hover:ring-2 hover:ring-blue-300 duration-300">
            <img 
                src={item.image[0]} 
                alt={item.name || "Product Image"} 
                className="w-full h-48 object-cover rounded-xl mb-4 transition-opacity hover:opacity-90"        // Add hover:opacity-90 class
            />
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{item.name}</h2>
                <p className="text-sm text-gray-500 italic mb-1">{item.category}</p>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-gray-500 text-sm mb-1"><strong>Dimensions:</strong> {item.dimensions}</p>
                <p className="text-xl font-semibold text-blue-600 mb-2">${parseFloat(item.price).toFixed(2)}</p>
                
                <p className={`text-xs font-medium px-3 py-1 rounded-full inline-block mb-3 ${item.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.availability ? '✔ In Stock' : '✖ Out of Stock'}
                </p>

                <Link
                    to={item.availability ? `/product/${item.key}` : "#"}
                    className={`w-full block py-3 rounded-xl text-white font-semibold transition duration-300 text-sm mt-2 ${
                        item.availability
                            ? 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 shadow-md hover:shadow-xl'
                            : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={e => !item.availability && e.preventDefault()}
                >
                    {item.availability ? '🛒 View Details' : '🚫 Sold Out'}
                </Link>
            </div>
        </div>
    );
}
