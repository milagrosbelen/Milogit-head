import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './components/Button';
import GalleryView from './components/GalleryView';
import { StarIcon, DiamondIcon, DocumentIcon, QuoteIcon, BellIcon } from './components/Icons';
import { archivos, principios, resumenes, frases } from './data/data';

const sections = {
  archivos: {
    title: 'ARCHIVOS DE RIQUEZA',
    subtitle: 'Acceso exclusivo a estrategias de alto nivel',
    data: archivos,
  },
  principios: {
    title: 'PRINCIPIOS DE RIQUEZA',
    subtitle: 'Fundamentos inamovibles para el éxito',
    data: principios,
  },
  resumenes: {
    title: 'MIS RESÚMENES',
    subtitle: 'Síntesis personal de conocimientos clave',
    data: resumenes,
  },
  frases: {
    title: 'MIS FRASES',
    subtitle: 'Mentalidad blindada en palabras cortas',
    data: frases,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

function App() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="app-container">
      <AnimatePresence>
        {activeSection && (
          <GalleryView
            items={sections[activeSection].data}
            sectionKey={activeSection}
            onClose={() => setActiveSection(null)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="content-layer min-h-screen"
      >
        <motion.header
          variants={headerVariants}
          initial="hidden"
          animate="visible"
          className="px-5 pt-12 pb-6 max-w-lg mx-auto"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white font-extrabold text-2xl tracking-tight">
                MILOGIT SYSTEM
              </h1>
              <p className="text-gray-500 text-xs font-medium tracking-widest uppercase mt-1">
                Private Wealth Operating System
              </p>
            </div>
            <motion.button
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-full bg-accent flex items-center justify-center text-dark-900 transition-colors duration-300 touch-feedback"
            >
              <BellIcon />
            </motion.button>
          </div>
        </motion.header>

        <main className="px-5 max-w-lg mx-auto pb-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Button
                title="ARCHIVOS DE RIQUEZA"
                subtitle="Acceso exclusivo a estrategias de alto nivel"
                icon={StarIcon}
                variant="archivos"
                onClick={() => setActiveSection('archivos')}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                title="PRINCIPIOS DE RIQUEZA"
                subtitle="Fundamentos inamovibles para el éxito"
                icon={DiamondIcon}
                variant="principios"
                onClick={() => setActiveSection('principios')}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                title="MIS RESÚMENES"
                subtitle="Síntesis personal de conocimientos clave"
                icon={DocumentIcon}
                variant="resumenes"
                onClick={() => setActiveSection('resumenes')}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <Button
                title="MIS FRASES"
                subtitle="Mentalidad blindada en palabras cortas"
                icon={QuoteIcon}
                variant="frases"
                onClick={() => setActiveSection('frases')}
              />
            </motion.div>
          </motion.div>
        </main>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 pb-8 text-center"
        >
          <p className="text-gray-600 text-xs">
            © 2026 MILOGIT SYSTEM
          </p>
        </motion.footer>
      </motion.div>
    </div>
  );
}

export default App;
