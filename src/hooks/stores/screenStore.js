import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { boundingStore } from "./boundingStore";

export const screenStore = create(
  subscribeWithSelector((set, get) => ({
    // 자원
    imagesArray: ["potato", "titanium", "orichalcon", "science", "gear"],

    // game Over Check
    gameOverCheck: false,

    // event Check
    eventCheck: false,

    // hover Check
    hoverCheck: false,

    // right Options
    // ---left Info on/off
    leftInfoOnOff: false,
    // ---research Map on/off
    researchMapOnOff: false,
    // ---Satellite Map on/off
    satelliteMapOnOff: false,
    // ---FlyingMove Map on/off
    flyingMoveMapCheck: null,
    flyingMovePos: [null, null, null],

    // tap
    tapCheck: false,

    // 대기열
    awaitArray: [],

    // 위성 수
    satellite: 3,
    satellitePos: [],
    // defenseSatellitePos: [],
    // dustExtractorPos: [],

    //eventResources: { food: 0, gear:0, science:0},

    // 자원 & 건물
    resourcesProduction: {
      potato: {
        completion: undefined,
        name: "식량",
        img: "/images/resources/images/potato.png",
        description:
          "가장 기본적인 자원입니다. 생존에 필수적이며 다양한 곳에 사용됩니다. 만약 식량이 부족하다면 정상적인 운영을 할 수 없을 것입니다.",
      },
      titanium: {
        completion: undefined,
        name: "티타늄",
        img: "/images/resources/images/titanium.png",
        description:
          "강도가 높아 우주에 건설되는 건물이나 비행체에 많이 사용됩니다. 항상 부족하기에 우주 해적이 호시탐탐 노리는 광석 입니다.",
      },
      orichalcon: {
        completion: undefined,
        name: "오리하르콘",
        img: "/images/resources/images/orichalcon.png",
        description:
          "매우 보기 드문 광석입니다. 오리하르콘은 알 수 없는 강한 힘을 방출하곤 합니다. 이런 특징을 이용하면 발전에 도움이 될지도 모릅니다. ",
      },
      science: {
        completion: undefined,
        name: "과학",
        img: "/images/resources/images/science.jpg",
        description: "과학은 기술 발전의 핵심입니다. 과학 수준을 높여서 누구보다 빠르게 신기술을 확보하세요.",
      },
      gear: {
        completion: undefined,
        name: "생산력",
        img: "/images/resources/images/gear.png",
        description: "생산력을 나타냅니다.",
      },
      planetCurtain: {
        research: false,
        completion: false,
        repetition: false,
        name: "행성 차폐막",
        img: "/images/production/planetCurtain.jpg",
        add: { happiness: 10, shield: 300 },
        cost: { food: 243, titanium: 10, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 690,
        description:
          "행성을 중심으로 에너지 차폐막을 만듭니다. 에너지 무기를 효과적으로 막을 수 있으며 행성의 거주민들의 불안감을 줄일 수 있습니다.",
      },
      giantMiner: {
        research: false,
        completion: false,
        repetition: false,
        name: "거대 채굴기",
        img: "/images/production/giantMiner.jpg",
        add: { food: -2.5, gear: 30, happiness: -5 },
        cost: { food: 268, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 840,
        description:
          "거대한 행성용 채굴기 입니다. 강력한 채굴 능력을 가진 이 기계는 대부분 거주 구역과 멀리 떨어져 있습니다. 크기처럼 가동될 때의 소리가 만만치 않고, 땅을 파며 나오는 먼지또한 거주민에게 불편함을 줄 수 있기 때문입니다.",
      },
      planetResearchInstitute: {
        research: false,
        completion: false,
        repetition: false,
        name: "행성 연구소",
        img: "/images/production/planetResearchInstitute.jpg",
        add: { food: 0.5, gear: 20, science: 10 },
        cost: { food: 70, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 360,
        description: "행성을 연구하는 시설입니다.",
      },
      exploration: {
        research: false,
        completion: false,
        repetition: true,
        name: "탐사",
        img: "/images/production/exploration.jpg",
        add: "행성급 이벤트 발생",
        cost: { food: 25, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        // 여기부터 시작 /이벤박스 on하고 배열에서 이벤트 랜덤추첨해서 props로 넣어주기
        max: 130,
        description: "행성을 탐사합니다.",
      },
      magneticFieldGenerator: {
        research: false,
        completion: false,
        repetition: false,
        name: "자기장 생성기",
        img: "/images/production/magneticFieldGenerator.jpg",
        add: { food: -0.2, science: 3, happiness: 5 },
        cost: { food: 130, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 550,
        description: "인공 자기장을 생성하고 조절하여 거주민에게 맞는 자기장 환경을 생성할 수 있습니다.",
      },
      biologicalDetector: {
        research: false,
        completion: false,
        repetition: false,
        name: "생체 감지기",
        img: "/images/production/biologicalDetector.jpg",
        add: { science: 2, happiness: 13 },
        cost: { food: 330, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 850,
        description: "행성에 존재하는 생명체를 감지할 수 있습니다.",
      },
      combinationOfAtmosphericElements: {
        research: false,
        completion: false,
        repetition: false,
        name: "대기 원소 조합",
        img: "/images/production/combinationOfAtmosphericElements.jpg",
        add: { happiness: 2, science: 10 },
        cost: { food: 250, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 420,
        description:
          "거주민에게 필요없는 대기 원소를 새로운 원소로 조합합니다. 행성은 살아가는데 쾌적한 환경이 될 것이며 거주민들은 밖에서 오랫동안 활동할 수 있게 됩니다.",
      },
      friendlyGeneticManipulation: {
        research: false,
        completion: false,
        repetition: false,
        name: "우호적 유전자 조작",
        img: "/images/production/friendlyGeneticManipulation.jpg",
        add: { happiness: 20, science: 5 },
        cost: { food: 780, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 560,
        description:
          "행성에 존재하는 적대적인 생명체의 유전자를 조작해 온순하게 만듭니다. 행성의 위험 구역이 적어지며 탐사 가능한 곳이 넓어집니다.",
      },
      adjustingTheAtmosphere: {
        research: false,
        completion: false,
        repetition: false,
        name: "대기 조정",
        img: "/images/production/adjustingTheAtmosphere.jpg",
        add: { happiness: 7, science: 2 },
        cost: { food: 550, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 650,
        description:
          "대기를 조정해 변칙적인 대기 환경을 제어합니다. 날씨를 거의 정확하게 예측할 수 있습니다.",
      },
      multipurposeSatellite: {
        research: false,
        completion: false,
        repetition: true,
        name: "다목적 위성",
        img: "/images/production/multipurposeSatellite.jpg",
        add: "다목적 위성 + 1",
        cost: { food: 680, titanium: 0, orichalcon: 0 },
        event: () => {
          //get()
          set((state) => ({ satellite: state.satellite + 1 }));
          set(
            (state) =>
              (state.resourcesProduction.multipurposeSatellite.cost.food =
                state.resourcesProduction.multipurposeSatellite.cost.food * 1.6)
          );
        },
        max: 550,
        description:
          "다양하게 사용가능한 위성을 생산합니다. 이 위성은 우주 공간에서 사용가능 합니다. 방어나 자원 추출 등 여러 곳에 도움을 줍니다.",
      },
      planetTourismFacilities: {
        research: false,
        completion: false,
        repetition: false,
        name: "행성 관광 시설",
        img: "/images/production/planetTourismFacilities.jpg",
        add: { food: 5, happiness: 15 },
        cost: { food: 650, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 720,
        description:
          "이제 우리는 행성을 위에서 내려다 볼 수 있고 누구든 적은 돈만 있다면 행성 주변을 여행 할 수 있게 되었습니다.",
      },
      explorationOfSpace: {
        research: false,
        completion: false,
        repetition: false,
        name: "우주 탐사",
        img: "/images/production/explorationOfSpace.jpg",
        add: "우주급 이벤트 발생",
        cost: { food: 520, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 300,
        description: "현재 행성 주위에 있는 다른 행성을 찾습니다.",
      },
      defenseSatellite: {
        research: false,
        completion: false,
        repetition: false,
        name: "방어 위성",
        img: "/images/production/defenseSatellite.jpg",
        add: "다목적 위성을 방어 위성으로 변환 가능",
        cost: { food: 500, titanium: 20, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 600,
        description:
          "다목적 위성을 방어 위성으로 사용합니다. 주변에 감지된 적대적인 물체를 공격해 파괴합니다.",
      },
      dustExtractor: {
        research: false,
        completion: false,
        repetition: false,
        name: "먼지 추출기",
        img: "/images/production/dustExtractor.jpg",
        add: "다목적 위성을 먼지 추출기로 변환 가능",
        cost: { food: 400, titanium: 5, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 500,
        description:
          "다목적 위성을 먼지 추출기로 사용합니다. 우주에 떠도는 먼지를 채집해 사용가능한 자원을 추출합니다.",
      },
      planetTrade: {
        research: false,
        completion: false,
        repetition: false,
        name: "행성 교역",
        img: "/images/production/planetTrade.jpg",
        add: { food: 7 },
        cost: { food: 800, titanium: 0, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 750,
        description:
          "행성간 교역이 활성화 됩니다. 다른 행성과 자원을 교환할 수 있으며 관광 산업이 더 성장합니다.",
      },
      titaniumAlloy: {
        research: false,
        completion: false,
        repetition: false,
        name: "티타늄 합금",
        img: "/images/production/titaniumAlloy.jpg",
        add: { science: 10 },
        cost: { food: 500, titanium: 20, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 860,
        description: "티타늄 합금을 사용해 비행체의 내구도를 상승 시킵니다.",
      },
      reactorCatalyst: {
        research: false,
        completion: false,
        repetition: false,
        name: "양자 반응로",
        img: "/images/production/reactorCatalyst.jpg",
        add: { science: 20 },
        cost: { food: 1200, titanium: 15, orichalcon: 0 },
        event: () => console.log("완료"),
        max: 1300,
        description:
          "반응로에 원자단위로 쪼갠 티타늄을 촉매로 사용해 에너지를 반응을 증폭시켰습니다. 미사일의 폭발력이 상승합니다.",
      },
      fighterPlane: {
        research: false,
        completion: false,
        repetition: true,
        name: "전투기 생산",
        img: "/images/production/basicFighter.jpg",
        add: "기본형 전투기 + 1",
        cost: { food: 750, titanium: 0, orichalcon: 0 },
        event: () => {
          let data = boundingStore.getState().friendlyNum;
          let num = data.findIndex((i) => i === false);
          data[num] = { D: 100 };
          console.log(data);
          boundingStore.setState({ friendlyNum: [...data] });
        },
        max: 672,
        description: "전투기를 생산합니다.",
      },
    },
  }))
);
