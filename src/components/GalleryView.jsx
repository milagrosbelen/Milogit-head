import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { CloseIcon, ShareIcon } from './Icons';

const sectionTitles = {
  archivos: 'ARCHIVOS DE RIQUEZA',
  principios: 'PRINCIPIOS DE RIQUEZA',
  resumenes: 'MIS RESÚMENES',
  frases: 'MIS FRASES',
};

function GalleryView({ items, sectionKey, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  
  const currentItem = items[currentIndex];
  const total = items.length;
  const progress = ((currentIndex + 1) / total) * 100;

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < items.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  const displayText = currentItem.titulo;
  const hasDescription = currentItem.descripcion && currentItem.descripcion.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-dark-900 z-50 flex flex-col"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 relative z-10">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-white touch-feedback"
        >
          <CloseIcon />
        </motion.button>
        
        <div className="absolute left-1/2 -translate-x-1/2 text-center">
          <span className="text-gray-400 text-xs tracking-widest uppercase">
            MILOGIT SYSTEM • {sectionTitles[sectionKey]?.split(' ')[0]}
          </span>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="w-11 h-11 rounded-full border border-gray-700 flex items-center justify-center text-white touch-feedback"
        >
          <ShareIcon />
        </motion.button>
      </header>

      {/* Content Area with Swipe */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex flex-col items-center justify-center px-8 cursor-grab active:cursor-grabbing"
          >
            <div className="max-w-md text-center">
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed italic">
                "{displayText}"
              </p>
              
              {hasDescription && (
                <>
                  <div className="w-12 h-px bg-accent mx-auto mt-8 mb-4" />
                  <p className="text-accent text-sm tracking-[0.2em] uppercase">
                    {currentItem.descripcion}
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicator */}
      <div className="px-8 pb-8 pt-4">
        <p className="text-gray-500 text-xs tracking-[0.2em] uppercase text-center mb-4">
          DESLIZA PARA CONTINUAR
        </p>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-xs font-medium w-8">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          
          <div className="flex-1 h-0.5 bg-dark-600 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
          
          <span className="text-gray-500 text-xs font-medium w-8 text-right">
            {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-1.5 mt-4">
          {items.length <= 20 && items.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 touch-feedback ${
                index === currentIndex 
                  ? 'bg-accent w-4' 
                  : 'bg-dark-500'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default GalleryView;
