import React, { useMemo } from "react";
import { usePlane } from "@react-three/cannon";
import { TextureLoader, RepeatWrapping } from "three";
import wasteland from "../images/wasteland.jpg";
import SpaceShip from "../models/spaceShip";
import Rock from "../models/rock";
import {
  MagicStone1,
  MagicStone2,
  MagicStone3,
  MagicStone4,
  MagicStone5,
} from "../models/stons/MagicStone";
import {
  BigStone1,
  BigStone2,
  BigStone3,
  BigStone4,
  BigStone5,
} from "../models/stons/BigStone";
import {
  MidStone1,
  MidStone2,
  MidStone3,
  MidStone4,
  MidStone5,
  MidStone6,
} from "../models/stons/MidStone";
import {
  SmallStone1,
  SmallStone2,
  SmallStone3,
  SmallStone4,
  SmallStone5,
  SmallStone6,
} from "../models/stons/SmallStone";

const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const texture = useMemo(() => new TextureLoader().load(wasteland), []);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 4);

  return (
    <>
      <SpaceShip
        scale={0.1}
        rotation={[1.2, 0.75, 0.5]}
        position={[100, 21, 80]}
      />
      <group name="MagicStone">
        <MagicStone1 scale={3} rotationZ={0.6} position={[-3.5, 0, -11.5]} />
        <MagicStone2 scale={3} rotationZ={-0.8} position={[-100, 0, 25]} />
        <MagicStone3 scale={3} rotationZ={0.2} position={[120.5, 0, -53]} />
        <MagicStone4 scale={3} rotationZ={2} position={[-52, 0, -148.5]} />
        <MagicStone5 scale={3} rotationZ={-0.8} position={[111, 54.5, -91]} />
      </group>
      <axesHelper scale={300} />
      <group name="Stone">
        <BigStone1 scale={10} position={[280, -5, 40]} />
        <BigStone2 scale={8} position={[150, 0, 40]} />
        <BigStone3 scale={13} position={[-80, 0, 0]} />
        <BigStone4 scale={11} position={[-200, 0, 120]} />
        <BigStone5 scale={11} position={[-51, 0, -21]} />
        <MidStone1 scale={7} position={[20, 0, -60]} />
        <MidStone2 scale={10} position={[0, 0, 75]} />
        <MidStone3 scale={10} position={[-50, 0, 105]} />
        <MidStone4 scale={10} position={[-170, 0, 40]} />
        <MidStone5 scale={10} position={[0, 0, 150]} />
        <MidStone6 scale={10} position={[-150, 0, -30]} />
        <SmallStone1 scale={10} position={[100, -5, -50]} />
        <SmallStone2 scale={15} position={[150, -2, -180]} />
        <SmallStone3
          name="퀘스트 바위"
          scale={13}
          position={[180, -3, 5]}
          rotationZ={3.6}
        />
        <SmallStone4 scale={15} position={[10, -3, -150]} rotationZ={1.6} />
        <SmallStone5 scale={12} position={[-20, -2, 60]} rotationZ={3.7} />
        <SmallStone6 scale={20} position={[-60, -7, -100]} rotationZ={3.7} />
      </group>
      <group name="starting">
        <mesh ref={ref} receiveShadow>
          <planeBufferGeometry attach="geometry" args={[350, 350]} />
          <meshStandardMaterial map={texture} attach="material" />
        </mesh>
      </group>
    </>
  );
};

export default React.memo(Ground);
