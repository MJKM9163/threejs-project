import create from "zustand";

export const [useStore, storeApi] = create((set) => ({
  name: "space",
  setName: (newName) => set(() => ({ name: newName })),
  zoom: false,
  setZoom: (check) => set(() => ({ zoom: check })),
  focus: {},
  setFocus: (newFocus) => set(() => ({ focus: newFocus })),
  orbitHide: false,
  setOrbitHide: (check) => set(() => ({ orbitHide: check })),
}));
