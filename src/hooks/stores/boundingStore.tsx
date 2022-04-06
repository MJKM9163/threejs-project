import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface fighterState {
  friendly?: friendlyState;
  enemy?: object;
}

interface friendlyState {
  [index: string]: string;
}

interface weaponsState {
  missile: object;
  pulse: object;
}

interface dataState {
  basic: object;
  battleship: object;
}

interface BoundingState {
  fighter: fighterState;
  // fighter: Partial<Pick<fighterState, 'friendly' | 'enemy'>>;
  weapons: weaponsState;
  enemyData: dataState;
  enemyLive: Array<boolean | object>;
  friendlyData: dataState;
  friendlyLive: Array<boolean | object>;
}

export const boundingStore = create(
  subscribeWithSelector<BoundingState, any, any, any>((set, get) => ({
    // 감지 BS 저장

    fighter: {
      friendly: {},
      enemy: {},
    },
    // 무기 정보
    weapons: {
      missile: { type: "missile", damage: 20 },
      pulse: { type: "pulse", damage: 10 },
    },
    // 적군 정보 max 12
    enemyData: {
      basic: { type: "공격함", durability: 100, adjust: 1 },
      battleship: { type: "전함", durability: 500, adjust: 1.5 },
    },
    enemyLive: [false, false, false, false, false, false, false, false, false, false, false, false],
    // 아군 정보 max 3
    friendlyData: {
      basic: { type: "공격함", durability: 200, adjust: 1.1 },
      battleship: { type: "전함", durability: 1200, adjust: 1.8 },
    },
    friendlyLive: [false, false, false],
  }))
);
