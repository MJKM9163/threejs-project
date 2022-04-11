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
        description:
          "독성을 내뿜는 포자가 가득한 영역이 존재합니다. 이 영역은 조용하고 평화롭게 보이지만 가까이 접근하게 된다면 원인을 알기도 전에 몸이 가루로 변할 것입니다.",
      },
      {
        name: "적대적 환경",
        img: "/images/effects/hostileEnvironment.jpg",
        resources: { science: -2, happiness: -7 },
        description:
          "이 행성에는 적대적 생물이 가득합니다. 쉽게 제압이 가능하지만 언제 어디서 나타날지 모르기 때문에 항상 긴장하며 생활해야 합니다.",
      },
      {
        name: "불길한 흔적",
        img: "/images/effects/ominousTrace.jpg",
        resources: { science: 3, happiness: -8 },
        description:
          "행성 표면에 인공적으로 뚫린 원형 구멍이 곳곳에 있습니다. 이유는 알 수 없지만 자연적인 현상이 아닌 것만으로 충분히 위협적이고 흥미롭습니다.",
      },
      {
        name: "벌레 무리",
        img: "/images/effects/swarm.jpg",
        resources: { gear: -2, happiness: -3 },
        description:
          "불쾌한 벌레들이 무리를 지어 행동하고 있습니다. 생각보다 높은 지능을 가진 이 벌레들은 거주민들에게 혐오감과 공포를 줍니다.",
      },
    ],
    positiveEffectModels: { 나노공장: <NanoFactory />, 아름다운고리: <Ring /> },
  }))
);
