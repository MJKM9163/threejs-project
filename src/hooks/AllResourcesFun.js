import React from "react";
import { planetStore } from "./stores/planetStore";

let cycle;
const FoodResources = () => {
  const allResources = planetStore((state) => state.allResources);
  const planetResources = planetStore((state) => state.planetResources);
  clearInterval(cycle);
  cycle = setInterval(() => {
    for (let item in planetResources) {
      planetStore.getState().allResources.food += planetResources[item].resources.food;
    }
    planetStore.setState({
      allResources: { ...allResources },
    });
  }, 500);
  //console.log(planetStore.getState().allResources.food);
  //console.log("식량 랜더링");
};

const GearRresources = () => {
  const planetResources = planetStore((state) => state.planetResources);

  planetStore.getState().allResources.gear = 0;
  for (let item in planetResources) {
    planetStore.getState().allResources.gear += planetResources[item].resources.gear;
  }
  //console.log("기어 랜더링");
};

const ScienceRresources = () => {
  const planetResources = planetStore((state) => state.planetResources);

  planetStore.getState().allResources.science = 0;
  for (let item in planetResources) {
    planetStore.getState().allResources.science += planetResources[item].resources.science;
  }
  //console.log("과학 랜더링");
};

const TitaniumRresources = () => {
  const planetResources = planetStore((state) => state.planetResources);

  planetStore.getState().allResources.titanium = 0;
  for (let item in planetResources) {
    planetStore.getState().allResources.titanium += planetResources[item].resources.titanium;
  }
  console.log("티타늄 랜더링");
};

const OrichalconRresources = () => {
  const planetResources = planetStore((state) => state.planetResources);

  planetStore.getState().allResources.orichalcon = 0;
  for (let item in planetResources) {
    planetStore.getState().allResources.orichalcon += planetResources[item].resources.orichalcon;
  }
  console.log("오리하르콘 랜더링");
};

export const AllResourcesFun = () => {
  FoodResources();
  GearRresources();
  ScienceRresources();
  //TitaniumRresources();
  //OrichalconRresources();
  return null;
};
