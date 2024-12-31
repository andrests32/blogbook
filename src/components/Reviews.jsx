import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import ReviewDetail from "./ReviewDetail";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Asegúrate de que esta URL coincida con tu API de Astro
        const response = await fetch("/api/reviews");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewClick = (id) => {
    const review = reviews.find((r) => r.Idpost === id);
    setSelectedReview(review);
  };

  const handleCloseDetail = () => {
    setSelectedReview(null);
  };

  if (loading) {
    return <div className="text-center py-10">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div 
    id="resenas"
    className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Opiniones
      </h1>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">No hay opiniones disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(reviews) && reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard
                key={review.Idpost}
                review={review}
                onClick={handleReviewClick}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No hay opiniones disponibles.</p>
          )}
        </div>
      )}
      {selectedReview && (
        <ReviewDetail review={selectedReview} onClose={handleCloseDetail} />
      )}
    </div>
  );
};

export default Reviews;
