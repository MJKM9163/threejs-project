import React from "react";
import { SpaceCamera } from "./controls/SpaceCamera";
import { Earth } from "./earthOrbit/Earth";
import { Sun } from "./Sun";
import { Unknown } from "./unknownOrbit/Unknown";

export const SpaceIndex = () => {
  return (
    <>
      <SpaceCamera />
      <Sun />
      <Earth />
      <Unknown />
    </>
  );
};
