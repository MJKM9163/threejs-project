import react, { useRef } from "react";
import { useStore } from "./useStore";

export const EffectSelect = (sizeNum) => {
  const pEffect = useRef(useStore.getState().positiveEffects);
  const sameArray = [];
  const result = [];
  //   const sizeCheck = sizeNum.current.geometry.parameters.radius;
  const sizeCheck = sizeNum;
  const max = sizeCheck >= 350 ? 4 : sizeCheck >= 180 ? 2 : 1;

  for (let i = 0; i < max; i++) {
    const num = Math.floor(Math.random() * pEffect.current.length);
    if (sameArray.indexOf(num) === -1) {
      sameArray.push(num);
    } else {
      i--;
    }
  }

  for (let u = 0; u < max; u++) {
    result.push(pEffect.current[sameArray[u]]);
  }

  return result;
};
