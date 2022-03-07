import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const boundingStore = create(
  subscribeWithSelector((set) => ({
    fighter: {
      friendly: {},
      enemy: {},
    },
    planet: {},

    enemyNum: [1, 2, 3, 4],
  }))
);
