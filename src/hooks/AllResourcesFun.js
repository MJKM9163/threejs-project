import React, { useEffect, useRef } from "react";
import { planetStore } from "./stores/planetStore";
import { researchStore } from "./stores/researchStore";
import { screenStore } from "./stores/screenStore";

let cycle;
let gearArray = [];
let scienceArray = [];
export const AllResourcesFun = () => {
  const allResources = useRef(planetStore.getState().allResources);
  const researchResources = useRef(researchStore.getState().researchResources.food);
  const planetResources = planetStore((state) => state.planetResources);

  useEffect(() => {
    planetStore.subscribe(
      (state) => (allResources.current = state.allResources),
      (state) => state
    );
  });
  useEffect(() => {
    researchStore.subscribe(
      (state) => (researchResources.current = state.researchResources.food),
      (state) => state
    );
  });

  const FoodResources = () => {
    clearInterval(cycle);
    cycle = setInterval(() => {
      let hPercent;
      switch (true) {
        case planetStore.getState().allResources.happiness >= 95:
          hPercent = 150;
          break;
        case planetStore.getState().allResources.happiness >= 70:
          hPercent = 120;
          break;
        case planetStore.getState().allResources.happiness >= 40:
          hPercent = 100;
          break;
        case planetStore.getState().allResources.happiness >= 25:
          hPercent = 80;
          break;
        case planetStore.getState().allResources.happiness >= 0:
          hPercent = 50;
          break;
        default:
          hPercent = 20;
          break;
      }
      for (let item in planetResources) {
        planetStore.getState().allResources.food +=
          ((planetResources[item].resources.food + researchResources.current) * hPercent) / 100;
      }
      planetStore.setState({
        allResources: { ...allResources.current },
      });
    }, 500);
  };

  let gear = 0;
  const GearRresources = () => {
    if (gearArray.length !== Object.keys(planetResources).length) {
      gearArray.length = 0;
      for (let item in planetResources) {
        gearArray.push(planetResources[item].resources.gear);
      }
      for (let i = Object.keys(planetResources).length - 1; i < Object.keys(planetResources).length; i++) {
        gear = Object.values(planetResources)[i].resources["gear"];
      }
      planetStore.getState().allResources.gear = allResources.current.gear + gear;
    }
  };

  let science = 0;
  const ScienceRresources = () => {
    if (scienceArray.length !== Object.keys(planetResources).length) {
      scienceArray.length = 0;
      for (let item in planetResources) {
        scienceArray.push(planetResources[item].resources.science);
      }
      for (let i = Object.keys(planetResources).length - 1; i < Object.keys(planetResources).length; i++) {
        science = Object.values(planetResources)[i].resources["science"];
      }
      planetStore.getState().allResources.science = allResources.current.science + science;
    }
    //console.log("과학 랜더링");
  };

  const TitaniumRresources = () => {
    planetStore.getState().allResources.titanium = 0;
    for (let item in planetResources) {
      planetStore.getState().allResources.titanium += planetResources[item].resources.titanium;
    }
    console.log("티타늄 랜더링");
  };

  const OrichalconRresources = () => {
    planetStore.getState().allResources.orichalcon = 0;
    for (let item in planetResources) {
      planetStore.getState().allResources.orichalcon += planetResources[item].resources.orichalcon;
    }
    console.log("오리하르콘 랜더링");
  };

  FoodResources();
  GearRresources();
  ScienceRresources();
  //TitaniumRresources();
  //OrichalconRresources();
  //console.log("자원 업데이트 함수");
  return null;
};

//export const MemoAllResourcesFun = memo(AllResourcesFun);
