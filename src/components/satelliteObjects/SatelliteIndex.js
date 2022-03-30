import React from "react";
import { screenStore } from "../../hooks/stores/screenStore";
import { MultipurposeSatellite } from "./satelliteModels/MultipurposeSatellite";

export const SatelliteIndex = () => {
  const satellitePos = screenStore((state) => state.satellitePos);

  return (
    <group>
      {satellitePos.map((item, index) => (
        <MultipurposeSatellite key={"satellite" + index} position={item.position} num={index} />
      ))}
    </group>
  );
};
