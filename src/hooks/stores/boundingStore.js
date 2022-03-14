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

    enemyNum: [], // 적군 비행기 수
    friendlyNum: [], // 아군 비행기 수
  }))
);
//{ MPos: new Vector3(0, 2000, 0), TPos: new Vector3(1000, 0, 0) }
