import React from "react";
import { Anemys } from "./Anemys";
import { MemoTtest, Ttest } from "./fighters/Ttest";
import { Friendlys } from "./Friendlys";

export const FlyingIndex = () => {
  return (
    <group>
      {/* <Ttest /> */}
      <Friendlys />
      <Anemys />
    </group>
  );
};
