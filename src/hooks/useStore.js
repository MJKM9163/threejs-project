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

export const useStore = create(
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

    mainPlanet: false,

    mouseCheck: false,
    setMouseCheck: (check) => set(() => ({ mouseCheck: check })),
    mouseXZ: [0, 0],
    setMouseXZ: (x, z) => set(() => ({ mouseXZ: [x, z] })),
  }))
);

export const planetStore = create(
  subscribeWithSelector((set) => ({
    planetName: [
      "Pernille",
      "Kathleen",
      "Sondre",
      "Lid",
      "Oskar",
      "Mia ",
      "Aslak ",
      "Elise ",
      "Tatiana ",
      "Gordey",
      "Lucas ",
      "Efremov",
      "Valerie ",
      "Estelle ",
      "Eklund",
      "Lindgren",
    ],
    setPlanetName: null,
    explanation: {
      태양: "임시로 배치된 중심 별",
      Kathleen: "캐슬린 설명입니다.",
      Lindgren: "린드그렌",
      Tatiana: "타티아나",
      etc: "아직 설명이 없는 행성입니다.",
    },
  }))
);
