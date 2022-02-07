import React, { useRef } from "react";
import { effectStore } from "./stores/effectStore";

// 개발할 때는 꼭 주석 처리나 임포트 된 곳 주석처리 할 것!

export const EffectModelSelect = (pEffectArray, nEffectArray) => {
  const regex = / /gi;
  const pEffectModels = useRef(effectStore.getState().positiveEffectModels);
  //const nEffectModels = useRef(effectStore.getState().negativeEffectModels);

  const final = [];
  for (let i = 0; i < pEffectArray.length; i++) {
    if (pEffectArray[i].replace(regex, "") in pEffectModels.current === true) {
      final.push(pEffectModels.current[pEffectArray[i].replace(regex, "")]);
    }
  }
  console.log(pEffectArray);

  return final;
};
