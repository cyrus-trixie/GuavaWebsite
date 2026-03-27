'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Lightbulb,
  Globe,
  Video,
  MousePointerClick,
  Megaphone,
  BarChart2
} from 'lucide-react';

// Custom icons that match our aesthetic better than heroicons
const icons: Record<string, React.ElementType> = {
  ArrowUpRight, 
  Lightbulb,
  Globe,
  Video,
  MousePointerClick,
  Megaphone,
  BarChart2
};

const features = [
  {
    name: 'Brand Strategy & Identity',
    description:
      'We do not just design logos — we architect meaning. From tone to typography, we craft identities that cut through noise and burn into memory.',
    icon: 'Lightbulb' as const,
    delay: 0,
  },
  {
    name: 'Web Design & Development',
    description:
      'Pixel-perfect design meets performant code. We build bespoke, responsive websites that convert, engage, and scale with your business.',
    icon: 'Globe' as const,
    delay: 0.1,
  },
  {
    name: 'Content Production',
    description:
      'From sharp copy to cinematic video, we create content that speaks with your voice and moves your audience — emotionally and strategically.',
    icon: 'Video' as const,
    delay: 0.2,
  },
  {
    name: 'UI/UX Design',
    description:
      'We do purposeful. Interfaces that feel inevitable, flows that feel frictionless, and experiences users don not forget.',
    icon: 'MousePointerClick' as const,
    delay: 0.3,
  },
  {
    name: 'Digital Marketing & Ads',
    description:
      'We turn attention into action. From Google Ads to social strategy, we engineer campaigns that drive traffic, capture leads, and build momentum.',
    icon: 'Megaphone' as const,
    delay: 0.4,
  },
  {
    name: 'SEO & Analytics',
    description:
      'Visibility is power. We optimize every pixel and line of code to rank, track, and refine—so your brand grows with intelligence, not guesswork.',
    icon: 'BarChart2' as const,
    delay: 0.5,
  },
];
  

export default function Services() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Set isInView to true after component mounts to trigger animations
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: delay 
      }
    })
  };

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5, 
      transition: { duration: 0.3 }
    }
  };

  // Background pattern component
  const BackgroundPattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute right-0 top-16 h-full w-1/2 opacity-5" viewBox="0 0 500 500">
        <defs>
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#DB3246" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div className="absolute -left-24 top-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#DB3246] to-pink-500 opacity-5 blur-3xl"></div>
      <div className="absolute -right-24 bottom-1/4 w-96 h-96 rounded-full bg-gradient-to-l from-[#DB3246] to-orange-400 opacity-5 blur-3xl"></div>
    </div>
  );

  return (
    <div className="relative bg-white pb-12 overflow-hidden">
      <BackgroundPattern />
     
      <div className="mx-auto max-w-6xl px-6 lg:px-0">
        <motion.div 
          className="mx-auto max-w-4xl lg:text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.span 
              className="inline-block text-sm font-medium tracking-widest text-[#DB3246] uppercase"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Our Services
            </motion.span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="mt-2 text-3xl font-bold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance"
          >
            We turn vision into
            <span className="block text-[#DB3246]">digital reality</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg/8 text-gray-600 max-w-2xl mx-auto"
          >
            From strategy to execution, we create comprehensive digital experiences that 
            elevate your brand, engage your audience, and drive measurable results.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="mx-auto mt-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-8 lg:max-w-none lg:grid-cols-3 lg:gap-y-8">
            {features.map((feature) => {
              const Icon = icons[feature.icon as keyof typeof icons];
              
              return (
                <motion.div 
                  key={feature.name} 
                  className="relative pl-16 group"
                  custom={feature.delay}
                  variants={featureVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                >
                  <dt className="text-lg font-semibold text-gray-900 flex items-center">
                    <motion.div 
                      className="absolute top-0 left-0 flex size-12 items-center justify-center rounded-xl bg-[#DB3246] group-hover:shadow-lg"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <Icon className="size-6 text-white" />
                    </motion.div>
                    <span>{feature.name}</span>
                  </dt>
                  <dd className="mt-3 text-base/7 text-gray-600">{feature.description}</dd>
                  
                  <motion.div 
                    initial={{ opacity: 0, width: 0 }}
                    whileHover={{ opacity: 1, width: '100%', transition: { duration: 0.3 } }}
                    className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-[#DB3246] to-transparent"
                  />
                  
                  <motion.a
                    href="#"
                    className="inline-flex items-center mt-4 text-sm font-medium text-[#DB3246] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Learn more <ArrowUpRight className="ml-1 size-4" />
                  </motion.a>
                </motion.div>
              );
            })}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}