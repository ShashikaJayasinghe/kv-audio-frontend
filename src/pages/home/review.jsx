import { useState } from 'react';
import axios from 'axios';
import { StarIcon } from '@heroicons/react/24/solid';

const ReviewForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    rating: '5',
    comment: '',
    profilePicture: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hoverRating, setHoverRating] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/reviews', formData);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  if (submitted) {
    return (
      <div className="max-w-md mx-auto p-8 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mt-8 text-center animate-fade-in">
        <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-accent mb-2">Thank you for your review!</h3>
        <p className="text-gray-600 mb-4">Your review is pending approval and will appear soon.</p>
        <button 
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 bg-accent/10 text-accent rounded-full hover:bg-accent/20 transition-all duration-300"
        >
          Submit Another Review
        </button>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg mt-8 animate-fade-in"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Share Your Experience</h2>
      
      {error && (
        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Your Name*</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          required
          placeholder="John Doe"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Email Address*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          required
          placeholder="your@email.com"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">Your Rating*</label>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setFormData({...formData, rating: star.toString()})}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="focus:outline-none"
            >
              <StarIcon
                className={`h-8 w-8 ${(hoverRating || parseInt(formData.rating)) >= star ? 'text-yellow-400' : 'text-gray-300'} transition-colors duration-200`}
              />
            </button>
          ))}
          <span className="ml-2 text-gray-600">{formData.rating} Stars</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Your Review*</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
          required
          rows="5"
          placeholder="Share your thoughts about your experience..."
        />
      </div>
      
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">Profile Picture URL</label>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <img 
              src={formData.profilePicture || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk6zbqP47FBX9FbPUsz8-8fdEFKSisLnoLGKzxsDKwDhl_J-QYnMFRDf3Ghas2qvgWYUs&usqp=CAU"} 
              alt="Preview" 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
            />
          </div>
          <input
            type="url"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleChange}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-200"
            placeholder="Paste your profile image URL"
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className="w-full bg-gradient-to-r from-accent to-blue-600 text-white py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 font-medium flex items-center justify-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;