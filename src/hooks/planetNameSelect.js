import { useRef } from "react";
import { planetStore } from "./stores/planetStore";

export const PlanetNameSelect = () => {
  const planetName = useRef(planetStore.getState().planetName);
  const randNum = Math.floor(Math.random() * planetName.current.length);
  return planetName.current[randNum];
};
