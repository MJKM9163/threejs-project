import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const effectSound = create(
  subscribeWithSelector((set, get) => ({
    fighter: {
      FlightExplosionSound: {
        action: () => {
          const tree = new Audio("soundEffects/FlightExplosionSound.mp3");
          tree.volume = 0.5;
          tree.play();
        },
      },
    },
  }))
);
