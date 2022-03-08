import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Vector3 } from "three";

let a = 0;
let launch = false;

export default function EnemyFighter({ args, position, rotation, num }) {
  const group = useRef();
  const move = useRef();
  const BS = useRef();
  const { clock } = useThree();
  const fighter = boundingStore.getState().fighter;
  const { nodes, materials } = useGLTF("flyingObjects/enemyFighter/scene.gltf");

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [args],
    onCollide: (e) => {
      //effectSound.getState().fighter.FlightExplosionSound.action();
    },
  }));

  let boundingDetect = () => {
    let boundingArray = boundingStore.getState().fighter.friendly;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        //console.log(boundingArray[key].center);
        //collideApi.velocity.copy(boundingArray[key].current.geometry.boundingSphere.center);
        return check;
      }
    }
  };

  let moveFun = () => {
    let xPos;
    let zPos;
    let boundingArray = boundingStore.getState().fighter.friendly;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        if (
          (BS.current.geometry.boundingSphere.center.x < 0 && boundingArray[key].center.x < 0) ||
          (BS.current.geometry.boundingSphere.center.x > 0 && boundingArray[key].center.x > 0)
        ) {
          xPos = (BS.current.geometry.boundingSphere.center.x - boundingArray[key].center.x) * -1;
        } else {
          xPos = BS.current.geometry.boundingSphere.center.x - boundingArray[key].center.x;
        }

        if (
          (BS.current.geometry.boundingSphere.center.z < 0 && boundingArray[key].center.z < 0) ||
          (BS.current.geometry.boundingSphere.center.z > 0 && boundingArray[key].center.z > 0)
        ) {
          zPos = (BS.current.geometry.boundingSphere.center.z - boundingArray[key].center.z) * -1;
        } else {
          zPos = BS.current.geometry.boundingSphere.center.z - boundingArray[key].center.z;
        }
        return [xPos, zPos];
      }
    }
  };

  useFrame(() => {
    //collideApi.velocity.set(Math.sin(clock.getElapsedTime() * 1) * -1700, 0, 0); // 가속!
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.enemy = { ...fighter.enemy, ["전투기" + num]: BS.current.geometry.boundingSphere };
    }
    if (boundingDetect()) {
      let [X, Z] = moveFun();
      collideApi.velocity.set(X / 2, 0, Z / 2);
      move.current.material.color.set("yellow");
      if (launch === false) {
        launch = true;
        const MPos = new Vector3();
        collideRef.current.getWorldPosition(MPos);
        const add = boundingStore.getState().explosiveNum;
        boundingStore.setState({ explosiveNum: [...add, MPos] });
        setTimeout(() => {
          launch = false;
        }, 3000);
      }
    } else {
      collideApi.velocity.set(0, 0, 0);
      move.current.material.color.set("blue");
    }
  });

  return (
    <group ref={collideRef} dispose={null}>
      <axesHelper scale={1500} />
      <mesh ref={move}>
        <sphereGeometry args={[args + 500]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent color={"green"} />
      </mesh>
      <mesh ref={BS}>
        <sphereGeometry args={[args + 500]} />
        <meshStandardMaterial wireframe opacity={0} transparent />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Northstar_L_chi_bang} />
          <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Northstar_L_bo_li} />
          <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Northstar_L_ji_cang} />
          <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Northstar_L_ji_shen} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("flyingObjects/enemyFighter/scene.gltf");
