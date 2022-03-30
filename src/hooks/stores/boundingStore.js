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

    // 적군 정보 max 12
    enemyNum: [false, false, false, false, false, false, false, false, false, false, false, false],
    // 아군 정보 max 3
    friendlyNum: [false, false, false],
  }))
);
//{ MPos: new Vector3(0, 2000, 0), TPos: new Vector3(1000, 0, 0) }
