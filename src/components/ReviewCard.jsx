import React from "react";
import { useSpring, animated } from "react-spring";
import { Calendar, User } from "lucide-react";

const ReviewCard = ({ review, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const springProps = useSpring({
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    boxShadow: isHovered
      ? "0 8px 20px rgba(0,0,0,0.2)"
      : "0 4px 6px rgba(0,0,0,0.1)"
  });

  if (!review) return null;

  const { Portada, Titulo, Autor, Fecha, Idpost, Opinion } = review;

  return (
    <animated.div
      style={springProps}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(Idpost)}
      className="bg-white rounded-lg overflow-hidden cursor-pointer w-full sm:w-96 md:w-80 lg:w-96 xl:w-[420px] mx-auto shadow-lg"
    >
      <div
        id="resenas"
        className="relative h-48 sm:h-56 md:h-64 overflow-hidden"
      >
        {Portada ? (
          <img
            src={Portada}
            alt={Titulo}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-2xl">Sin imagen</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white text-xl font-bold line-clamp-2">
            {Titulo}
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="font-medium">{Autor || "Desconocido"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{Fecha || "Sin fecha"}</span>
          </div>
        </div>
        <p className="text-gray-700 line-clamp-3">
          {Opinion || "No hay texto disponible para esta reseña."}
        </p>
        <button className="font-ui italic text-gray-800 hover:text-blue-800 transition-colors duration-200 text-sm font-medium">
          Leer más
        </button>
      </div>
    </animated.div>
  );
};

export default ReviewCard;
