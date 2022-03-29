import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { screenStore } from "./screenStore";

export const eventStore = create(
  subscribeWithSelector((set, get) => ({
    eventR: () => {
      let checkA = [];
      for (let i in get().eventList) {
        if (get().eventList[i].check === true) {
          checkA.push(i);
        }
      }
      const num = Object.keys(get().eventList).filter((i) => !checkA.includes(i));

      if (num.length !== 0) {
        const max = num.length;
        const random = Math.floor(Math.random() * (max - 0));
        return [get().eventList[num[random]], num[random]];
      } else {
        return [null, null];
      }
    },
    preEvent: [],

    eventList: {
      gravitationalWave: {
        name: "중력파",
        description:
          "멀리 떨어져 있는 블랙홀에서 관측 가능할 정도의 중력파가 발생했습니다. 빠른 속도로 우리의 행성으로 접근하고 있습니다.",
        demand: { food: 5 },
        get: { gear: 5 },
        assentText: "대비",
        assent: () => {
          screenStore.setState({ eventCheck: false });
        },
        dissentText: "무시",
        dissent: () => {
          screenStore.setState({ eventCheck: false });
        },
        img: "/images/events/gravitationalWave.jpg",
        check: false,
      },
      unstableSpaceTime: {
        name: "불안정한 시공간",
        description: "갑자기 우주 어딘가의 시공간이 일그러지고 있습니다.",
        demand: { food: 5 },
        get: { gear: 5 },
        assentText: "조사",
        assent: () => {
          screenStore.setState({ eventCheck: false });
        },
        dissentText: "무시",
        dissent: () => {
          screenStore.setState({ eventCheck: false });
        },
        img: "/images/events/unstableSpaceTime.jpg",
        check: false,
      },
    },
  }))
);
