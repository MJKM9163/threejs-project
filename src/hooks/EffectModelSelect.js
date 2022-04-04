import { useRef } from "react";
import { effectStore } from "./stores/effectStore";

export const EffectModelSelect = (pEffectArray, nEffectArray) => {
  const regex = / /gi;
  const pEffectModels = useRef(effectStore.getState().positiveEffectModels);
  //const nEffectModels = useRef(effectStore.getState().negativeEffectModels);
  const final = [];
  for (let i = 0; i < pEffectArray.length; i++) {
    if (pEffectArray[i].name.replace(regex, "") in pEffectModels.current === true) {
      final.push(pEffectModels.current[pEffectArray[i].name.replace(regex, "")]);
    }
  }
  //console.log(pEffectArray);

  return final;
};
