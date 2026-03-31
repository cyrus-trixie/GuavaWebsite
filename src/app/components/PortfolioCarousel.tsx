'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { urlFor } from '@/lib/sanity';

interface Project {
  _id: string;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: any;
  url: string;
}

export default function PortfolioCarousel() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveringNav, setHoveringNav] = useState<'next' | 'prev' | false>(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const progressControls = useAnimation();

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      progressControls.start({
        width: `${(currentIndex / (projects.length - 1)) * 100}%`,
        transition: { duration: 0.6, ease: 'easeInOut' },
      });
    }
  }, [currentIndex, projects.length, progressControls]);

  useEffect(() => {
    if (projects.length === 0) return;
    const timer = setTimeout(() => {
      if (!isDragging && !hoveringNav) {
        handleNext();
      }
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentIndex, isDragging, hoveringNav, projects.length]);

  if (projects.length === 0) {
    return (
      <div className="relative w-full bg-black rounded-t-[50px] overflow-hidden min-h-[500px] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    if (Math.abs(info.offset.x) > 100) {
      if (info.offset.x < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const updateCursorPosition = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const sliderVariants = {
    incoming: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
    }),
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 100, damping: 20 } as any,
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: 'easeInOut' } as any,
      },
    },
    outgoing: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: 'spring', stiffness: 100, damping: 20 } as any,
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: 'easeInOut' } as any,
      },
    }),
  };

  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      opacity: 0,
    },
    hover: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      opacity: 1,
      height: 80,
      width: 80,
      transition: {
        type: 'spring',
        mass: 0.5,
      } as any,
    },
  };

  const currentProject = projects[currentIndex];
  const imageUrl = currentProject.image
    ? urlFor(currentProject.image).url()
    : '/placeholder.jpg';

  return (
    <div
      className="relative w-full bg-black rounded-t-[50px] overflow-hidden"
      onMouseMove={updateCursorPosition}
    >
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 flex items-center justify-center rounded-full bg-white/10 pointer-events-none border border-white border-opacity-40 backdrop-blur-sm"
        variants={cursorVariants}
        initial="default"
        animate={hoveringNav ? 'hover' : 'default'}
      >
        {hoveringNav && (
          <motion.div
            className="text-white text-xs font-medium tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {hoveringNav === 'next' ? 'Next' : 'Prev'}
          </motion.div>
        )}
      </motion.div>

      {/* Noise texture overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>

      {/* Draggable carousel */}
      <div ref={carouselRef}>
        <motion.div
          className="w-full cursor-grab active:cursor-grabbing min-h-[500px]"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentProject._id}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="outgoing"
              className="relative w-full flex flex-col justify-end min-h-[500px]"
            >
              {/* Background image */}
              <motion.div
                className="absolute inset-0 z-0"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              >
                <div className="absolute inset-0 bg-gradient-to-t to-[#DB3246]/40 from-black/50 z-10" />
                <img
                  src={imageUrl}
                  alt={currentProject.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                />
              </motion.div>

              {/* Content */}
              <motion.div
                className="relative z-20 w-full p-8 md:p-16 lg:p-20 flex flex-col md:flex-row justify-between pb-24 md:pb-32"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
              >
                <div className="flex-1 mb-8 md:mb-0">
                  <div className="flex items-center mb-4">
                    <div className="h-px w-10 bg-white/60 mr-4" />
                    <span className="text-sm font-medium text-white/70">
                      {currentProject.client}
                    </span>
                  </div>

                  <h2 className="text-4xl font-medium text-white tracking-tight mb-4">
                    {currentProject.title}
                  </h2>

                  <p className="text-white max-w-lg mb-6">
                    {currentProject.description}
                  </p>

                  <motion.a
                    href={currentProject.url}
                    className="inline-flex items-center text-white group"
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <span className="mr-3">View project</span>
                    <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </motion.a>
                </div>

                <div className="flex flex-wrap md:flex-col md:items-end gap-2 md:w-1/3 lg:w-1/4">
                  {currentProject.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-sm font-medium text-white/80 border border-white/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute bottom-8 md:bottom-10 right-8 md:right-16 z-30 flex space-x-4">
        <motion.button
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white"
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveringNav('prev')}
          onMouseLeave={() => setHoveringNav(false)}
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>

        <motion.button
          className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white"
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setHoveringNav('next')}
          onMouseLeave={() => setHoveringNav(false)}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Progress bar */}
      {projects.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 z-30 h-px bg-white/10">
          <motion.div
            className="h-full bg-white/50"
            animate={progressControls}
            initial={{ width: '0%' }}
          />
        </div>
      )}
    </div>
  );
}