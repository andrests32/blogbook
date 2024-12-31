import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const BookReviewCard = ({ reviews }) => {
  const [isOpen, setIsOpen] = useState(false);

  const cardSpring = useSpring({
    scale: isOpen ? 1.05 : 1,
    boxShadow: isOpen
      ? '0 10px 20px rgba(0,0,0,0.2)'
      : '0 5px 10px rgba(0,0,0,0.1)',
  });

  const contentSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    maxHeight: isOpen ? 1000 : 0,
    overflow: 'hidden',
  });

  const renderPreviewText = (resena) => {
    if (!resena || resena === "Sin reseña disponible") {
      return "Reseña no disponible para este libro.";
    }

    const previewLength = 150; // Longitud del texto de vista previa
    return resena.length > previewLength
      ? resena.slice(0, previewLength) + "..."
      : resena;
  };

  return (
    <Link to={`/reviews/${reviews.Idpost}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
      >
        <animated.div
          style={cardSpring}
          className="bg-white rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-shadow"
          onClick={() => setIsOpen(!isOpen)}
        >
          {reviews.Portada && (
            <img
              src={reviews.Portada}
              alt={reviews.Titulo}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{reviews.Titulo}</h3>
            <p className="text-gray-700 mb-2">
              <strong>Autor:</strong> {reviews.Autor}
            </p>
            <p className="text-gray-600 mb-4">{reviews.Fecha}</p>

            <animated.div style={contentSpring}>
              <p className="text-gray-800">{renderPreviewText(reviews.Resena)}</p>
            </animated.div>
          </div>
        </animated.div>
      </motion.div>
    </Link>
  );
};

export default BookReviewCard;
