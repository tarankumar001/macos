import { INITIAL_Z_INDEX } from "@/components";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) => set((state) => {
        const win=state.windows[windowwkey];
        win.isOpen=true;
        win.zIndex=state.nextZIndex;
        win.data=data?? win.data;
        state.nextZIndex++;

    }),
    closeWindow: () => set((state) => {
                const win=state.windows[windowwkey];
        win.isOpen=false;
        win.zIndex=INITIAL_Z_INDEX;
        win.data=null;
  

    }),
    focusWindow: () => set((state) => {
         const win=state.windows[windowwkey];
     
        win.zIndex=state.nextZIndex++;

    }),
})));

export default useWindowStore;