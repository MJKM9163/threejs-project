import { useFrame, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useRef } from "react";
import { Vector3 } from "three";

export const RayCasters = () => {
  const directionPos = new Vector3(2, 1, 1).normalize();
  const originPos = new Vector3(0, 0, -4000);
  const { raycaster, camera, mouse, scene, size } = useThree();
  //raycaster.setFromCamera(mouse, Cpo);

  //raycaster.ray.origin = Cpo;
  raycaster.far = 10000;
  let intersects = raycaster.intersectObjects(scene.children, true);
  for (let item of intersects) {
    item.object.material.color.set("yellow");
    console.log(item);
  }
  //intersects[i].object.material.color.set("blue");
  //   origin : Vector3,
  //   direction : Vector3,
  //   near : Float,
  //   far : Float
  raycaster.set(originPos, directionPos);

  useFrame(() => {});

  return <arrowHelper scale={50} args={[raycaster.ray.direction, raycaster.ray.origin, 300, "aqua"]} />;
};
