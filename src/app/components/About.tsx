'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ShieldCheck, Database, ChevronRight } from 'lucide-react';

interface AboutData {
  title: string;
  description: string;
  features?: string[];
}

export default function AboutGuavaCreative() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    async function fetchAbout() {
      const res = await fetch('/api/about');
      const data = await res.json();
      setAbout(data);
    }
    fetchAbout();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInView(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" } as any
    }
  };

  const videoVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" } as any
    }
  };

  // Background pattern - subtle dot grid
  const BackgroundPattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-full h-full opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#DB3246" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>
    </div>
  );

  if (!about) {
    return (
      <div className="relative bg-white overflow-hidden px-6 py-16 lg:px-0">
        <div className="mx-auto max-w-6xl text-center">Loading...</div>
      </div>
    );
  }

  const titleParts = about.title.split('\n');

  const featuresList = [
    { icon: Rocket, title: "Bold Strategy", description: "Visionary ideas backed by market intelligence and fearless execution." },
    { icon: ShieldCheck, title: "Craft Excellence", description: "Precision in every detail. From identity to interaction, we obsess over quality." },
    { icon: Database, title: "Measurable Impact", description: "Data isn't decoration—it's direction. We create what moves metrics." }
  ];

  return (
    <div className="relative bg-white overflow-hidden px-6 py-16 lg:px-0">
      <BackgroundPattern />

      {/* Accent line */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute top-0 left-0 h-1 bg-[#DB3246]"
      />

      <div className="mx-auto max-w-6xl">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-center">
            <motion.h1
              variants={itemVariants}
              className="mt-3 font-bold tracking-tight text-gray-900 text-5xl"
            >
              {titleParts.map((line, i) => (
                <span key={i} className={i === 1 ? "block text-[#DB3246]" : "block"}>
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-gray-700 leading-relaxed"
            >
              {about.description}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="mt-10"
            >
              <motion.a
                href="/work"
                className="group inline-flex items-center px-6 py-2 bg-[#DB3246] text-white font-medium rounded-full overflow-hidden relative"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">See Our Work</span>
                <motion.span
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.5 }}
                />
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Video with Animation */}
          <motion.div
            className="relative lg:sticky lg:top-24 flex items-center justify-center"
            variants={videoVariants}
          >
            <motion.div
              className="relative w-full overflow-hidden rounded-2xl shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            >
              {/* Accent shape behind video */}
              <motion.div
                className="absolute -top-6 -right-6 w-40 h-40 bg-[#DB3246] opacity-20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div
                className="aspect-w-16 aspect-h-9 bg-[#DB3246]/10 shadow-sm rotate-3 rounded-2xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <video
                  className="w-full h-full bg-[#DB3246]/30 object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="https://guavacreative.com/preview.jpg"
                >
                  <source src="https://videos.pexels.com/video-files/3045052/3045052-uhd_2560_1440_24fps.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Accent lines */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 rounded-full bg-[#DB3246] opacity-70"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.2 }}
                />
                <motion.div
                  className="absolute bottom-0 right-0 w-full rounded-full h-2 bg-[#DB3246] opacity-70"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1.4 }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        variants={itemVariants}
        className="mt-12 bg-[#1a1a1a] max-w-6xl mx-auto rounded-xl p-8 sm:p-12 shadow-md"
      >
        <h2 className="text-center text-4xl font-bold text-white mb-8">What Sets Us Apart</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {featuresList.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="p-3 bg-[#DB3246] rounded-full">
                <feature.icon className="h-10 w-10 text-white" />
              </div>
              <p className="mt-4 text-lg font-semibold text-white">{feature.title}</p>
              <p className="mt-2 text-sm text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}