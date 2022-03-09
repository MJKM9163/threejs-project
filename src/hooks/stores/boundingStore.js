import { Vector3 } from "three";
import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const boundingStore = create(
  subscribeWithSelector((set) => ({
    fighter: {
      friendly: {},
      enemy: {},
    },
    planet: {},

    enemyNum: [1, 2],
    friendlyNum: [1],
    explosiveNum: [],
    pulseNum: [1],
    ttt: [1, 2, 3],
  }))
);
