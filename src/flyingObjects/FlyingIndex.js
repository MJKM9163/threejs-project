import { useGLTF } from "@react-three/drei";
import React from "react";
import { Anemys } from "./Anemys";
import { Friendlys } from "./Friendlys";
import { MemoProjectileIndex, ProjectileIndex } from "./projectiles/ProjectileIndex";

export const FlyingIndex = () => {
  return (
    <group>
      <Friendlys />
      <Anemys />
      <ProjectileIndex />
    </group>
  );
};

useGLTF.preload("flyingObjects/enemyFighter/scene.gltf");
useGLTF.preload("flyingObjects/basicFighter/scene.gltf");
useGLTF.preload("flyingObjects/projectiles/explosive/scene.gltf");
