import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const imageStore = create(
  subscribeWithSelector((set) => ({
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
        description:
          "과학은 기술 발전의 핵심입니다. 과학 수준을 높여서 누구보다 빠르게 신기술을 확보하세요.",
      },
      gear: {
        name: "생산력",
        img: "images/resources/images/gear.png",
        description: "생산력을 나타냅니다.",
      },
    },
  }))
);
