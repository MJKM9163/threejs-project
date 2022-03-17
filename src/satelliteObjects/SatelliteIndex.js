import React from "react";
import { screenStore } from "../hooks/stores/screenStore";
import { DefenseSatellite } from "./satelliteModels/DefenseSatellite";
import { DustExtractor } from "./satelliteModels/DustExtractor";
import { MultipurposeSatellite } from "./satelliteModels/MultipurposeSatellite";

export const SatelliteIndex = () => {
  const satellitePos = screenStore((state) => state.satellitePos);
  const defenseSatellitePos = screenStore((state) => state.defenseSatellitePos);
  const dustExtractorPos = screenStore((state) => state.dustExtractorPos);
  console.log(satellitePos);
  console.log(defenseSatellitePos);
  console.log(dustExtractorPos);

  return (
    <group>
      {satellitePos.map((item, index) => (
        <MultipurposeSatellite key={"satellite" + index} position={item} num={index} />
      ))}
      {defenseSatellitePos.map((item, index) => (
        <DefenseSatellite key={"defense" + index} position={item} num={index} />
      ))}
      {dustExtractorPos.map((item, index) => (
        <DustExtractor key={"dustExtractor" + index} position={item} num={index} />
      ))}
    </group>
  );
};
