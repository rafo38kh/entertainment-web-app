import { Variants } from "framer-motion";

export const cardItemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export const cardList: Variants = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    transition: {
      when: "afterChildren",
    },
  },
};

export const cardItem: Variants = {
  visible: {
    y: 0,
    opacity: 1,
  },
  hidden: {
    y: 5,
    opacity: 0,
    transition: {
      delay: 0.1,
    },
  },
};

export const list: Variants = {
  open: {
    transition: {
      bounce: 0,
      duration: 0.7,
      type: "spring",
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    transition: {
      bounce: 0,
      duration: 0.3,
      type: "spring",
    },
  },
};

export const scrolGridListVarints = (
  isHovered: boolean,
  currentX: number
): Variants => ({
  initial: {
    x: 0,
    transition: {
      bounce: 0,
      duration: 0.7,
      type: "spring",
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  animate: {
    x: isHovered ? -currentX : -(258 * 20),
    transition: { delay: !isHovered ? 0.5 : 0, duration: isHovered ? 100 : 80 },
  },
});

export const hoverEffect = {
  whileHover: { scale: 1.2 },
  transition: { ease: "easeOut", duration: 0.2 },
};
