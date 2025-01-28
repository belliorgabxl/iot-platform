import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

interface FadeInOnScrollProps {
  children: ReactNode;
}

const FadeInVHorizontal: React.FC<FadeInOnScrollProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // Adjust the threshold for when the animation starts
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
      initial={{ opacity: 0, x: 100 }} // Start off-screen to the left
      animate={isVisible ? { opacity: 1, x: 0 } : {}} // Slide in and fade in
      transition={{ duration: 1.2, ease: 'easeOut' }} // Adjust animation timing
    >
      {children}
    </motion.div>
  );
};

export default FadeInVHorizontal;