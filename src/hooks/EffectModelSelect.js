import React, { useRef } from "react";
import { effectStore } from "./effectStore";

export const EffectModelSelect = (pEffectArray, nEffectArray) => {
  const regex = / /gi;
  const pEffectModels = useRef(effectStore.getState().positiveEffectModels);
  //const nEffectModels = useRef(effectStore.getState().negativeEffectModels);
  console.log(pEffectArray);

  const final = [];
  //   for (let i = 0; i < pEffectArray.length; i++) {
  //     if (pEffectArray[i].replace(regex, "") in pEffectModels.current === true) {
  //       final.push(pEffectModels.current[pEffectArray[i].replace(regex, "")]);
  //     }
  //   }
  final.push(pEffectModels.current["나노공장"]);
  console.log(final);

  return final;
};
