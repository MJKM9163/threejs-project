import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { useStore } from "../hooks/useStore";
import { Camera } from "./Camera";
import StartSpaceShip from "./StartSpaceShip";
import { OrbitControls } from "@react-three/drei";

export const Start = () => {
  const setMove = useStore((state) => state.setSpaceShipMove);
  const spaceShipMove = useStore((state) => state.spaceShipMove);
  const setRender = useStore((state) => state.setSpaceShipRender);
  const render = useStore((state) => state.spaceShipRender);
  const setStartRender = useStore((state) => state.setStartRender);
  const setEventCheck = useStore((state) => state.setEventChecker);
  const ref = useRef();

  const [cameraTarget, setCameraTarget] = useState([300, 1500, 1500]);
  if (render === false) {
    ref.current?.position.set(0, 0, 0);
  }
  let a = 0.28;
  let b = 2.3;

  useFrame(() => {
    a += a;
    b += b;
    if (spaceShipMove[1] > -1480) {
      setMove(
        spaceShipMove[0] - a,
        spaceShipMove[1] - b,
        spaceShipMove[2] - (b - 0.19)
      );
      ref.current?.position.set(
        spaceShipMove[0],
        spaceShipMove[1],
        spaceShipMove[2]
      );
    } else if (spaceShipMove[1] <= -1480) {
      setRender(true);
      setEventCheck(true);
      setTimeout(() => {
        setEventCheck(false);
        setStartRender(false);
      }, 3000);
    }
    if (render === true) {
      ref.current?.position.set(
        spaceShipMove[0],
        spaceShipMove[1],
        spaceShipMove[2]
      );
      a = 0;
      b = 0;
      if (cameraTarget !== [100, 0, 50]) {
        setCameraTarget([100, 0, 50]);
      }
    }

    console.log(ref.current?.position);
  });

  //console.log(spaceShipMove[1]);
  return (
    <>
      <group ref={ref}>
        <Camera />
        <OrbitControls
          target={cameraTarget}
          enableZoom={false}
          enablePan={false}
        />
        {render ? null : <StartSpaceShip />}
      </group>
    </>
  );
};
