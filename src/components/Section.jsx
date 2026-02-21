import { motion } from 'framer-motion';
import Card from './Card';
import { BackIcon } from './Icons';

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function Section({ title, subtitle, items, onBack }) {
  return (
    <div className="app-container min-h-screen">
      <div className="content-layer">
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="sticky top-0 z-10 glass-subtle border-b border-dark-500/30"
        >
          <div className="max-w-lg mx-auto px-5 py-4">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onBack}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-xl bg-dark-600/80 flex items-center justify-center text-white transition-all duration-300 active:bg-dark-500 touch-feedback"
              >
                <BackIcon />
              </motion.button>
              <div className="min-w-0 flex-1">
                <h1 className="text-white font-bold text-lg tracking-wide truncate">
                  {title}
                </h1>
                <p className="text-gray-400 text-xs">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="max-w-lg mx-auto px-5 py-6 pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="space-y-4"
          >
            {items.map((item, index) => (
              <Card
                key={item.id}
                numero={index + 1}
                titulo={item.titulo}
                descripcion={item.descripcion}
                index={index}
              />
            ))}
          </motion.div>

          {items.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-gray-500">No hay elementos disponibles</p>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Section;
