import React from "react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import clsx from "clsx";

interface BadgeData {
  id: number;
  color: "primary" | "warning" | "danger" | "success";
  title: string;
  description: string;
}

interface BadgeListProps {
  badges: BadgeData[];
  badgeColorClasses: Record<BadgeData["color"], string>;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger children animations
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const BadgeList: React.FC<BadgeListProps> = ({ badges, badgeColorClasses }) => {
  return (
    <motion.div
      className="all-week-events flex flex-col gap-2"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {badges.map((badge) => (
        <motion.div key={badge.id} variants={itemVariants}>
          <Badge
            className={clsx(
              "min-w-full p-4 min-h-fit rounded-lg",
              badgeColorClasses[badge.color]
            )}
          >
            <div className="title">
              <span className="text-sm font-medium">{badge.title}</span>
            </div>
            <div className="description text-xs">{badge.description}</div>
          </Badge>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default BadgeList;
