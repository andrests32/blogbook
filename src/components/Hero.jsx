import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Tinta & Razón";

  useEffect(() => {
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.slice(0, currentIndex + 1)); // Usamos slice para evitar concatenación incorrecta
        currentIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 150); // Velocidad de escritura

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300">
        <motion.div
          className="absolute inset-0 opacity-20" // Opacidad más tenue
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3] // Aparece y desaparece
          }}
          transition={{
            repeat: Infinity,
            duration: 3, // Duración total del ciclo
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Contenido del Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.div
          className="text-5xl text-nowrap self-center lg:text-8xl font-extralight mb-4 lg:mb-10 text-gray-800 font-heading tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <img
            className="w-40 h-auto object-cover rounded-full"
            src="/logo.avif"
            alt=""
          />
        </motion.div>

        <motion.h1
          className="text-4xl text-nowrap lg:text-8xl font-extralight mb-4 lg:mb-10 text-gray-800 font-heading tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {typedText}
          <span
            className="text-gray-800"
            style={{
              visibility: typedText === fullText ? "hidden" : "visible"
            }}
          >
            |
          </span>
        </motion.h1>
        <motion.p
          className="text-xl lg:text-3xl text-gray-600 mb-8 max-w-2xl font-light font-ui italic lg:tracking-wide"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
        >
          "Vacía tus bolsillos en tu mente, que tu mente llenará tus bolsillos."
          <br />
          <strong>- Benjamin Franklin -</strong>
        </motion.p>

        {/* Botones de acción */}
        <div className="flex gap-4">
          <motion.a
            href="#resenas"
            className="bg-gray-800 font-ui font-normal italic text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300 inline-block tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explorar Reseñas
          </motion.a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
