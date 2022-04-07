import { Vector3 } from "three";
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const boundingStore = create(
  subscribeWithSelector((set) => ({
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

    satelliteData: {
      defense: {
        type: "방어위성",
        durability: 200,
        adjust: 1,
      },
    },
  }))
);
