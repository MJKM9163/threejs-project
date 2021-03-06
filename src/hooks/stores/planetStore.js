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
      지구형: { climate: "온대", resources: { food: 2, gear: 5, science: 1 } },
      얼음형: { climate: "한랭", resources: { food: 0.2, gear: 2, science: 7 } },
      용암형: { climate: "고온", resources: { food: 0.5, gear: 12, science: 1 } },
      주계열성: { climate: "없음" },
    },
    size: { small: 70, middle: 180, large: 550 },

    selectPlanet: {},
    // default: {
    //   name: earthPname,
    //   type: "지구형",
    //   size: argsSize.current["middle"],
    //   position: collisionWorldPosition,
    //   main: false,
    //   effect: eartheffects,
    // },

    typeResearchCheck: {
      lava: false,
      ice: false,
      earth: true,
    },

    allResources: {
      food: 0,
      gear: 0,
      science: 0,
      titanium: 0,
      orichalcon: 0,
      happiness: 50,
      shield: 0,
    },

    // planetResources default
    // name: {
    //  resources: { food: 0.5, gear: 5, science: 1 }
    //  develop: true,
    //  hide: true,
    // }
    planetResources: {},

    // 중심부터 카운트 / 행성 내구도
    planetDurability: [
      { durability: 1000, ON: true },
      { durability: 500, ON: true },
      { durability: 500, ON: true },
    ],
  }))
);
