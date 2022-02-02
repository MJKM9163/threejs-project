import { Icosahedron, useCubeTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import { CubeTextureLoader, TextureLoader } from "three";

export const Galaxy = () => {
  const { scene } = useThree();
  console.log(scene);
  const loader = new CubeTextureLoader();
  //const loader = new TextureLoader();
  const texture = loader.load([
    "galaxy.jpg",
    "galaxy.jpg",
    "galaxy.jpg",
    "galaxy.jpg",
    "galaxy.jpg",
    "galaxy.jpg",
  ]);
  scene.background = texture;
  return null;
};
