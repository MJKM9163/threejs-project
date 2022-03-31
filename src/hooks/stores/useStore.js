import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const useStore = create(
  subscribeWithSelector((set) => ({
    selectSize: null,

    mouseCheck: false,
    setMouseCheck: (check) => set(() => ({ mouseCheck: check })),
    mouseXZ: [0, 0],
    setMouseXZ: (x, z) => set(() => ({ mouseXZ: [x, z] })),
  }))
);
