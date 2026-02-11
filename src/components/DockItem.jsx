import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useWindowSize } from "react-use";
import useRaf from "@rooks/use-raf";

const useDockHoverAnimation = (mouseX, ref, dockSize, dockMag) => {
  const distanceLimit = dockSize * 6;

  const distanceInput = [
    -distanceLimit,
    -distanceLimit / (dockMag * 0.65),
    -distanceLimit / (dockMag * 0.85),
    0,
    distanceLimit / (dockMag * 0.85),
    distanceLimit / (dockMag * 0.65),
    distanceLimit
  ];

  const widthOutput = [
    dockSize,
    dockSize * (dockMag * 0.55),
    dockSize * (dockMag * 0.75),
    dockSize * dockMag,
    dockSize * (dockMag * 0.75),
    dockSize * (dockMag * 0.55),
    dockSize
  ];

  const beyondTheDistanceLimit = distanceLimit + 1;
  const distance = useMotionValue(beyondTheDistanceLimit);

  const widthPX = useSpring(
    useTransform(distance, distanceInput, widthOutput),
    { stiffness: 1700, damping: 90 }
  );

  const width = useTransform(widthPX, (w) => `${w / 16}rem`);

  useRaf(() => {
    const el = ref.current;
    const mouseXVal = mouseX.get();

    if (el) {
      const rect = el.getBoundingClientRect();

      distance.set(mouseXVal - rect.left - rect.width / 2);
    } else {
      distance.set(beyondTheDistanceLimit);
    }
  }, true);

  return { width };
};

const DockItem = ({
  id,
  title,
  img,
  mouseX,
  openApp,
  dockSize,
  dockMag,
  desktop = false,
  isOpen = false,
  link = null
}) => {
  const imgRef = useRef(null);
  const { width } = useDockHoverAnimation(mouseX, imgRef, dockSize, dockMag);
  const { width: winWidth } = useWindowSize();

  return (
    <li
      id={`dock-${id}`}
      onClick={desktop || id === "launchpad" ? () => openApp(id) : undefined}
      className="relative flex flex-col justify-end mb-1 group"
    >
      <p className="tooltip absolute bottom-full mb-2 inset-x-0 mx-auto w-max 
rounded-md bg-black/40 backdrop-blur-lg text-white 
px-3 py-1 text-sm border border-white/20 
opacity-0 group-hover:opacity-100 transition-all 
pointer-events-none shadow-xl -translate-y-1">

        {title}
      </p>

      {link ? (
        <a href={link} target="_blank" rel="noreferrer">
          <motion.img
            ref={imgRef}
            src={`/images/${img}`}
            alt={title}
            draggable={false}
            style={winWidth < 640 ? {} : { width }}
          />
        </a>
      ) : (
        <motion.img
          ref={imgRef}
          src={`/images/${img}`}
          alt={title}
          draggable={false}
          style={winWidth < 640 ? {} : { width }}
        />
      )}

      <div
        className={`w-1 h-1 mx-auto rounded-full bg-black ${
          isOpen ? "" : "invisible"
        }`}
      />
    </li>
  );
};

export default DockItem;
