import React, { useEffect, useRef } from "react";
import { planetStore } from "./stores/planetStore";

let cycle;
let gearArray = [];
let scienceArray = [];
export const AllResourcesFun = () => {
  const allResourcesRef = useRef(planetStore.getState().allResources);
  const planetResources = planetStore((state) => state.planetResources);

  useEffect(() => {
    planetStore.subscribe(
      (state) => (allResourcesRef.current = state.allResources),
      (state) => state
    );
  });

  const FoodResources = () => {
    clearInterval(cycle);
    cycle = setInterval(() => {
      for (let item in planetResources) {
        planetStore.getState().allResources.food += planetResources[item].resources.food;
      }
      planetStore.setState({
        allResources: { ...allResourcesRef.current },
      });
    }, 500);
  };

  const GearRresources = () => {
    if (gearArray.length !== Object.keys(planetResources).length) {
      let gear = 0;
      gearArray.length = 0;
      for (let item in planetResources) {
        gearArray.push(planetResources[item].resources.gear);
      }
      for (let i = Object.keys(planetResources).length - 1; i < Object.keys(planetResources).length; i++) {
        gear = Object.values(planetResources)[i].resources["gear"];
      }
      planetStore.getState().allResources.gear = allResourcesRef.current.gear + gear;
    }
  };

  const ScienceRresources = () => {
    if (scienceArray.length !== Object.keys(planetResources).length) {
      let science = 0;
      scienceArray.length = 0;
      for (let item in planetResources) {
        scienceArray.push(planetResources[item].resources.science);
      }
      for (let i = Object.keys(planetResources).length - 1; i < Object.keys(planetResources).length; i++) {
        science = Object.values(planetResources)[i].resources["science"];
      }
      planetStore.getState().allResources.science = allResourcesRef.current.science + science;
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
