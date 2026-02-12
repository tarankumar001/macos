import React, { useRef } from "react";
import useRaf from "@rooks/use-raf";
import { motion, useMotionValue } from "framer-motion";
import { dockApps } from "./constants/dockApps";
import { useStore } from "@/store/useStore";
import DockItem from "./DockItem";

export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}) {
  const dockRef = useRef(null);
  const dockSize = useStore((state) => state.dockSize);
  const dockMag = useStore((state) => state.dockMag);
  const magnificationRange = useStore((state) => state.magnificationRange);

  // Motion values for mouse position relative to dock container
  const mouseX = useMotionValue(null);
  const dockCenterX = useMotionValue(null);

  const openApp = (id) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  // Track mouse position relative to dock container
  const handleMouseMove = (e) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    const relativeMouse = e.clientX - rect.left;
    mouseX.set(relativeMouse);
  };

  const handleMouseLeave = () => {
    mouseX.set(null);
    dockCenterX.set(null);
  };

  // Update dock center position on mount and resize
  useRaf(() => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    dockCenterX.set(rect.left + rect.width / 2);
  }, true);

  const maxHeight = dockSize * dockMag + 32; // Add padding

  return (
    <div
      className={`dock fixed bottom-4 left-1/2 -translate-x-1/2 ${
        hide ? "z-0 pointer-events-none" : "z-50"
      }`}
    >
      <motion.ul
        ref={dockRef}
        className="flex items-end justify-center gap-3 px-6 py-4 
        backdrop-blur-2xl bg-white/10 rounded-4xl 
        border border-white/20 shadow-lg overflow-visible"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          minHeight: `${(dockSize ) / 16}rem`,
        }}
      >
        {dockApps.map((app, index) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.name}
            img={app.icon}
            mouseX={mouseX}
            openApp={openApp}
            dockSize={dockSize}
            dockMag={dockMag}
            magnificationRange={magnificationRange}
            index={index}
            totalItems={dockApps.length}
          />
        ))}
      </motion.ul>
    </div>
  );
}
