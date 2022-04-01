import React from "react";
import { AllResourcesFun } from "../../hooks/AllResourcesFun";
import { EventBox } from "../../hooks/EventBox";
import { ProductionControl } from "./Construction/ProductionControl";
import { Resources } from "./Construction/Resources";
import { HoverBox } from "./Infos/HoverBox";
import { Over } from "./Infos/LoadingOrOver";
import { PlanetInfo } from "./Infos/PlanetInfo";
import { ResearchMap } from "./Research/ResearchMap";
import { RightOption } from "./SideTap/RightOption";

export const InterfaceIndex = () => {
  return (
    <>
      <Over />
      <EventBox />
      <ResearchMap />
      <PlanetInfo />
      <AllResourcesFun />
      <Resources />
      <HoverBox />
      <ProductionControl />
      <RightOption />
    </>
  );
};
