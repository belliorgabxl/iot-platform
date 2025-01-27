import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

interface FadeInOnScrollProps {
    children: ReactNode; 
  }

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } 
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }} 
      animate={isVisible ? { opacity: 1, y: 0 } : {}} 
      transition={{ duration: 1.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOnScroll;
