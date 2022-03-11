import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Vector3 } from "three";

export const BasicFighter = ({ args, position, mPos, rotation, num }) => {
  let launch = false;
  let MTime;
  let a = 0;
  const move = useRef();
  const BS = useRef();
  const fighter = boundingStore.getState().fighter;
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");
  const missileModel = useGLTF("flyingObjects/projectiles/explosive/scene.gltf");
  const { raycaster, scene, clock } = useThree();

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [args],
    onCollide: (e) => {
      //effectSound.getState().fighter.FlightExplosionSound.action();
      //console.log("아군 비행기 충돌!");
      //collideApi.position.set();
    },
  }));

  const [missileRef, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: mPos,
    rotation: [0, -Math.PI / 2, 0],
    args: [10, 10, 50],
    onCollide: (e) => {
      clearInterval(MTime);
      launch = false;
      let pos = new Vector3(0, 500, 0);
      pos.add(BS.current.geometry.boundingSphere.center);
      //effectSound.getState().fighter.FlightExplosionSound.action();
      missilesApi.position.set(...Object.values(pos));
      missilesApi.rotation.set(0, -Math.PI / 2, 0);
    },
  }));

  let boundingDetect = () => {
    let boundingArray = boundingStore.getState().fighter.enemy;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        return check;
      }
    }
  };

  let moveFun = () => {
    let xPos;
    let yPos;
    let zPos;
    let boundingArray = boundingStore.getState().fighter.enemy;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        xPos = (BS.current.geometry.boundingSphere.center.x - boundingArray[key].center.x) * -1;
        yPos = (missileRef.current.position.y - boundingArray[key].center.y) * -1;
        zPos = (BS.current.geometry.boundingSphere.center.z - boundingArray[key].center.z) * -1;

        return [xPos, yPos, zPos];
      }
    }
  };

  useFrame(() => {
    //collideApi.velocity.set(0, 0, Math.sin(clock.getElapsedTime() * 1) * 1800);
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      collideRef.current.getWorldPosition(move.current.geometry.boundingSphere.center);
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        ["전투기" + num]: move.current.geometry.boundingSphere,
      };
      if (boundingDetect()) {
        let [X, Y, Z] = moveFun();
        collideApi.velocity.set(X / 10, 0, Z / 10);
        missilesApi.velocity.set(X * 3.5, Y * 3.5, Z * 3.5);

        BS.current.material.color.set("yellow");

        if (launch === false) {
          MTime = setInterval(() => {
            a += 1;
            console.log("인터벌 타임 실행 중...");
          }, 1000);
          launch = true;
        }
        if (a === 3) {
          clearInterval(MTime);
          a = 0;
          launch = false;
          missilesApi.position.set(
            ...collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center).add(new Vector3(0, 500, 0))
          );
        }
      } else {
        //collideApi.velocity.set(0, 0, Math.sin(clock.getElapsedTime() * 1) * 500);
        //collideApi.velocity.set(0, 0, 0);.
        missilesApi.position.set(
          ...collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center).add(new Vector3(0, 500, 0))
        );
        BS.current.material.color.set("blue");
      }
    }
  });

  console.log("비행체");
  return (
    <group>
      <group ref={collideRef} dispose={null}>
        <mesh ref={move}>
          <sphereGeometry args={[args + 100]} />
          <meshStandardMaterial wireframe opacity={0.1} transparent />
        </mesh>
        <mesh ref={BS}>
          <sphereGeometry args={[args + 2500]} />
          <meshStandardMaterial wireframe opacity={0.2} transparent />
        </mesh>
        <group rotation={[-Math.PI / 2, 0, Math.PI / 2]} scale={20}>
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
            <mesh
              geometry={nodes["landing-gear-material_1"].geometry}
              material={nodes["landing-gear-material_1"].material}
            />
          </group>
          <group position={[0, -0.94, -2.09]} scale={0.75}>
            <mesh
              geometry={nodes["landing-gear-material_2"].geometry}
              material={nodes["landing-gear-material_2"].material}
            />
          </group>
          <group position={[2.65, -3.49, -1.8]} rotation={[0, -Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
            <mesh
              geometry={nodes["landing-gear-material_3"].geometry}
              material={nodes["landing-gear-material_3"].material}
            />
          </group>
          <group position={[2.65, -3.49, -1.87]} rotation={[0, -Math.PI / 6, 0]} scale={[0.75, 0.75, 0.75]}>
            <mesh
              geometry={nodes["landing-gear-material_4"].geometry}
              material={nodes["landing-gear-material_4"].material}
            />
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
      <group ref={missileRef} dispose={null}>
        <group position={[-200, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[387.34, -175.97, 15.53]} rotation={[1.47, 0.76, 0.07]} />
          <mesh geometry={missileModel.nodes.Material2.geometry} material={missileModel.materials.auto_13} />
          <mesh geometry={missileModel.nodes.Material2_1.geometry} material={missileModel.materials.auto_14} />
          <mesh geometry={missileModel.nodes.Material2_2.geometry} material={missileModel.materials.auto_16} />
          <lineSegments
            geometry={missileModel.nodes.Material2_3.geometry}
            material={missileModel.nodes.Material2_3.material}
          />
        </group>
      </group>
    </group>
  );
};
