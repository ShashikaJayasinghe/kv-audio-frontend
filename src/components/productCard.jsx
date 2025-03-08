export default function ProductCard({ item }) {
    return (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-80 transition-transform transform hover:scale-105 hover:shadow-2xl m-4 border border-gray-200">
            <img 
                src={item.image[0]} 
                alt={item.name} 
                className="w-full h-48 object-cover rounded-xl mb-4 transition-opacity hover:opacity-90"
            />
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{item.name}</h2>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <p className="text-gray-500 text-sm mb-3"><strong>Dimensions:</strong> {item.dimensions}</p>
                <p className="text-xl font-semibold text-blue-600 mb-3">${item.price}</p>
                <p className={`text-sm font-medium px-3 py-1 rounded-lg inline-block mb-3 ${item.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.availability ? '✔ In Stock' : '✖ Out of Stock'}
                </p>
                <button 
                    className={`w-full py-3 rounded-lg text-white font-semibold transition duration-300 flex items-center justify-center gap-2 ${item.availability ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                    disabled={!item.availability}
                >
                    {item.availability ? '🛒 Add to Cart' : '🚫 Sold Out'}
                </button>
            </div>
        </div>
    );
}