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

    types: {
      지구형: { climate: "온대", resources: { food: 7, gear: 5, science: 1 } },
      얼음형: { climate: "한랭", resources: { food: 1, gear: 2, science: 5 } },
      주계열성: { climate: "없음" },
      "???": { climate: null },
    },

    allResources: {
      food: 0,
      gear: 0,
      science: 0,
      titanium: 0,
      orichalcon: 0,
    },

    planetResources: {},
  }))
);
//console.log(planetStore.getState().planetResources);
// 찾기
//const dramaIndex = draft.planetResources.find((el) => el[name]);
