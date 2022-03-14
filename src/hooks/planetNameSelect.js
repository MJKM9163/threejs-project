import { useRef } from "react";
import { planetStore } from "./stores/planetStore";

let exc = [];

export const PlanetNameSelect = () => {
  const planetName = useRef(planetStore.getState().planetName);
  for (let i = 0; i < 1; i++) {
    const randNum = Math.floor(Math.random() * planetName.current.length);
    if (exc.includes(planetName.current[randNum])) {
      i--;
    } else {
      exc.push(planetName.current[randNum]);
      return planetName.current[randNum];
    }
  }
};
