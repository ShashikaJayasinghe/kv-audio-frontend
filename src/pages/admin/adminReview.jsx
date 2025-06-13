import { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews');
        setReviews(response.data);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center py-8">Loading reviews...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-accent mb-6">Customer Reviews</h2>
      
      {reviews.length === 0 ? (
        <div className="bg-primary p-6 rounded-lg shadow">
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review._id} className="bg-primary p-6 rounded-lg shadow">
              <div className="flex items-start space-x-4">
                <img 
                  src={review.profilePicture} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{review.name}</h4>
                      <div className="flex text-yellow-400 mb-1">
                        {'★'.repeat(parseInt(review.rating))}
                        {'☆'.repeat(5 - parseInt(review.rating))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;