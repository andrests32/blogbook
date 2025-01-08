import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { Calendar, User, Star, BookOpen, Award } from "lucide-react";

const EnhancedReviewCard = ({ review, onClick, isLoading }) => {
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    boxShadow: isHovered
      ? "0 12px 24px rgba(0,0,0,0.2)"
      : "0 4px 6px rgba(0,0,0,0.1)",
    config: config.wobbly,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!review) return null;

  const { Portada, Titulo, Autor, Fecha, Opinion, Valor, Genero } = review;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <animated.div
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-xl overflow-hidden cursor-pointer w-full sm:w-96 md:w-80 lg:w-96 xl:w-[420px] mx-auto shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative h-80 overflow-hidden"> {/* Ajuste de altura */}
        {Portada ? (
          <img
            src={Portada}
            alt={Titulo}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
            <BookOpen className="h-16 w-16 text-gray-400" />
          </div>
        )}
        <div className="absolute top-0 left-0 m-4 bg-white bg-opacity-90 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 flex items-center space-x-1">
          <Award className="h-4 w-4 text-emerald-600" />
          <span className="font-ui">{Genero || "Sin categoría"}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
          <h3 className="text-white text-2xl font-bold line-clamp-2 drop-shadow-lg mb-2 truncate">
            {Titulo}
          </h3>
          <div className="flex items-center space-x-2">
            {renderStars(Valor)}
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5  text-emerald-600" />
            <span className="font-medium text-gray-700">{Autor || "Desconocido"}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5  text-emerald-600" />
            <span className="text-gray-700">{Fecha || "Sin fecha"}</span>
          </div>
        </div>
        <p className="text-gray-700 line-clamp-3 text-sm leading-relaxed">
          {Opinion || "No hay texto disponible para esta reseña."}
        </p>
        <div className="pt-4 border-t border-gray-200">
          <button
            onClick={() => onClick(review.Idpost)} // Evento en el botón
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-ui font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50"
          >
            Leer más
          </button>
        </div>
      </div>
    </animated.div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden w-full sm:w-96 md:w-80 lg:w-96 xl:w-[420px] mx-auto shadow-lg animate-pulse">
      <div className="h-80 bg-gray-200 relative">
        <div className="absolute top-0 left-0 m-4 bg-gray-300 rounded-full h-6 w-24"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-full h-4 bg-gray-200 rounded"></div>
          <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="pt-4 border-t border-gray-200">
          <div className="w-full h-10 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedReviewCard;
