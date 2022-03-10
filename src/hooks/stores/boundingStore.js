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

    enemyNum: [1],
    friendlyNum: [1],
    explosiveNum: [{ MPos: new Vector3(0, 2000, 0), TPos: new Vector3(1000, 0, 0) }],
    pulseNum: [1],
  }))
);
//{ MPos: new Vector3(0, 2000, 0), TPos: new Vector3(1000, 0, 0) }
