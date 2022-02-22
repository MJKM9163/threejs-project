import React, { useEffect } from "react";
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

let gearArray = [];
const GearRresources = () => {
  const planetResources = planetStore((state) => state.planetResources);
  const allResources = planetStore((state) => state.allResources);

  if (gearArray.length !== Object.keys(planetResources).length) {
    let gear = 0;
    gearArray.length = 0;
    for (let item in planetResources) {
      gearArray.push(planetResources[item].resources.gear);
    }
    for (let i = Object.keys(planetResources).length - 1; i < Object.keys(planetResources).length; i++) {
      gear = Object.values(planetResources)[i].resources["gear"];
    }
    planetStore.getState().allResources.gear = allResources.gear + gear;
  }
};

let scienceArray = [];
const ScienceRresources = () => {
  const planetResources = planetStore((state) => state.planetResources);
  const allResources = planetStore((state) => state.allResources);

  if (scienceArray.length !== Object.keys(planetResources).length) {
    let science = 0;
    scienceArray.length = 0;
    for (let item in planetResources) {
      scienceArray.push(planetResources[item].resources.science);
    }
    for (let i = Object.keys(planetResources).length - 1; i < Object.keys(planetResources).length; i++) {
      science = Object.values(planetResources)[i].resources["science"];
    }
    planetStore.getState().allResources.science = allResources.science + science;
  }
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
