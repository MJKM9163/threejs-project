import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import NanoFactory from "../../effectModels/NanoFactory";

export const effectStore = create(
  subscribeWithSelector((set) => ({
    effects: null,
    setEffects: (check) => set(() => ({ effects: check })),
    positiveEffects: [
      "나노 공장",
      "거대 식물",
      "아름다운 고리",
      "다양한 종",
      "광천수",
    ],
    negativeEffect: ["환각 대기", "방사능", "얼음-9", "갈라진 지각"],
    positiveEffectModels: { 나노공장: <NanoFactory /> },
  }))
);
