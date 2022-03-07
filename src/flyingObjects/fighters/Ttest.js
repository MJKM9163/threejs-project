import { useFrame, useThree } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { boundingStore } from "../../hooks/stores/boundingStore";

let a = 0;
let num = 0;
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

  useEffect(() => {
    //boundingStore.getState().test.push(checkTestSphere);
  }, []);

  useFrame(() => {
    if (movingBoundingSphere.current.geometry.boundingSphere && checkTestSphere.current.geometry.boundingSphere) {
      movingBoundingSphere.current.geometry.boundingSphere.center = movinSphereGroup.current.position;
      checkTestSphere.current.geometry.boundingSphere.center = checkTestSphere.current.position;
    }

    movinSphereGroup.current.position.set(Math.sin(clock.getElapsedTime() * 2) * 3000, 0, -2800);

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
        array.push("비행기");
        onAdd();
        //refBsArray.current[num].current.geometry.boundingSphere.center = refArray.current[num].current.position;
        boundingStore.getState().test.push(refBsArray.current[num]);
        console.log(boundingStore.getState().test);
        num += 1;
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
