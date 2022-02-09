import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const planetStore = create(
  subscribeWithSelector((set) => ({
    planetName: [
      "Pernille",
      "Kathleen",
      "Sondre",
      "Lid",
      "Oskar",
      "Mia",
      "Aslak",
      "Elise",
      "Tatiana",
      "Gordey",
      "Lucas",
      "Efremov",
      "Valerie",
      "Estelle",
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

    planetResources: [],
  }))
);
