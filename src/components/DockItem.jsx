import React, { useRef, useMemo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import useRaf from "@rooks/use-raf";

const DockItem = ({
  id,
  title,
  img,
  mouseX,
  openApp,
  dockSize,
  dockMag,
  magnificationRange,
  index,
  totalItems,
  isOpen = false,
  link = null
}) => {
  const itemRef = useRef(null);
  
  // Motion values for this specific item
  const distance = useMotionValue(magnificationRange * dockSize + 1);
  const scale = useMotionValue(1);
  const yTranslate = useMotionValue(0);
  const width = useMotionValue(dockSize);

  // Computing smooth magnification curve based on distance
  // Using Gaussian-like distribution for natural feel
  const computeScale = (distanceValue) => {
    if (distanceValue === null) return 1;
    
    const distLimit = magnificationRange * dockSize;
    const absDist = Math.abs(distanceValue);
    
    if (absDist > distLimit) return 1;
    
    // Smooth curve: 1 + (dockMag - 1) * cos(π * absDist / distLimit)^2
    // This creates a smooth, continuous curve peaked at distance = 0
    const normalized = absDist / distLimit;
    const curve = Math.pow(Math.cos((normalized * Math.PI) / 2), 2);
    return 1 + (dockMag - 1) * curve;
  };

  // Spring animation for smooth, responsive feel
  const springConfig = {
    stiffness: 800,
    damping: 35,
    mass: 0.5,
  };

  // Transform motion values with spring
  const scaledScale = useSpring(scale, springConfig);
  const scaledY = useSpring(yTranslate, springConfig);
  const scaledWidth = useSpring(width, springConfig);

  // Calculate icon position relative to dock center
  useRaf(() => {
    if (!itemRef.current) {
      scale.set(1);
      yTranslate.set(0);
      width.set(dockSize);
      distance.set(magnificationRange * dockSize + 1);
      return;
    }

    const mouseXVal = mouseX.get();
    
    if (mouseXVal === null) {
      scale.set(1);
      yTranslate.set(0);
      width.set(dockSize);
      distance.set(magnificationRange * dockSize + 1);
      return;
    }

    // Get item position relative to its parent (dock container)
    const itemRect = itemRef.current.getBoundingClientRect();
    const parentRect = itemRef.current.parentElement.getBoundingClientRect();
    
    // Item center position relative to dock container
    const itemCenterXRelative = itemRect.left - parentRect.left + itemRect.width / 2;
    
    // Calculate distance from mouse (in dock-relative coords) to item center
    const distanceVal = mouseXVal - itemCenterXRelative;
    distance.set(distanceVal);

    // Compute new scale based on this item's distance
    const newScale = computeScale(distanceVal);
    scale.set(newScale);

    // Update width dynamically based on scale (affects layout expansion)
    width.set(dockSize * newScale);

    // Lift icon upward when magnified (proportional to scale)
    // At max magnification, lift by about 1.5x the size difference
    const liftAmount = (newScale - 1) * dockSize * 0.3;
    yTranslate.set(-liftAmount);
  }, true);

  return (
    <motion.li
      ref={itemRef}
      className="relative flex flex-col items-center justify-end group cursor-pointer overflow-visible"
      style={{
        width: scaledWidth,
        height: dockSize,
      }}
      onClick={() => openApp(id)}
    >
      {/* Tooltip Label */}
      <motion.div
        className="absolute bottom-full mb-4 px-3 py-1.5 rounded-md
        bg-black/40 backdrop-blur-lg border border-white/20
        text-white text-xs font-medium whitespace-nowrap
        shadow-lg pointer-events-none"
        initial={{ opacity: 0, y: -5 }}
        whileHover={{ opacity: 1, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {title}
      </motion.div>

      {/* Icon Container with scale and translate */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          scale: scaledScale,
          y: scaledY,
          transformOrigin: "center bottom",
        }}
      >
        {link ? (
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer"
            className="block w-full h-full"
          >
            <img
              src={`/images/${img}`}
              alt={title}
              draggable={false}
              className="w-full h-full object-contain"
            />
          </a>
        ) : (
          <img
            src={`/images/${img}`}
            alt={title}
            draggable={false}
            className="w-full h-full object-contain"
          />
        )}
      </motion.div>

      {/* Active indicator dot */}
      {isOpen && (
        <motion.div
          className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-white/60"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring",stiffness: 650,
damping: 45,
mass: 0.7, }}
        />
      )}
    </motion.li>
  );
};

export default DockItem;
