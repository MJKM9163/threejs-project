import { useFrame, useThree } from "@react-three/fiber";
import React, { memo, useCallback, useLayoutEffect, useRef, useState } from "react";
import { OBB } from "three/examples/jsm/math/OBB";

let a = 0;
let check = false;
let array = [];

export const Ttest = () => {
  const [render, setRender] = useState(false);
  const ref = useRef();
  const ref2 = useRef();
  const { clock } = useThree();
  useLayoutEffect(() => {
    ref.current.geometry.computeBoundingBox();
    ref2.current.geometry.computeBoundingBox();

    ref.current.geometry.userData.obb = new OBB().fromBox3(ref.current.geometry.boundingBox);
    ref2.current.geometry.userData.obb = new OBB().fromBox3(ref2.current.geometry.boundingBox);
    ref.current.userData.obb = new OBB();
    ref2.current.userData.obb = new OBB();
  }, []);

  const onAdd = useCallback(() => {
    setRender((value) => !value);
  }, []);

  useFrame(() => {
    ref.current.position.set(Math.sin(clock.getElapsedTime() * 1) * 1000, 0, -2800);

    ref.current.userData.obb.copy(ref.current.geometry.userData.obb);
    ref2.current.userData.obb.copy(ref2.current.geometry.userData.obb);
    ref.current.userData.obb.applyMatrix4(ref.current.matrixWorld);
    ref2.current.userData.obb.applyMatrix4(ref2.current.matrixWorld);
    if (ref.current.userData.obb.intersectsOBB(ref2.current.userData.obb)) {
      ref2.current.material.color.set(0xff0000);
      if (check === false) {
        console.log(a);
        a += 1;
        check = true;
      }
    } else {
      if (a === 5) {
        onAdd();
        array.push("비행기" + a);
        console.log(array);
        a = 0;
      }
      check = false;
      ref2.current.material.color.set("green");
    }
  });
  console.log(ref.current);

  return (
    <group>
      {array.map((item, index) => (
        <group key={index}>
          <mesh position={[1000, 0, -3000 + index * -200]}>
            <boxGeometry args={[500, 0, 500]} />
            <meshStandardMaterial wireframe opacity={0.5} transparent />
          </mesh>
          <mesh position={[-1000, 0, -3000 + index * -200]}>
            <boxGeometry args={[500, 0, 500]} />
            <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
          </mesh>
        </group>
      ))}
      <mesh ref={ref} position={[1000, 0, -2800]}>
        <boxGeometry args={[500, 0, 500]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent />
      </mesh>
      <mesh ref={ref2} position={[-1000, 0, -2800]}>
        <boxGeometry args={[500, 0, 500]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
      </mesh>
    </group>
  );
};

//export const MemoTtest = memo(Ttest);
