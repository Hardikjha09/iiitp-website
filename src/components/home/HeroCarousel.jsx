import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import { image } from 'framer-motion/client';

const slides = [
  { id: 1, image: '/carousel/slide_1.jpeg' },
  { id: 2, image: '/carousel/slide_13.jpeg' },
  { id: 3, image: '/carousel/slide_12.jpeg' },
  { id: 4, image: '/carousel/slide_11.jpeg' },
  { id: 5, image: '/carousel/slide_2.jpeg' },
  { id: 6, image: '/carousel/slide_3.jpeg' },
  { id: 7, image: '/carousel/slide_4.jpeg' },
  { id: 8, image: '/carousel/slide_5.jpeg' },
  { id: 9, image: '/carousel/slide_6.jpeg' },
  { id: 10, image: '/carousel/slide_7.jpeg' },
  { id: 11, image: '/carousel/slide_8.jpeg' },
  { id: 12, image: '/carousel/slide_9.jpeg' },
  { id: 13, image: '/carousel/slide_10.jpeg' }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === slides.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? slides.length - 1 : current - 1);

  return (
    <div className="relative w-full h-[28vh] sm:h-[69vh] md:h-[72vh] overflow-hidden bg-gray-900"> {/* changed to h-31 for fixing carousel on mobile*/}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 w-full h-full"
          style={{ zIndex: current === idx ? 1 : 0, pointerEvents: current === idx ? 'auto' : 'none' }}
        >
          {/* Blurred background to fill any letterbox area */}
          <motion.img
            src={slide.image}
            alt=""
            initial={{ opacity: 0 }}
            animate={{ opacity: current === idx ? 0.35 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 select-none pointer-events-none"
          />
          {/* Sharp foreground image shown in full */}
          <motion.img
            src={slide.image}
            alt={`Slide ${idx + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: current === idx ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 z-10" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-end text-center px-4 pb-20">
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-serif mb-4 shadow-sm"
        >
          {/* Indian Institute of Information Technology Pune */}
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-200 mb-8 max-w-3xl font-medium"
        >
          {/* Empowering Innovation, Shaping Tomorrow */}
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* <Link to="/academics" className="px-8 py-3 bg-accent text-white font-semibold rounded-md shadow-lg hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200">
            Explore Programs
          </Link>
          <Link to="/academics" className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-primary transition-all duration-200">
            Admissions 2025-26
          </Link> */}
        </motion.div>
      </div>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors backdrop-blur-sm">
        <ChevronRight size={32} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
