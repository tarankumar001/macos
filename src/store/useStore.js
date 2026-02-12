import { create } from "zustand";

export const useStore = create((set) => ({
  // Base icon size in pixels
  dockSize: 60,
  // Maximum magnification multiplier
  dockMag: 1.5,
  // Distance range for magnification effect (multiplier of dockSize)
  magnificationRange: 6,
  
  setDockSize: (dockSize) => set({ dockSize }),
  setDockMag: (dockMag) => set({ dockMag }),
}));