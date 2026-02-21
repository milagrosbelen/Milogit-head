import { motion } from 'framer-motion';
import { ChevronRightIcon } from './Icons';

const variantStyles = {
  archivos: {
    icon: 'bg-accent/15 text-accent',
    border: 'border-accent/10',
    activeBorder: 'border-accent/40',
  },
  principios: {
    icon: 'bg-accent/15 text-accent',
    border: 'border-accent/10',
    activeBorder: 'border-accent/40',
  },
  resumenes: {
    icon: 'bg-accent/15 text-accent',
    border: 'border-accent/10',
    activeBorder: 'border-accent/40',
  },
  frases: {
    icon: 'bg-accent/15 text-accent',
    border: 'border-accent/10',
    activeBorder: 'border-accent/40',
  },
};

function Button({ title, subtitle, icon: Icon, variant = 'archivos', onClick }) {
  const styles = variantStyles[variant];

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={`
        w-full bg-dark-700/80 rounded-2xl p-5 text-left 
        transition-all duration-300 
        border ${styles.border}
        active:bg-dark-600 active:border-accent/30
        touch-feedback
        shadow-card
        relative overflow-hidden
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 active:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className={`w-11 h-11 rounded-xl ${styles.icon} flex items-center justify-center mb-4 transition-all duration-300`}>
            <Icon />
          </div>
          <h3 className="text-white font-semibold text-base tracking-wide mb-1">
            {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="ml-4 text-gray-500">
          <ChevronRightIcon />
        </div>
      </div>
    </motion.button>
  );
}

export default Button;
