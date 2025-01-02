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
        const response = await fetch("/api/reviews"); // Asegúrate de que esta URL coincida con tu API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError(
          "No se pudieron cargar las reseñas. Por favor, inténtalo más tarde."
        );
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
    return <div className="text-center py-10">Cargando reseñas...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div id="resenas" className="container mx-auto px-4 py-8">
      <h2 className="font-ui text-4xl lg:text-5xl lg:py-10 font-normal text-center text-gray-700 mb-4">
        Mis Huellas Literarias
      </h2>
      <p className="lg:max-w-screen-xl m-auto font-light font-ui italic pb-10 tracking-wide lg:text-2xl lg:pb-20 text-pretty lg:text-center">
        Los libros tienen el poder de transformar tu perspectiva y llenar tu
        mente de nuevas ideas. En estas reseñas, encontrarás historias que
        pueden inspirarte, motivarte y cambiar tu forma de ver el mundo. La
        próxima página podría ser el comienzo de algo increíble.
      </p>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-600">No hay reseñas disponibles.</p>
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
            <p className="text-center text-gray-600">
              No hay reseñas disponibles.
            </p>
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
