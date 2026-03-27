'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-black">
      <div className="relative isolate px-6 pt-4 lg:px-8">
        {/* Animated top background pattern */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          animate={{
            x: [0, 25, 0],
            y: [0, 15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#DB3246] to-[#DB3246] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Hero content */}
        <div className="mx-auto max-w-2xl py-32">
          <motion.div 
            className="hidden sm:mb-8 sm:flex sm:justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-white ring-1 ring-white hover:ring-gray-900/20">
              Creative by nature. Precise by design.{' '}
              <a href="#" className="font-semibold text-[#DB3246]">
                <span aria-hidden="true" className="absolute inset-0" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </motion.div>
          
          <div className="text-center">
            <motion.h1 
              className="text-5xl font-semibold tracking-tight text-balance text-white"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Creative by nature. Precise by design.
            </motion.h1>
            
            <motion.p 
              className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We craft digital experiences that are fast, fearless, and unforgettable. Strategy meets storytelling. Design meets impact.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex items-center justify-center gap-x-6"
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.a
                href="#"
                className="rounded-full bg-[#DB3246] px-7 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[#DB3246] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Build with Guava
              </motion.a>
              <motion.a 
                href="#" 
                className="text-sm/6 font-semibold text-white"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                See our work <span aria-hidden="true">→</span>
              </motion.a>
            </motion.div>
          </div>
        </div>

        {/* Animated bottom background pattern */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          animate={{
            x: [0, -25, 0],
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#DB3246] to-[#DB3246] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </motion.div>
        
        {/* Additional floating elements for visual interest */}
        <motion.div
          className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-[#DB3246] opacity-10 blur-xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/3 h-24 w-24 rounded-full bg-[#DB3246] opacity-10 blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 20, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </div>
  )
}