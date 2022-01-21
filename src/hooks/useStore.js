import create from "zustand";

export const useStore = create((set) => ({
  skyXYZ: [-100, 0, 100],
  setSkyXYZ: (x, y, z) => set(() => ({ skyXYZ: [x, y, z] })),
  lightXYZ: [-200, 50, 200],
  setLightXYZ: (x, y, z) => set(() => ({ lightXYZ: [x, y, z] })),
  spaceShipMove: [0, 0, 0],
  setSpaceShipMove: (x, y, z) => set(() => ({ spaceShipMove: [x, y, z] })),
  spaceShipRotation: [0, 0, 0],
  setSpaceShipRotation: (x, y, z) =>
    set(() => ({ spaceShipRotation: [x, y, z] })),
  spaceShipRender: false,
  setSpaceShipRender: (check) => set(() => ({ spaceShipRender: check })),
  eventChecker: false,
  setEventChecker: (check) => set(() => ({ eventChecker: check })),
  startRender: true,
  setStartRender: (check) => set(() => ({ startRender: check })),
}));
//lightXYZ: [-200, 0, 200], default
//spaceShipMove: [400, 2000, 2000],
