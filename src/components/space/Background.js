import React, { memo, useMemo, useRef } from "react";
import { TextureLoader } from "three";
import starField3 from "../../images/starField3.jpg";
import starField2 from "../../images/starField2.jpg";
import starField1 from "../../images/starField1.jpg";
import { KeyboardControls } from "../../hooks/keyboardControls";
import { useFrame } from "@react-three/fiber";

let x = -2000;
let z = -3000;
let x2 = 0;
let z2 = -50000;

export const Background = () => {
  const back1 = useRef();
  const back2 = useRef();

  const textureStarField1 = useMemo(() => new TextureLoader().load(starField1), []);
  const textureStarField2 = useMemo(() => new TextureLoader().load(starField2), []);
  const textureStarField3 = useMemo(() => new TextureLoader().load(starField3), []);
  const { moveForward, moveBackward, moveLeft, moveRight } = KeyboardControls();

  useFrame(() => {
    if (moveLeft && x > -5000) {
      x -= 100;
      x2 += 10;
    } else if (moveRight && x < 1000) {
      x += 100;
      x2 -= 10;
    }
    if (moveForward && z > -7000) {
      z -= 100;
      z2 += 20;
    } else if (moveBackward && z < 0) {
      z += 100;
      z2 -= 20;
    }
    back1.current.position.x = x;
    back1.current.position.z = z;
    back2.current.position.x = x2;
    back2.current.position.z = z2;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8000, 0]}>
        <planeGeometry attach="geometry" args={[1000000, 1000000]} />
        <meshBasicMaterial map={textureStarField1} opacity={0.3} attach="material" transparent />
      </mesh>
      <mesh ref={back1} rotation={[-Math.PI / 2, 0, 0]} position={[-2000, -1000, -5000]}>
        <planeGeometry attach="geometry" args={[500000, 500000]} />
        <meshBasicMaterial map={textureStarField2} opacity={0.1} attach="material" transparent />
      </mesh>
      <mesh ref={back2} rotation={[-Math.PI / 2, 0, 0]} position={[0, -25000, -50000]}>
        <planeGeometry attach="geometry" args={[1000000, 1000000]} />
        <meshBasicMaterial map={textureStarField3} opacity={1} attach="material" transparent />
      </mesh>
    </group>
  );
};

export const MemoBackground = memo(Background);
