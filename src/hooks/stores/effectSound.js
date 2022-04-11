import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const effectSound = create(
  subscribeWithSelector((set, get) => ({
    fighter: {
      FlightExplosionSound: {
        action: () => {
          const explosion = [
            new Audio("soundEffects/explosion1.mp3"),
            new Audio("soundEffects/explosion2.mp3"),
            new Audio("soundEffects/explosion3.mp3"),
          ];
          const n = Math.floor(Math.random() * (explosion.length + 1));
          explosion[n].volume = 0.5;
          explosion[n].play();
        },
      },
    },
    conCompletion: {
      action: () => {
        const completion = new Audio("soundEffects/conCompletion.mp3");
        completion.volume = 0.7;
        completion.play();
      },
    },
    event: {
      basicEvent: {
        action: () => {
          const event = new Audio("soundEffects/event.mp3");
          event.volume = 0.2;
          event.play();
        },
      },
      exEvent: {
        action: () => {
          const event = new Audio("soundEffects/exEvent.mp3");
          event.volume = 0.5;
          event.play();
        },
      },
      sExEvent: {
        action: () => {
          const event = new Audio("soundEffects/sExEvent.mp3");
          event.volume = 0.3;
          event.play();
        },
      },
    },
    plantEx: {
      action: () => {
        const plantEx = new Audio("soundEffects/plantEx.mp3");
        plantEx.volume = 0.5;
        plantEx.play();
      },
    },
  }))
);
