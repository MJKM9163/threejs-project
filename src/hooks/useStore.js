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

export const effectStore = create(
  subscribeWithSelector((set) => ({
    effects: null,
    setEffects: (check) => set(() => ({ effects: check })),
    positiveEffects: [
      "나노 공장",
      "거대 식물",
      "아름다운 고리",
      "다양한 종",
      "광천수",
    ],
    negativeEffect: ["환각 대기", "방사능", "얼음-9", "갈라진 지각"],
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
