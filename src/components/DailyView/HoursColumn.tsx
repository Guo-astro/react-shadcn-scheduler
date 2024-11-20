// components/HoursColumn.tsx
import React from "react";
import { motion } from "framer-motion";

interface HoursColumnProps {
  hours: string[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const HoursColumn: React.FC<HoursColumnProps> = ({ hours }) => {
  return (
    <motion.div
      className="flex flex-col"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {hours.map((hour, index) => (
        <motion.div
          key={`hour-${index}`}
          variants={itemVariants}
          data-testid={`hour-${index}`}
          className="cursor-pointer transition duration-300 p-4 h-[64px] text-left text-sm text-muted-foreground border-b border-default-200"
        >
          {hour}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default HoursColumn;
