import React, { useEffect, useMemo, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useRaycastAny, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { ArrowHelper, Box3, BoxGeometry, Mesh, MeshBasicMaterial, Vector3 } from "three";

let a = -150;
let b = 0;
let intersects;

export const BasicFighter = ({ args, ...props }) => {
  const box = useRef();
  const test = useRef();
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");

  const [hitBoxRef, hitBoxApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 1,
    position: [800, 0, -1000],
    rotation: [0, Math.PI / 2, 0],
    args: [args],
    collisionResponse: 0,
    onCollide: (e) => {
      effectSound.getState().fighter.FlightExplosionSound.action();
      console.log("아군 비행기 충돌!");
      //hitBoxApi.position.set(800, 0, -1000);
      a = 0;
    },
    onCollideEnd: () => {
      console.log("충돌 끝");
    },
  }));

  const vector = new Vector3();
  useFrame(() => {
    hitBoxApi.velocity.set(a, 0, 0); // 가속!
    hitBoxRef.current?.getWorldPosition(vector);
  });
  const { raycaster, camera, mouse, scene, size } = useThree();

  function raycast(e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    console.log(raycaster.ray);
    console.log(raycaster.ray.origin);
    //raycaster.ray.origin.set(1000, 1000, 1000);
    raycaster.far = 10000;
    console.log(raycaster.near);
    // origin,
    // direction,
    // near,
    // far
    let intersects = raycaster.intersectObjects(scene.children, true);

    for (var i = 0; i < intersects.length; i++) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      let intersects = raycaster.intersectObjects(scene.children);
      intersects[i].object.material.color.set("blue");
      console.log(intersects[i]);
    }
    console.log(intersects);
  }
  document.addEventListener("click", raycast, false);

  // console.log(size);
  // window.addEventListener("mousemove", (event) => {
  //   mouse.x = (event.clientX / size.width) * 2 - 1;
  //   mouse.y = -(event.clientY / size.height) * 2 + 1;

  //   console.log(mouse);
  //   console.log(intersects);
  // });
  // const rayOrigin = new Vector3(-3, 0, 0);
  // const rayDirection = new Vector3(10, 0, 0);
  // rayDirection.normalize();
  // raycaster.set(rayOrigin, rayDirection);
  // console.log(raycaster);
  // console.log(raycaster.set);
  // console.log(raycaster.ray);
  // raycaster.setFromCamera(mouse, camera);

  // //raycaster.intersectObject(box.current);
  // // let array = [];
  // if (box.current !== undefined) {
  //   //array.push(box.current);
  //   intersects = raycaster.intersectObjects(scene.children, true);
  //   console.log(intersects);
  //   for (const intersect of intersects) {
  //     intersect.object.material.color.set("#0000ff");
  //   }
  //   for (let i = 0; i < intersects.length; i++) {
  //     intersects[i].object.material.color.set("blue");
  //   }
  // }

  console.log("비행체");
  return (
    <group ref={hitBoxRef} dispose={null}>
      <mesh ref={box}>
        <sphereGeometry args={[650]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent />
      </mesh>
      <mesh ref={test}>
        <sphereGeometry args={[400]} />
        <meshStandardMaterial wireframe opacity={0.5} transparent />
      </mesh>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={20}>
        <mesh geometry={nodes["wave-material"].geometry} material={nodes["wave-material"].material} />
        <group scale={0.75}>
          <mesh geometry={nodes["wave-material_1"].geometry} material={nodes["wave-material_1"].material} />
        </group>
        <group scale={0.75}>
          <mesh geometry={nodes["wave-material_2"].geometry} material={nodes["wave-material_2"].material} />
        </group>
        <group scale={0.75}>
          <mesh geometry={nodes["wave-material_3"].geometry} material={nodes["wave-material_3"].material} />
        </group>
        <group position={[-2.66, -3.49, -1.8]} rotation={[0, Math.PI / 6, Math.PI]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material"].geometry} material={nodes["landing-gear-material"].material} />
        </group>
        <group position={[-2.66, -3.49, -1.87]} rotation={[0, Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material_1"].geometry} material={nodes["landing-gear-material_1"].material} />
        </group>
        <group position={[0, -0.94, -2.09]} scale={0.75}>
          <mesh geometry={nodes["landing-gear-material_2"].geometry} material={nodes["landing-gear-material_2"].material} />
        </group>
        <group position={[2.65, -3.49, -1.8]} rotation={[0, -Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material_3"].geometry} material={nodes["landing-gear-material_3"].material} />
        </group>
        <group position={[2.65, -3.49, -1.87]} rotation={[0, -Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
          <mesh geometry={nodes["landing-gear-material_4"].geometry} material={nodes["landing-gear-material_4"].material} />
        </group>
        <mesh geometry={nodes["glow-material"].geometry} material={materials.glow} />
        <group position={[-6.59, -9.24, 0.97]} rotation={[0, 0.55, 0]}>
          <mesh geometry={nodes.Object_23.geometry} material={nodes.Object_23.material} />
        </group>
        <group position={[6.59, -9.24, 0.97]} rotation={[0, -0.55, 0]}>
          <mesh geometry={nodes.Object_25.geometry} material={nodes.Object_25.material} />
        </group>
      </group>
    </group>
  );
};
useGLTF.preload("flyingObjects/basicFighter/scene.gltf");
