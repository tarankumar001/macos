import { create } from "zustand";

export const useStore = create((set) => ({
  dockSize: 56,
  dockMag: 3,
  setDockSize: (dockSize) => set({ dockSize }),
  setDockMag: (dockMag) => set({ dockMag }),
}));