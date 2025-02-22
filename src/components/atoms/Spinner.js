import { motion } from "framer-motion";

const Spinner = ({ label }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 flex-col text-white">
      <motion.div
        className="w-16 h-16 border-4 border-transparent border-t-cyan-400 border-l-cyan-400 rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-center">{label}</p>
    </div>
  );
};

export default Spinner;
