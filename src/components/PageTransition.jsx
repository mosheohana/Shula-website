import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function PageTransition({ children }) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </MotionDiv>
  );
}
