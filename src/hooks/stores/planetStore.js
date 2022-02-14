import create from "zustand";
import produce from "immer";
import { subscribeWithSelector } from "zustand/middleware";
import { ProductionControl } from "../../interface/Construction/ProductionControl";

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

    planetResources: [],
    // planetFind: (name) =>
    //   produce((draft) => {
    //     return draft.planetResources.find((item) => item[name.current]);
    //   }),
    planetResourcesAdd: (name, resources) =>
      set(
        produce((draft) => {
          draft.planetResources.push({
            [name]: {
              resources: resources,
              develop: true,
              hide: true,
              control: <ProductionControl />,
            },
          });
        })
      ),
  }))
);

// 찾기
//const dramaIndex = draft.planetResources.find((el) => el[name]);
