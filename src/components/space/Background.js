import React, { useMemo, useRef } from "react";
import { TextureLoader } from "three";
import starField3 from "../../images/starField3.jpg";
import starField2 from "../../images/starField2.jpg";
import starField1 from "../../images/starField1.jpg";
import { KeyboardControls } from "../../hooks/keyboardControls";
import { useFrame, useThree } from "@react-three/fiber";

let x = -2000;
let z = -3000;
let x2 = 0;
let z2 = -50000;

export const Background = () => {
  const ref = useRef();
  const ref2 = useRef();

  const textureStarField1 = useMemo(
    () => new TextureLoader().load(starField1),
    []
  );
  const textureStarField2 = useMemo(
    () => new TextureLoader().load(starField2),
    []
  );
  const textureStarField3 = useMemo(
    () => new TextureLoader().load(starField3),
    []
  );

  const { camera } = useThree();
  const { moveForward, moveBackward, moveLeft, moveRight } = KeyboardControls();

  console.log("배경 랜더링");
  useFrame(() => {
    if (moveLeft === true && camera.position.x < 3000) {
      x -= 150;
      x2 += 10;
    } else if (moveRight === true && camera.position.x > -2500) {
      x += 150;
      x2 -= 10;
    }
    if (moveForward === true && camera.position.z < -2100) {
      z -= 100;
      z2 += 20;
    } else if (moveBackward === true && camera.position.z > -9800) {
      z += 100;
      z2 -= 20;
    }
    ref.current.position.x = x;
    ref.current.position.z = z;
    ref2.current.position.x = x2;
    ref2.current.position.z = z2;
  });

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -8000, 0]}>
        <planeGeometry attach="geometry" args={[1000000, 1000000]} />
        <meshBasicMaterial
          map={textureStarField1}
          opacity={0.3}
          attach="material"
          transparent
        />
      </mesh>
      <mesh
        ref={ref}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-2000, -7000, -3000]}
      >
        <planeGeometry attach="geometry" args={[1000000, 1000000]} />
        <meshBasicMaterial
          map={textureStarField2}
          opacity={0.3}
          attach="material"
          transparent
        />
      </mesh>
      <mesh
        ref={ref2}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -25000, -50000]}
      >
        <planeGeometry attach="geometry" args={[1000000, 1000000]} />
        <meshBasicMaterial
          map={textureStarField3}
          opacity={1}
          attach="material"
          transparent
        />
      </mesh>
    </group>
  );
};
