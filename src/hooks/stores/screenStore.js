import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const screenStore = create(
  subscribeWithSelector((set) => ({
    // 자원
    imagesArray: ["potato", "titanium", "orichalcon", "science", "gear"],
    images: {
      potato: {
        name: "식량",
        img: "images/resources/images/potato.png",
        description:
          "가장 기본적인 자원입니다. 생존에 필수적이며 다양한 곳에 사용됩니다. 만약 식량이 부족하다면 정상적인 운영을 할 수 없을 것입니다.",
      },
      titanium: {
        name: "티타늄",
        img: "images/resources/images/titanium.png",
        description:
          "강도가 높아 우주에 건설되는 건물이나 비행체에 많이 사용됩니다. 항상 부족하기에 우주 해적이 호시탐탐 노리는 광석 입니다.",
      },
      orichalcon: {
        name: "오리하르콘",
        img: "images/resources/images/orichalcon.png",
        description:
          "매우 보기 드문 광석입니다. 오리하르콘은 알 수 없는 강한 힘을 방출하곤 합니다. 이런 특징을 이용하면 발전에 도움이 될지도 모릅니다. ",
      },
      science: {
        name: "과학",
        img: "images/resources/images/science.jpg",
        description: "과학은 기술 발전의 핵심입니다. 과학 수준을 높여서 누구보다 빠르게 신기술을 확보하세요.",
      },
      gear: {
        name: "생산력",
        img: "images/resources/images/gear.png",
        description: "생산력을 나타냅니다.",
      },
    },
    // hover Check
    hoverCheck: false,

    // right Options
    // ---left Info on/off
    leftInfoOnOff: false,
    // ---research Map on/off
    researchMapOnOff: false,

    // tap
    //tapState: { planetName: "???", check: false },
    tapCheck: false,

    // 대기열
    awaitArray: [],

    // 건설 완료
    completion: [],

    // 건설 목록
    productionArray: ["planetCurtain", "giantMiner"],
    production: {
      planetCurtain: {
        research: true,
        name: "행성 차폐막",
        img: "images/production/images/planetCurtain.jpg",
        video: "images/production/videos/planetCurtain.mp4",
        add: { 행복도: 10, 방어막: 300 },
        max: 100,
        description:
          "행성을 중심으로 에너지 차폐막을 만듭니다. 에너지 무기를 효과적으로 막을 수 있으며 행성의 거주민들의 불안감을 줄일 수 있습니다.",
      },
      giantMiner: {
        research: true,
        name: "거대 채굴기",
        img: "images/production/images/giantMiner.jpg",
        video: false,
        add: { 행복도: -5, 생산력: 20, 식량: -7 },
        max: 30,
        description:
          "거대한 행성용 채굴기 입니다. 강력한 채굴 능력을 가진 이 기계는 대부분 거주 구역과 멀리 떨어져 있습니다. 크기처럼 가동될 때의 소리가 만만치 않고, 땅을 파며 나오는 먼지또한 거주민에게 불편함을 줄 수 있기 때문입니다.",
      },
    },
  }))
);
