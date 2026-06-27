import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const defaultVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export default function ScrollReveal({
  children,
  className = '',
  variant = 'default',
  delay = 0,
  stagger = false,
  once = false,
  threshold = 0.15,
  style = {},
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    amount: threshold,
  });

  const variants = {
    default: defaultVariants,
    slideLeft: {
      hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
    slideRight: {
      hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
      visible: {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
      },
    },
    fadeOnly: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.8 },
      },
    },
  };

  const selectedVariant = variants[variant] || variants.default;

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        className={className}
        style={style}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedVariant}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const sharedVariants = {
  default: defaultVariants,
  slideLeft: {
    hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  },
  slideRight: {
    hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  }
};

// Export for use as child of stagger container
export function ScrollRevealItem({ children, className = '', style = {}, variant = 'default' }) {
  const selectedVariant = sharedVariants[variant] || defaultVariants;
  return (
    <motion.div
      className={className}
      style={style}
      variants={selectedVariant}
    >
      {children}
    </motion.div>
  );
}
