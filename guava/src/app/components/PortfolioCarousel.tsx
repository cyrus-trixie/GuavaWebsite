'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ExternalLink, Plus } from 'lucide-react';
import Image from 'next/image';

// Define TypeScript interfaces
interface Project {
  id: number;
  title: string;
  client: string;
  description: string;
  tags: string[];
  image: string;
  url: string;
}

interface PortfolioCarouselProps {
  projects?: Project[];
}


// Sample project data
const projectData: Project[] = [
  {
    id: 1,
    title: "Ephemeral Rhythms",
    client: "Neuva Recordings",
    description: "Brand identity and digital experience for an avant-garde music label focused on experimental electronic compositions.",
    tags: ["Branding", "Web Design", "Animation"],
    image: "https://images.pexels.com/photos/31981752/pexels-photo-31981752/free-photo-of-iconic-chicago-sculpture-and-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "https://example.com/project1"
  },
  {
    id: 2,
    title: "Meridian",
    client: "Solstice Ventures",
    description: "Complete visual identity system and investor platform for a climate-tech venture fund backing the next generation of sustainability innovators.",
    tags: ["Identity", "Digital", "Strategy"],
    image: "https://images.pexels.com/photos/31981752/pexels-photo-31981752/free-photo-of-iconic-chicago-sculpture-and-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "https://example.com/project2"
  },
  {
    id: 3,
    title: "Kinetic Forms",
    client: "MODA Exhibition",
    description: "Interactive installation and companion website for a museum exhibition exploring the intersection of movement, technology and human expression.",
    tags: ["Exhibition", "Interactive", "Development"],
    image: "https://images.pexels.com/photos/31981752/pexels-photo-31981752/free-photo-of-iconic-chicago-sculpture-and-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "https://example.com/project3"
  },
  {
    id: 4,
    title: "Nebula",
    client: "Astral Cosmetics",
    description: "Full brand world and e-commerce experience for a luxury cosmetics line inspired by celestial phenomena and cosmic imagery.",
    tags: ["Branding", "E-Commerce", "Content"],
    image: "https://images.pexels.com/photos/31981752/pexels-photo-31981752/free-photo-of-iconic-chicago-sculpture-and-skyscrapers.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    url: "https://example.com/project4"
  }
];

export default function PortfolioCarousel({ projects = projectData }: PortfolioCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoveringNav, setHoveringNav] = useState<"next" | "prev" | false>(false);
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Progress bar animation
  const [progress, setProgress] = useState(0);
  const progressControls = useAnimation();
  
  useEffect(() => {
    // Update progress when currentIndex changes
    setProgress((currentIndex / (projects.length - 1)) * 100);
    progressControls.start({
      width: `${(currentIndex / (projects.length - 1)) * 100}%`,
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] }
    });
  }, [currentIndex, projects.length, progressControls]);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDragging && !hoveringNav) {
        handleNext();
      }
    }, 6000);
    
    return () => clearTimeout(timer);
  }, [currentIndex, isDragging, hoveringNav]);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 600);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex(prev => (prev === projects.length - 1 ? 0 : prev + 1));
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

  // Slider animation variants
  const sliderVariants = {
    incoming: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
    }),
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
      }
    },
    outgoing: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
      }
    })
  };

  // Custom cursor variants
  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      opacity: 0
    },
    hover: {
      x: cursorPosition.x - 40,
      y: cursorPosition.y - 40,
      opacity: 1,
      height: 80,
      width: 80,
      transition: {
        type: "spring",
        mass: 0.5
      }
    }
  };

  return (
    <div 
      className="relative  w-full h-[55vh] bg-black rounded-t-[50px] overflow-hidden"
      onMouseMove={updateCursorPosition}
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 z-50 flex items-center justify-center rounded-full bg-white/10 bg-opacity-20 pointer-events-none border border-white border-opacity-40 backdrop-blur-sm"
        variants={cursorVariants}
        initial="default"
        animate={hoveringNav ? "hover" : "default"}
      >
        {hoveringNav && (
          <motion.div 
            className="text-white text-xs font-medium tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {hoveringNav && (hoveringNav === 'next' ? 'Next' : 'Prev')}
          </motion.div>
        )}
      </motion.div>

      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.15" />
        </svg>
      </div>

      

      {/* Main carousel */}
      <div 
        ref={carouselRef} 
        className=" h-full"
      >
        <motion.div
          className="w-full h-full cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={sliderVariants}
              initial="incoming"
              animate="active"
              exit="outgoing"
              className="absolute inset-0 w-full h-full flex flex-col justify-end"
            >
              {/* Project Image with Parallax Effect */}
              <motion.div 
                className="absolute inset-0 z-0 opacity-70"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
              >
                <div className="absolute inset-0 bg-gradient-to-t to-[#DB3246]/40 from-black/50 z-10" />
                <Image
                  src={projects[currentIndex].image}
                  alt={projects[currentIndex].title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="relative z-20 w-full p-8 md:p-16 lg:p-20 flex flex-col md:flex-row justify-between"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              >
                {/* Project details */}
                <div className="flex-1 mb-8 md:mb-0">
                  <div className="flex items-center mb-4">
                    <div className="h-px w-10 bg-white/60 mr-4" />
                    <span className="text-sm font-medium text-white/70">{projects[currentIndex].client}</span>
                  </div>
                  
                  <h2 className="text-4xl font-medium text-white tracking-tight mb-4">
                    {projects[currentIndex].title}
                  </h2>
                  
                  <p className="text-white max-w-lg mb-6">
                    {projects[currentIndex].description}
                  </p>
                  
                  <motion.a
                    href={projects[currentIndex].url}
                    className="inline-flex items-center text-white group"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span className="mr-3">View project</span>
                    <div className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </motion.a>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap md:flex-col md:items-end gap-2 md:w-1/3 lg:w-1/4">
                  {projects[currentIndex].tags.map((tag, index) => (
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
      
      {/* Navigation */}
      <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 z-30 flex space-x-4">
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
      
      {/* Page counter */}
     
    </div>
  );
}