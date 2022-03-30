import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { planetStore } from "./planetStore";
import { screenStore } from "./screenStore";

export const eventStore = create(
  subscribeWithSelector((set, get) => ({
    eventR: (type) => {
      let checkA = [];
      let typeList = {};
      if (type === "e") {
        typeList = get().eventList;
      } else if (type === "ex") {
        typeList = get().exEventList;
      } else if (type === "sEx") {
        typeList = get().sExEventList;
      }
      for (let i in typeList) {
        if (typeList[i].check === true || typeList[i].key === false) {
          checkA.push(i);
        }
      }
      const num = Object.keys(typeList).filter((i) => !checkA.includes(i));

      if (num.length !== 0) {
        const max = num.length;
        const random = Math.floor(Math.random() * (max - 0));
        return [typeList[num[random]], num[random]];
      } else {
        return [get().default, null];
      }
    },
    preEvent: [],

    default: {
      name: "",
      description: "",
      assentText: "",
      assent: () => {},
      dissentText: "",
      dissent: () => {},
      img: "#",
      check: false, // 나왔던 이벤트인지 확인 용도
      key: true, // 선행 이벤트 진행 완료 ( 선행 없을 경우 기본 true)
    },

    eventList: {
      gravitationalWave: {
        name: "중력파",
        description:
          "멀리 떨어져 있는 블랙홀에서 관측 가능할 정도의 중력파가 발생했습니다. 빠른 속도로 우리의 행성으로 접근하고 있습니다.",
        assentText: "대비한다.",
        assent: () => {
          screenStore.setState({ eventCheck: false });
        },
        dissentText: "무시한다.",
        dissent: () => {
          screenStore.setState({ eventCheck: false });
        },
        img: "/images/events/gravitationalWave.jpg",
        check: false,
        key: true,
      },
      unstableSpaceTime: {
        name: "불안정한 시공간",
        description: "갑자기 우주 어딘가의 시공간이 일그러지고 있습니다.",
        assentText: "조사한다.",
        assent: () => {
          screenStore.setState({ eventCheck: false });
        },
        dissentText: "무시한다.",
        dissent: () => {
          screenStore.setState({ eventCheck: false });
        },
        img: "/images/events/unstableSpaceTime.jpg",
        check: false,
        key: true,
      },
    },
    exEventList: {
      coral: {
        name: "거대한 산호",
        description:
          "엄청난 크기의 산호입니다. 물 밖에서 서식하고 있으며 주기적으로 깨끗한 산소를 내뿜습니다. 이 거대한 산호는 연구할 가치가 있습니다.",
        assentText: "연구한다.",
        assent: () => {
          screenStore.setState({ exCheck: false });
          planetStore.setState((state) => (state.allResources.happiness += 5));
        },
        dissentText: "제거한다.",
        dissent: () => {
          screenStore.setState({ exCheck: false });
          planetStore.setState((state) => (state.allResources.food += 55));
        },
        img: "/images/events/coral.jpg",
        check: false,
        key: true,
      },
      rainbow: {
        name: "문명의 흔적",
        description:
          "알 수 없는 문명의 흔적을 발견했습니다. 계단식 농업과 거대한 구조물을 보니 상당한 농지라는걸 알 수 있습니다. 지금은 생명체를 찾기 힘들고 땅이 오염되어 사용할 수도 없습니다.",
        assentText: "땅을 복구한다.",
        assent: () => {
          screenStore.setState({ exCheck: false });
          planetStore.setState((state) => (state.allResources.gear += 4));
          planetStore.setState((state) => (state.allResources.happiness += 2));
        },
        dissentText: "남겨진 기계를 조사한다.",
        dissent: () => {
          screenStore.setState({ exCheck: false });
        },
        img: "/images/events/rainbow.jpg",
        check: false,
        key: true,
      },
      jungle: {
        name: "언덕 뿌리",
        description:
          "행성의 특이한 환경 탓에 나무의 뿌리부분이 이상할 만큼 성장했습니다. 거대한 나무뿌리는 적당한 건설 재료가 될 수 있지만 함께 공생하고 있는 작은 벌레가 있어 작업하는데 어려움이 있습니다.",
        assentText: "거대한 뿌리를 건설 재료로 사용한다.",
        assent: () => {
          screenStore.setState({ exCheck: false });
        },
        dissentText: "사용하지 않고 모두 제거한다.",
        dissent: () => {
          screenStore.setState({ exCheck: false });
        },
        img: "/images/events/jungle.jpg",
        check: false,
        key: true,
      },
    },
    sExEventList: {
      portal: {
        name: "불길한 왜곡",
        description:
          "우주 한 점이 점점 빨려들어가는 것처럼 보입니다. 정확히 무슨일이 벌어지고 있는지 알 수 없지만 불길하다는 것은 확실합니다.",
        assentText: "조사한다.",
        assent: () => {
          screenStore.setState({ sExCheck: false });
        },
        dissentText: "계속해서 지켜본다.",
        dissent: () => {
          screenStore.setState({ sExCheck: false });
        },
        img: "/images/events/portal.jpg",
        check: false,
        key: true,
      },
      newPlanet: {
        name: "새로운 행성",
        description: "우리의 행성계에서 새로운 행성을 발견했습니다.",
        assentText: "행성에 조사대를 먼저 보낸다.",
        assent: () => {
          screenStore.setState({ sExCheck: false });
        },
        dissentText: "행성 환경을 먼저 확인한다.",
        dissent: () => {
          screenStore.setState({ sExCheck: false });
        },
        img: "/images/events/newPlanet.jpg",
        check: false,
        key: true,
      },
      abandonedStructure: {
        name: "버려진 구조물",
        description:
          "언제 건설된 건지 알 수 없는 우주 구조물이 행성 주변에 떠다니고 있습니다. 겉으로 봐서는 어떤 역할의 구조물인지 확인이 불가합니다.",
        assentText: "구조물을 조사한다.",
        assent: () => {
          screenStore.setState({ sExCheck: false });
        },
        dissentText: "구조물을 분해해 건설재료로 사용한다.",
        dissent: () => {
          screenStore.setState({ sExCheck: false });
        },
        img: "/images/events/abandonedStructure.jpg",
        check: false,
        key: true,
      },
    },
  }))
);
