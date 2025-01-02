import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserCircle, CalendarDays, BookOpen, Star, Clock, Hash } from 'lucide-react';

const ReviewDetail = ({ review, onClose }) => {
  if (!review) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-light">No se pudo cargar la reseña.</p>
      </div>
    );
  }

  const { Titulo, Autor, Fecha, Opinion, Portada, Calificacion, Duracion, ISBN } = review;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 8 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 50, stiffness: 500 }}
          className="bg-white w-full h-full md:rounded-2xl md:shadow-2xl md:w-[90vw] md:h-[90vh] md:max-w-6xl flex flex-col md:flex-row overflow-hidden relative"
        >
          {/* Botón de cierre (visible en ambos diseños) */}
          <button
            className="absolute top-4 right-4 z-20 text-gray-600 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full p-2 bg-slate-200/80"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Diseño para móvil */}
          <div className="md:hidden flex flex-col h-full overflow-y-auto">
            <div className="relative h-64 bg-gray-100">
              {Portada ? (
                <img
                  src={Portada}
                  alt={Titulo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen size={80} className="text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-6 bg-white flex-grow">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">{Titulo || "Sin título"}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <UserCircle size={20} className="mr-2 flex-shrink-0" />
                <span className="font-medium mr-1">Autor:</span>
                <span>{Autor || "Desconocido"}</span>
              </div>
              
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-gray-600">
                  <CalendarDays size={18} className="mr-2 flex-shrink-0" />
                  <span>{Fecha || "Fecha no especificada"}</span>
                </div>
                {Calificacion && (
                  <div className="flex items-center text-gray-600">
                    <Star size={18} className="mr-2 flex-shrink-0" />
                    <span>Calificación: {Calificacion}</span>
                  </div>
                )}
                {Duracion && (
                  <div className="flex items-center text-gray-600">
                    <Clock size={18} className="mr-2 flex-shrink-0" />
                    <span>Duración: {Duracion}</span>
                  </div>
                )}
                {ISBN && (
                  <div className="flex items-center text-gray-600">
                    <Hash size={18} className="mr-2 flex-shrink-0" />
                    <span>ISBN: {ISBN}</span>
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Opinión</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {Opinion || "Sin opinión disponible"}
                </p>
              </div>
            </div>
          </div>

          {/* Diseño para PC */}
          <div className="hidden md:flex h-full w-full">
            {/* Contenedor de la portada (fijo) */}
            <div className="w-2/5 bg-gray-100 relative">
              {Portada ? (
                <img
                  src={Portada}
                  alt={Titulo}
                  className="w-full h-full object-cover absolute inset-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center absolute inset-0">
                  <BookOpen size={120} className="text-gray-400" />
                </div>
              )}
            </div>
            {/* Contenedor del contenido (scrolleable) */}
            <div className="w-3/5 p-8 overflow-y-auto">
              <h1 className="text-4xl font-bold mb-6 text-gray-800">{Titulo || "Sin título"}</h1>
              <div className="mb-6">
                <div className="flex items-center text-gray-700 text-xl mb-2">
                  <UserCircle size={28} className="mr-3 text-blue-500" />
                  <span className="font-medium mr-2">Autor:</span>
                  <span>{Autor || "Desconocido"}</span>
                </div>
                <div className="flex items-center text-gray-700 text-xl">
                  <CalendarDays size={28} className="mr-3 text-green-500" />
                  <span>{Fecha || "Fecha no especificada"}</span>
                </div>
              </div>
              
              <div className="mb-8 space-y-3">
                {Calificacion && (
                  <div className="flex items-center text-gray-700 text-lg">
                    <Star size={24} className="mr-3 text-yellow-500" />
                    <span>Calificación: {Calificacion}</span>
                  </div>
                )}
                {Duracion && (
                  <div className="flex items-center text-gray-700 text-lg">
                    <Clock size={24} className="mr-3 text-purple-500" />
                    <span>Duración: {Duracion}</span>
                  </div>
                )}
                {ISBN && (
                  <div className="flex items-center text-gray-700 text-lg">
                    <Hash size={24} className="mr-3 text-red-500" />
                    <span>ISBN: {ISBN}</span>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Opinión</h3>
                <p className="text-gray-700 text-lg leading-relaxed text-justify">
                  {Opinion || "Sin opinión disponible"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewDetail;

