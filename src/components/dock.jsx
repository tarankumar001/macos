import React, { useRef } from "react";
import useRaf from "@rooks/use-raf";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import { useWindowSize } from "react-use";
import { dockApps } from "./constants/dockApps";
import { useStore } from "@/store/useStore";
import DockItem from "./DockItem";

// Hover animation hook
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

    if (el && mouseXVal !== null) {
      const rect = el.getBoundingClientRect();
      const imgCenterX = rect.left + rect.width / 2;
      const distanceDelta = mouseXVal - imgCenterX;
      distance.set(distanceDelta);
      return;
    }

    distance.set(beyondTheDistanceLimit);
  }, true);

  return { width };
};

// Main Dock component
export default function Dock({
  open,
  showApps,
  showLaunchpad,
  toggleLaunchpad,
  hide
}) {
  const dockSize = useStore((state) => state.dockSize);
  const dockMag = useStore((state) => state.dockMag);

  const openApp = (id) => {
    if (id === "launchpad") toggleLaunchpad(!showLaunchpad);
    else {
      toggleLaunchpad(false);
      open(id);
    }
  };

  const mouseX = useMotionValue(null);

  return (
    <div
      className={`dock fixed bottom-1 left-1/2 -translate-x-1/2 ${
        hide ? "z-0" : "z-50"
      }`}
    >
      <ul
        className="flex space-x-2 items-center px-2 backdrop-blur-2xl bg-white/20 rounded-xl"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(null)}
        style={{
          height: `${(dockSize + 15) / 16}rem`
        }}
      >
        {dockApps.map((app) => (
          <DockItem
            key={`dock-${app.id}`}
            id={app.id}
            title={app.name}
            img={app.icon}
            mouseX={mouseX}
            openApp={openApp}
            dockSize={dockSize}
            dockMag={dockMag}
          />
        ))}
      </ul>
    </div>
  );
}
