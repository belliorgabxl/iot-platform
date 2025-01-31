import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
}

const FadeInHorizontal: React.FC<FadeInOnScrollProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

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
      initial={{ opacity: 0, x: -100 }} 
      animate={isVisible ? { opacity: 1, x: 0 } : {}} 
      transition={{ duration: 1.2, ease: 'easeOut' }} 
    >
      {children}
    </motion.div>
  );
};

export default FadeInHorizontal;