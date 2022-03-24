import { useFrame, useThree } from "@react-three/fiber";
import React, { useLayoutEffect, useRef } from "react";
import { Vector3 } from "three";

export const RayCasters = () => {
  const directionPos = new Vector3(1, 0, 0).normalize();
  const originPos = new Vector3(0, 0, -5000);
  const { raycaster, camera, mouse, scene, size } = useThree();
  //raycaster.setFromCamera(mouse, Cpo);
  console.log(mouse);
  //raycaster.ray.origin = Cpo;
  raycaster.far = 10000;
  raycaster.setFromCamera(mouse, camera);
  let intersects = raycaster.intersectObjects(scene.children, true);
  for (let item of intersects) {
    item.object.material.color.set("yellow");
    //console.log(item);
  }
  //   origin : Vector3,
  //   direction : Vector3,
  //   near : Float,
  //   far : Float
  raycaster.set(originPos, directionPos);

  // useFrame(() => {
  //   //console.log(camera.position);

  //   raycaster.set(camera.position, mouse.normalize());
  // });

  return <arrowHelper scale={50} args={[raycaster.ray.direction, raycaster.ray.origin, 100, "aqua"]} />;
};
