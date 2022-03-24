import { useGLTF } from "@react-three/drei";
import React from "react";
import { Anemys } from "./Anemys";
import { FlyingMoveField } from "./FlyingMoveField";
import { Friendlys } from "./Friendlys";

export const FlyingIndex = () => {
  return (
    <group>
      <Friendlys />
      <Anemys />
      <FlyingMoveField />
    </group>
  );
};

useGLTF.preload("flyingObjects/enemyFighter/scene.gltf");
useGLTF.preload("flyingObjects/basicFighter/scene.gltf");
useGLTF.preload("flyingObjects/projectiles/explosive/scene.gltf");
