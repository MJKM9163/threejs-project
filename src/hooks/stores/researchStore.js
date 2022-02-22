import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const researchStore = create(
  subscribeWithSelector((set) => ({
    position: null,
    list: {
      basic: {
        description: "연구를 시작하기 위해 연구 시스템을 활성화 합니다.",
        AddResources: { science: 1 },
        AddStructure: {},
        cost: 1,
        position: [250, 195],
      },
      planetSystem: {
        description:
          "과학의 발달로 행성을 어느정도 컨트롤 할 수 있습니다. 몇몇 난폭한 자연현상을 제외하곤 행성 거주자들이 원하는 환경을 만들 수 있습니다.",
        AddResources: { gear: 1, science: 1 },
        AddStructure: {},
        cost: 1,
        position: [55, 605],
      },
      largeScaleIndustrialization: {
        description:
          "생명체가 우주로 진출하면서 대규모라는 정의가 달라졌습니다. 행성 면적의 10분의 1정도를 차지해야 비로소 대규모라고 말할 수 있습니다.",
        AddResources: { gear: 1, science: 1 },
        AddStructure: {},
        cost: 1,
        position: [255, 605],
      },
      artificialBacteria: {
        description:
          "대부분 행성의 환경은 우리에게 적대적입니다. 일반 박테리아로는 적대적인 환경을 개선시키기 어려웠지만, 높은 과학기술로 강화된 박테리아를 이용해 조금이나마 환경을 개선할 수 있게 되었습니다.",
        AddResources: { food: 1, science: 1 },
        AddStructure: {},
        cost: 1,
        position: [450, 605],
      },
      spaceArchitecture: {
        description: "이제 행성에서 하늘을 올려다보면 위성 말고도 둥둥 떠있는 건물을 볼 수 있게 되었습니다.",
        AddResources: { gear: 1, science: 1 },
        AddStructure: {},
        cost: 1,
        position: [650, 605],
      },
      xenology: {
        description:
          "우주는 미스테리로 가득합니다. 외계 행성에서 조사한 결과를 바탕으로 외계생명체, 광물, 건축물에 대한 연구를 진행합니다.",
        AddResources: { gear: 1, science: 1 },
        AddStructure: {},
        cost: 1,
        position: [850, 605],
      },
      satelliteBoundarySystem: {
        description:
          "행성의 주변 위성을 이용하여 더 강력하고 빈틈없는 경계 체계를 구축합니다. 거주민들은 더 이상 행성 바깥의 위험에 벌벌 떨지 않아도 됩니다.",
        AddResources: { science: 1 },
        AddStructure: {},
        cost: 1,
        position: [55, 955],
      },
      interplanetaryTrade: {
        description: "교역의 무대가 우주로 확장됩니다. 외계의 광물을 더 쉽게 구할 수 있게 됩니다.",
        AddResources: { science: 1 },
        AddStructure: {},
        cost: 1,
        position: [150, 805],
      },
      titaniumAlloy: {
        description:
          "특수한 광물인 티타늄을 가공하는 방법을 개발합니다. 이제 비행체는 더 강력해지고 건축물은 더 단단해집니다.",
        AddResources: { science: 1 },
        AddStructure: {},
        cost: 1,
        position: [250, 955],
      },
    },
  }))
);
