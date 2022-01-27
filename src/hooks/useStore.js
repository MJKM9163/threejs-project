import create from "zustand";

export const useStore = create((set) => ({
  name: "space",
  setName: (newName) => set(() => ({ name: newName })),
  zoom: false,
  setZoom: (check) => set(() => ({ zoom: check })),
  focus: {},
  setFocus: (newFocus) => set(() => ({ focus: newFocus })),
  cameraRotationY: 0,
  setCameraRotationY: (r) => set(() => ({ cameraRotationY: r })),
}));
