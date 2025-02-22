import { motion } from "framer-motion";
import { X } from "lucide-react";

const ModalComponent = ({ isOpen, setIsModalOpen, description }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-lg">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-md p-6 bg-gradient-to-br from-white to-cyan-50 rounded-2xl shadow-2xl border border-cyan-500 shadow-cyan-500/50 flex flex-col items-center"
      >
        {/* Botón de cierre */}
        <button
          className="absolute top-1 right-1 p-2 text-gray-500 hover:text-cyan-500 transition"
          onClick={() => setIsModalOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Contenido del modal */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-black text-lg font-semibold text-center mt-3 -mb-3"
        >
          {description}
        </motion.p>

        {/* Línea decorativa */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-1  h-[2px] w-full bg-cyan-500 rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default ModalComponent;
