import { useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { OBB } from "three/examples/jsm/math/OBB";

let a = 0;
let num = 0;
let intersectsTestNum = 0;
let check = false;
let array = [];
let space = Array.from({ length: 2 }, (v, i) => i);
let BS = Array.from({ length: 2 }, (v, i) => i);

export const Ttest = () => {
  const [render, setRender] = useState(false);
  const allRef = useRef();
  const movinSphereGroup = useRef();
  const movingSphereRef = useRef();
  const movingBoundingSphere = useRef();
  const checkTestSphere = useRef();

  const { clock } = useThree();
  const refArray = useRef(space.map(() => React.createRef()));
  const refBsArray = useRef(BS.map(() => React.createRef()));

  const onAdd = useCallback(() => {
    setRender((value) => !value);
  }, []);

  //------------

  const intersectsTest = () => {
    for (let item of refArray.current) {
      if (item[intersectsTestNum].current === null) {
        break;
      }
      // for (let i = 0; i <) {

      // }
      item[intersectsTestNum].current.geometry.boundingSphere?.intersectsSphere();
      console.log(item);
    }

    //-------- 각 컴포넌트에서 비교하기
  };

  console.log(refArray);
  useFrame(() => {
    if (movingBoundingSphere.current.geometry.boundingSphere && checkTestSphere.current.geometry.boundingSphere) {
      movingBoundingSphere.current.geometry.boundingSphere.center = movinSphereGroup.current.position;
      checkTestSphere.current.geometry.boundingSphere.center = checkTestSphere.current.position;
    }

    movinSphereGroup.current.position.set(Math.sin(clock.getElapsedTime() * 1) * 3000, 0, -2800);

    if (
      movingBoundingSphere.current.geometry.boundingSphere?.intersectsSphere(checkTestSphere.current.geometry.boundingSphere)
    ) {
      movingSphereRef.current.material.color.set("aqua");
      if (check === false) {
        a += 1;
        check = true;
      }
    } else {
      if (a === 3 && array.length !== 2) {
        onAdd();
        num += 1;
        array.push("비행기" + num);
        a = 0;
      }
      check = false;
      movingSphereRef.current.material.color.set("white");
    }
  });

  return (
    <group ref={allRef}>
      {array.map((item, index) => (
        <group key={index} ref={refArray.current[index]} position={[1000 + index * -1000, 0, -2800]}>
          <mesh>
            <sphereGeometry args={[300]} />
            <meshStandardMaterial wireframe opacity={0.5} transparent />
          </mesh>
          <mesh ref={refBsArray.current[index]}>
            <sphereGeometry args={[300]} />
            <meshStandardMaterial wireframe opacity={0} transparent />
          </mesh>
        </group>
      ))}
      <mesh ref={checkTestSphere} position={[-1000, 0, -2800]}>
        <sphereGeometry args={[300]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
      </mesh>
      <group ref={movinSphereGroup} position={[1000, 0, -2800]}>
        <mesh ref={movingSphereRef}>
          <sphereGeometry args={[300]} />
          <meshStandardMaterial wireframe opacity={0.5} transparent />
        </mesh>
        <Sphere ref={movingBoundingSphere} args={[300]}>
          <meshStandardMaterial wireframe opacity={0} transparent />
        </Sphere>
      </group>
    </group>
  );
};

//export const MemoTtest = memo(Ttest);
