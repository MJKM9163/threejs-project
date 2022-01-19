import create from "zustand";

export const useStore = create((set) => ({
  skyXYZ: [-100, 0, 100],
  setSkyXYZ: (x, y, z) => set(() => ({ skyXYZ: [x, y, z] })),
  lightXYZ: [-200, 50, 200],
  setLightXYZ: (x, y, z) => set(() => ({ lightXYZ: [x, y, z] })),
}));
//lightXYZ: [-200, 0, 200], default
