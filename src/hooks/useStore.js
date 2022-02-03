import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// export const [useStore, storeApi] = create((set) => ({
//   name: "space",
//   setName: (newName) => set(() => ({ name: newName })),
//   zoom: false,
//   setZoom: (check) => set(() => ({ zoom: check })),
//   focus: {},
//   setFocus: (newFocus) => set(() => ({ focus: newFocus })),
//   orbitHide: false,
//   setOrbitHide: (check) => set(() => ({ orbitHide: check })),
//   size: { small: 70, middle: 180, large: 350 },
//   type: "???",
//   setType: (change) => set(() => ({ type: change })),
//   explanation: "",
//   tt: "dkssud?",
//   selectSize: null,
// }));

export const [useStore, useStoreApi] = create(
  subscribeWithSelector((set) => ({
    name: "space",
    setName: (newName) => set(() => ({ name: newName })),
    zoom: false,
    setZoom: () => set((state) => ({ zoom: !state.zoom })),
    focus: {},
    orbitHide: false,
    size: { small: 70, middle: 180, large: 550 },
    selectSize: null,
    type: "???",
    explanation: "",

    positiveEffects: ["나노 공장", "거대 식물", "아름다운 고리"],
    negativeEffect: ["환각 대기", "방사능", "얼음-9"],

    earthEffect: null,

    mouseCheck: false,
    setMouseCheck: (check) => set(() => ({ mouseCheck: check })),
    mouseXZ: [0, 0],
    setMouseXZ: (x, z) => set(() => ({ mouseXZ: [x, z] })),
  }))
);

// export const [useStore, useStoreApi] = create(() => ({
//   name: "space",
//   zoom: false,
//   focus: {},
//   orbitHide: false,
//   size: { small: 70, middle: 180, large: 350 },
//   selectSize: null,
//   type: "???",
//   explanation: "",

//   positiveEffects: ["나노 공장", "거대 식물", "아름다운 고리"],
//   negativeEffect: ["환각 대기", "방사능", "얼음-9"],

//   earthEffect: null,
// }));
