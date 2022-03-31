import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const researchStore = create(
  subscribeWithSelector((set, get) => ({
    position: null, // 아직 결정 못함
    researchResources: {
      food: 0,
      gear: 0,
      science: 0,
    },
    completionList: ["laboratory"],
    costTier: { Tier0: 1, Tier1: 15, Tier2: 70, Tier3: 300 },
    list: {
      basic: {
        name: "시스템 활성화",
        description: "연구를 시작하기 위해 연구 시스템을 활성화 합니다.",
        AddResources: { science: 2 },
        AddStructure: { planetResearchInstitute: "행성 연구소", exploration: "탐사" },
        tier: "Tier0",
        cost: () => Math.floor(get().costTier.Tier0),
        position: [250, 195],
        inPos: { top: "250px", left: "195px" },
        NecessaryResearch: ["laboratory"],
      },
      planetSystem: {
        name: "행성 시스템",
        description:
          "과학의 발달로 행성을 어느정도 컨트롤 할 수 있습니다. 몇몇 난폭한 자연현상을 제외하곤 행성 거주자들이 원하는 환경을 만들 수 있습니다.",
        AddResources: { gear: 2, science: 1 },
        AddStructure: {
          magneticFieldGenerator: "자기장 생성기",
          biologicalDetector: "생체 감지기",
          planetCurtain: "행성 차폐막",
        },
        tier: "Tier1",
        cost: () => Math.floor(get().costTier.Tier1),
        position: [55, 605],
        inPos: { top: "55px", left: "605px" },
        NecessaryResearch: ["basic"],
      },
      largeScaleIndustrialization: {
        name: "대규모 산업화",
        description:
          "생명체가 우주로 진출하면서 대규모라는 정의가 달라졌습니다. 행성 면적의 10분의 1정도를 차지해야 비로소 대규모라고 말할 수 있습니다.",
        AddResources: { gear: 3 },
        AddStructure: { giantMiner: "거대 채굴기", combinationOfAtmosphericElements: "대기 원소 조합" },
        tier: "Tier1",
        cost: () => Math.floor(get().costTier.Tier1),
        position: [255, 605],
        inPos: { top: "250px", left: "605px" },
        NecessaryResearch: ["basic"],
      },
      artificialBacteria: {
        name: "인공 박테리아",
        description:
          "대부분 행성의 환경은 우리에게 적대적입니다. 일반 박테리아로는 적대적인 환경을 개선시키기 어려웠지만, 높은 과학기술로 강화된 박테리아를 이용해 조금이나마 환경을 개선할 수 있게 되었습니다.",
        AddResources: { food: 0.5, science: 1 },
        AddStructure: {
          friendlyGeneticManipulation: "우호적 유전자 조작",
          adjustingTheAtmosphere: "대기 조정",
        },
        tier: "Tier1",
        cost: () => Math.floor(get().costTier.Tier1),
        position: [450, 605],
        inPos: { top: "450px", left: "605px" },
        NecessaryResearch: ["basic"],
      },
      spaceArchitecture: {
        name: "우주 건축",
        description: "이제 행성에서 하늘을 올려다보면 위성 말고도 둥둥 떠있는 건물을 볼 수 있게 되었습니다.",
        AddResources: { gear: 7, science: 1 },
        AddStructure: { multipurposeSatellite: "다목적 위성", planetTourismFacilities: "행성 관광 시설" },
        tier: "Tier1",
        cost: () => Math.floor(get().costTier.Tier1),
        position: [650, 605],
        inPos: { top: "650px", left: "605px" },
        NecessaryResearch: ["basic"],
      },
      xenology: {
        name: "외계학",
        description:
          "우주는 미스테리로 가득합니다. 외계 행성에서 조사한 결과를 바탕으로 외계생명체, 광물, 건축물에 대한 연구를 진행합니다.",
        AddResources: { science: 3, happiness: 5 },
        AddStructure: { explorationOfSpace: "우주 탐사" },
        tier: "Tier1",
        cost: () => Math.floor(get().costTier.Tier1),
        position: [850, 605],
        inPos: { top: "850px", left: "605px" },
        NecessaryResearch: ["basic"],
      },
      satelliteBoundarySystem: {
        name: "위성 경계 체계",
        description:
          "행성의 주변 위성을 이용하여 더 강력하고 빈틈없는 경계 체계를 구축합니다. 거주민들은 더 이상 행성 바깥의 위험에 벌벌 떨지 않아도 됩니다.",
        AddResources: { gear: 5 },
        AddStructure: { defenseSatellite: "방어 위성", dustExtractor: "먼지 추출기" },
        tier: "Tier3",
        cost: () => Math.floor(get().costTier.Tier3),
        position: [55, 955],
        inPos: { top: "55px", left: "955px" },
        NecessaryResearch: ["planetSystem"],
      },
      interplanetaryTrade: {
        name: "행선간 교역",
        description: "교역의 무대가 우주로 확장됩니다. 외계의 광물을 더 쉽게 구할 수 있게 됩니다.",
        AddResources: { food: 1 },
        AddStructure: { planetTrade: "행성 교역" },
        tier: "Tier2",
        cost: () => Math.floor(get().costTier.Tier2),
        position: [150, 805],
        inPos: { top: "150px", left: "805px" },
        NecessaryResearch: ["planetSystem", "largeScaleIndustrialization"],
      },
      titaniumAlloy: {
        name: "티타늄 합금",
        description:
          "특수한 광물인 티타늄을 가공하는 방법을 개발합니다. 이제 비행체는 더 강력해지고 건축물은 더 단단해집니다.",
        AddResources: { gear: 3, science: 2 },
        AddStructure: { titaniumAlloy: "티타늄 합금", reactorCatalyst: "양자 반응로" },
        tier: "Tier3",
        cost: () => Math.floor(get().costTier.Tier3),
        position: [250, 955],
        inPos: { top: "250px", left: "955px" },
        NecessaryResearch: ["largeScaleIndustrialization"],
      },

      //----

      biologicalProgram: {
        name: "생체 프로그램",
        description:
          "위험한 외계 활동을 위해 생명유지에 도움이되는 연구를 진행합니다. 가혹한 환경에서도 빠르게 적응할 수 있게 됩니다.",
        AddResources: { science: 4, happiness: 7 },
        AddStructure: { bioconnector: "생체 연결 장치", adaptiveBody: "적응형 신체" },
        tier: "Tier2",
        cost: () => Math.floor(get().costTier.Tier2),
        position: [350, 805],
        inPos: { top: "355px", left: "805px" },
        NecessaryResearch: ["largeScaleIndustrialization", "artificialBacteria"],
      },
      nanoControlSystem: {
        name: "나노 컨트롤 시스템",
        description:
          "이제 섬세한 작업은 그리 어려운 일이 아닙니다. 나노 사이즈의 기계들은 인류 생활에 필수적인 존재가 되었습니다.",
        AddResources: { science: 2 },
        AddStructure: { nanobiotechnology: "나노 회복기" },
        tier: "Tier3",
        cost: () => Math.floor(get().costTier.Tier3),
        position: [450, 955],
        inPos: { top: "450px", left: "955px" },
        NecessaryResearch: ["artificialBacteria"],
      },
      oxygenRecaptureDevice: {
        name: "산소 재포집 장치",
        description:
          "우주 공간에서 산소를 찾기란 무척 어려운 일입니다. 하지만 산소 재포집 장치를 이용해 미량의 산소를 모아 사용할 수 있게 되었습니다.",
        AddResources: { science: 1, happiness: 2 },
        AddStructure: { fighterPlane: "전투기" },
        tier: "Tier2",
        cost: () => Math.floor(get().costTier.Tier2),
        position: [550, 805],
        inPos: { top: "550px", left: "805px" },
        NecessaryResearch: ["artificialBacteria", "spaceArchitecture"],
      },
      hermesConnector: {
        name: "헤르메스 연결체",
        description:
          "연결 신호가 강화되어 더욱 먼 곳까지 통신을 주고받을 수 있으며 거의 실시간으로 통신이 전달 됩니다.",
        AddResources: { gear: 7, science: 2 },
        AddStructure: { multipleControlCenter: "다중 컨트롤 센터", matrixExtension: "매트릭스 확장" },
        tier: "Tier3",
        cost: () => Math.floor(get().costTier.Tier3),
        position: [650, 955],
        inPos: { top: "650px", left: "955px" },
        NecessaryResearch: ["spaceArchitecture"],
      },
      extraterrestrialFoodConversionStation: {
        name: "외계 식량 변환소",
        description:
          "평소 먹던 식량과는 매우 다른 외계의 식량을 기존의 식량과 비슷하게 변환합니다. 이제 외계의 식량도 사용가능해 거주민들의 식량 걱정이 줄었습니다.",
        AddResources: { food: 1.3, science: 1 },
        AddStructure: { ultraScaleWork: "초규모 작업" },
        tier: "Tier2",
        cost: () => Math.floor(get().costTier.Tier2),
        position: [750, 805],
        inPos: { top: "750px", left: "805px" },
        NecessaryResearch: ["spaceArchitecture", "xenology"],
      },
      extraterrestrialAnthropology: {
        name: "외계 인류학",
        description:
          "외계에 존재하는 지적 생명체의 문화, 사회 등 행동 방식 등을 연구 합니다. 외계의 지적 생명체와 교류가 가능해 지며 오해도 줄어듭니다.",
        AddResources: { science: 5 },
        AddStructure: { friendlyAgreement: "친화적 협정" },
        tier: "Tier3",
        cost: () => Math.floor(get().costTier.Tier3),
        position: [850, 955],
        inPos: { top: "850px", left: "955px" },
        NecessaryResearch: ["xenology"],
      },
    },
  }))
);
