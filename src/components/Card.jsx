import { motion } from 'framer-motion';

function Card({ titulo, descripcion, numero, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-dark-700/80 rounded-2xl p-5 border border-dark-500/30 transition-all duration-300 active:border-accent/30 active:bg-dark-600/80 touch-feedback shadow-card"
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold text-sm flex-shrink-0">
          {numero}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-semibold text-base mb-2 leading-relaxed">
            {titulo}
          </h4>
          {descripcion && (
            <p className="text-gray-400 text-sm leading-relaxed">
              {descripcion}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Card;
