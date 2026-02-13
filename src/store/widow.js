import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "@/components";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useWindowStore = create(immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) => set((state) => {
        const win=state.windows[windowKey];
        win.isOpen=true;
        win.zIndex=state.nextZIndex;
        win.data=data?? win.data;
        state.nextZIndex++;

    }),
    closeWindow: (windowKey) => set((state) => {
        const win=state.windows[windowKey];
        win.isOpen=false;
        win.zIndex=INITIAL_Z_INDEX;
        win.data=null;
    }),
    toggleWindow: (windowKey, data = null) => set((state) => {
        const win=state.windows[windowKey];
        if(win.isOpen) {
            win.isOpen=false;
            win.zIndex=INITIAL_Z_INDEX;
            win.data=null;
        } else {
            win.isOpen=true;
            win.zIndex=state.nextZIndex;
            win.data=data?? win.data;
            state.nextZIndex++;
        }
    }),
    focusWindow: (windowKey) => set((state) => {
        const win=state.windows[windowKey];
        win.zIndex=state.nextZIndex++;
    }),
})));

export default useWindowStore;