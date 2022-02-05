import react, { useRef } from "react";
import { effectStore } from "./effectStore";

export const EffectSelect = (sizeNum) => {
  const pEffect = useRef(effectStore.getState().positiveEffects);
  const nEffect = useRef(effectStore.getState().negativeEffect);
  const pArray = [];
  const nArray = [];
  const pResult = [];
  const NResult = [];
  const final = [];
  //   const sizeCheck = sizeNum.current.geometry.parameters.radius;
  const sizeCheck = sizeNum;
  const max = sizeCheck >= 350 ? 4 : sizeCheck >= 180 ? 2 : 1;

  for (let i = 0; i < max; i++) {
    const pNum = Math.floor(Math.random() * pEffect.current.length);
    if (pArray.indexOf(pNum) === -1) {
      pArray.push(pNum);
    } else {
      i--;
    }
  }

  for (let e = 0; e < (max === 4 ? 2 : 1); e++) {
    const nNum = Math.floor(Math.random() * nEffect.current.length);
    if (nArray.indexOf(nNum) === -1) {
      nArray.push(nNum);
    } else {
      e--;
    }
  }

  for (let u = 0; u < max; u++) {
    pResult.push(pEffect.current[pArray[u]]);
  }
  for (let uu = 0; uu < (max === 4 ? 2 : 1); uu++) {
    NResult.push(nEffect.current[nArray[uu]]);
  }
  final.push(pResult);
  final.push(NResult);
  return final;
};
