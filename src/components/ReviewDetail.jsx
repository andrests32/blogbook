import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  X,
  UserCircle,
  CalendarDays,
  BookOpen,
  ChevronDown
} from "lucide-react";

const ReviewDetail = ({ review, onClose }) => {
  const scrollRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      if (scrollHeight > clientHeight) {
        controls.start({ opacity: 1 });
      } else {
        controls.start({ opacity: 0 });
      }
    }
  }, [review, controls]);

  if (!review) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600 text-xl font-light">
          No se pudo cargar la reseña.
        </p>
      </div>
    );
  }

  const { Titulo, Autor, Fecha, Opinion, Portada } = review;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center p-4 z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
        >
          <div className="md:w-2/5 relative bg-gray-100">
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
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-black bg-opacity-85">
              <h2 className="text-3xl font-bold mb-2 text-white">
                {Titulo || "Sin título"}
              </h2>
              <div className="flex items-center text-sm text-white mb-1">
                <UserCircle size={18} className="mr-2" />
                <span>{Autor || "Autor desconocido"}</span>
              </div>
              <div className="flex items-center text-sm text-white">
                <CalendarDays size={18} className="mr-2" />
                <span>{Fecha || "Fecha no especificada"}</span>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 p-8 flex flex-col h-full bg-gray-50">
            <button
              className="self-end text-gray-400 hover:text-gray-600 transition-colors"
              onClick={onClose}
            >
              <X size={24} />
            </button>
            <div className="flex-grow overflow-hidden">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Opinión
              </h3>
              <div
                ref={scrollRef}
                className="overflow-y-auto pr-4 max-h-[calc(90vh-12rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {Opinion || "Sin opinión disponible"}
                </p>
              </div>
            </div>
            <motion.div
              animate={controls}
              initial={{ opacity: 0 }}
              className="text-center mt-4"
            >
              <ChevronDown size={24} className="text-gray-400 animate-bounce" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewDetail;
