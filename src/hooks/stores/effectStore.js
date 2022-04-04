import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import NanoFactory from "../../effectModels/NanoFactory";
import Ring from "../../effectModels/Ring";

export const effectStore = create(
  subscribeWithSelector((set) => ({
    effects: null,
    setEffects: (check) => set(() => ({ effects: check })),
    positiveEffects: [
      {
        name: "나노 공장",
        img: "",
        resources: { gear: 10 },
        description:
          "행성 주변을 돌고 있는 공장입니다. 고도의 나노 기술을 사용한 초소형 기계를 계속해서 만들어내고 있으며 누가, 언제 이 공장을 건설한지 알 수 없습니다.",
      },
      {
        name: "고대 연구소",
        img: "/images/effects/ancientLaboratory.jpg",
        resources: { science: 7 },
        description:
          "행성 깊숙한 곳에 위치한 신비한 연구소입니다. 이 연구소 중앙에는 인간과 똑같은 모습의 슈퍼 컴퓨터가 자리잡고 있습니다. 현재 우리의 기술로는 이 연구소를 100% 활용하기 힘듭니다.",
      },
      {
        name: "아름다운 고리",
        img: "/images/effects/ring.jpg",
        resources: { happiness: 12 },
        description:
          "아름다운 고리를 눈으로 확인 할 수 있습니다. 이 행성의 생명체들은 가끔식 하늘을 올려다 보며 눈요기를 하기도 합니다.",
      },
    ],
    negativeEffects: [
      {
        name: "포자 지대",
        img: "/images/effects/sporeZone.jpg",
        resources: { food: -0.2 },
        description: "포자",
      },
      {
        name: "적대적 환경",
        img: "/images/effects/hostileEnvironment.jpg",
        resources: { science: -2, happiness: -3 },
        description: "적대적",
      },
      {
        name: "불길한 흔적",
        img: "/images/effects/ominousTrace.jpg",
        resources: { science: 3, happiness: -8 },
        description: "불길한",
      },
      { name: "벌레 무리", img: "/images/effects/swarm.jpg", resources: { gear: -2 }, description: "벌레" },
    ],
    positiveEffectModels: { 나노공장: <NanoFactory />, 아름다운고리: <Ring /> },
  }))
);
