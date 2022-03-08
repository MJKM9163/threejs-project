import React from "react";
import { Anemys } from "./Anemys";
import { Friendlys } from "./Friendlys";
import { ProjectileIndex } from "./projectiles/ProjectileIndex";

export const FlyingIndex = () => {
  return (
    <group>
      <Friendlys />
      <Anemys />
      <ProjectileIndex />
    </group>
  );
};
