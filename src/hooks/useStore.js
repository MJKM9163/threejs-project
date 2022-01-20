import create from "zustand";

export const useStore = create((set) => ({
  skyXYZ: [-100, 0, 100],
  setSkyXYZ: (x, y, z) => set(() => ({ skyXYZ: [x, y, z] })),
  lightXYZ: [-200, 50, 200],
  setLightXYZ: (x, y, z) => set(() => ({ lightXYZ: [x, y, z] })),
  spaceShipMove: [300, 1500, 1500],
  setSpaceShipMove: (x, y, z) => set(() => ({ spaceShipMove: [x, y, z] })),
  spaceShipRotation: [0, 0, 0],
  setSpaceShipRotation: (x, y, z) =>
    set(() => ({ spaceShipRotation: [x, y, z] })),
}));
//lightXYZ: [-200, 0, 200], default
