import React, { memo, useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Vector3 } from "three";

let enemyFighterOption = {
  0: { R: 0, D: 100 },
  1: { R: 0, D: 100 },
  2: { R: 0, D: 100 },
  3: { R: 0, D: 100 },
  4: { R: 0, D: 100 },
  5: { R: 0, D: 100 },
  6: { R: 0, D: 100 },
  7: { R: 0, D: 100 },
  8: { R: 0, D: 100 },
  9: { R: 0, D: 100 },
};

export const EnemyFighter = ({ args, position, rotation, num }) => {
  let FR = false;
  let launch = false;
  let a = 0;
  let run;

  let MTime = () => {
    run = setTimeout(() => {
      a += 1;
      if (a < 3) {
        MTime(true);
      }
    }, 1000);
  };

  const mPosRef = useRef();
  const look = useRef();
  const mlook = useRef();
  const move = useRef();
  const BS = useRef();
  const { clock } = useThree();
  const fighter = boundingStore.getState().fighter;
  const { nodes, materials } = useGLTF("flyingObjects/enemyFighter/scene.gltf");
  const missileModel = useGLTF("flyingObjects/projectiles/explosive/scene.gltf");

  let mPos = new Vector3();

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [args + 75],
    onCollide: (e) => {
      console.log("타격 입음!");
      enemyFighterOption[num].D -= 50;
      console.log(enemyFighterOption[num].D);
      if (enemyFighterOption[num].D <= 0) {
        const data = boundingStore.getState().enemyNum;
        boundingStore.setState({ enemyNum: data.filter((item) => data[num] !== item) });
      }
      //effectSound.getState().fighter.FlightExplosionSound.action();
    },
  }));
  //[0, 0, 200000 + num * 1000]
  const [missileRef, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [500, 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [10, 10, 10],
    onCollide: (e) => {
      missileRef.current.userData = true;
      mPosRef.current.getWorldPosition(mPos);
      missilesApi.position.set(...Object.values(mPos));
      missilesApi.rotation.set(0, -Math.PI / 2, 0);
    },
  }));

  let boundingDetect = () => {
    let boundingArray = boundingStore.getState().fighter.friendly;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        look.current.children[1].rotation.set(0, -Math.PI / 2, 0);
        look.current.lookAt(boundingArray[key].center);
        mlook.current.lookAt(boundingArray[key].center);
        return check;
      }
    }
  };

  let moveFun = () => {
    let xPos;
    let yPos;
    let zPos;
    let boundingArray = boundingStore.getState().fighter.friendly;
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
    //collideApi.velocity.set(Math.sin(clock.getElapsedTime() * 2) * -3500, 0, 0); // 가속!
    missilesApi.rotation.set(0, -Math.PI / 2, 0);
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      collideRef.current.getWorldPosition(move.current.geometry.boundingSphere.center);
      mPosRef.current.getWorldPosition(mPos);
      if (FR === false) {
        FR = true;
        missilesApi.position.set(...Object.values(mPos));
      }
      boundingStore.getState().fighter.enemy = {
        ...fighter.enemy,
        ["전투기" + num]: move.current.geometry.boundingSphere,
      };
      if (boundingDetect()) {
        let [X, Y, Z] = moveFun();
        collideApi.velocity.set(X / 10, 0, Z / 10);
        missilesApi.velocity.set(X * 1, Y * 1, Z * 1);

        BS.current.material.color.set("yellow");

        if (launch === false) {
          launch = true;
          a = 0;
          MTime();
        }

        if (a === 3) {
          clearInterval(run);
          launch = false;
          a = 0;
          missilesApi.position.set(...Object.values(mPos));
        } else if (missileRef.current.userData === true) {
          clearInterval(run);
          missileRef.current.userData = false;
          launch = false;
          a = 0;
        }
      } else {
        missilesApi.position.set(...Object.values(mPos));
        BS.current.material.color.set("blue");
      }
    }
  });

  console.log("적 비행기");
  return (
    <group>
      <group ref={collideRef} dispose={null}>
        <mesh ref={move}>
          <sphereGeometry args={[100]} />
          <meshStandardMaterial wireframe opacity={0.1} transparent />
        </mesh>
        <mesh ref={BS}>
          <sphereGeometry args={[800]} />
          <meshStandardMaterial wireframe opacity={0.2} transparent />
        </mesh>
        <group ref={look} rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]} scale={100}>
          {/* <axesHelper scale={50} /> */}
          <mesh ref={mPosRef} position={[0, 0, 3]}>
            <sphereGeometry args={[0]} />
            <meshStandardMaterial wireframe opacity={1} transparent />
          </mesh>
          <group position={[0, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
            <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Northstar_L_chi_bang} />
            <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Northstar_L_bo_li} />
            <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Northstar_L_ji_cang} />
            <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Northstar_L_ji_shen} />
          </group>
        </group>
      </group>

      <group ref={missileRef} dispose={null}>
        <group position={[-200, 0, 50]} rotation={[-Math.PI / 2, 0, 0]}>
          <group ref={mlook} position={[387.34, -175.97, 15.53]} rotation={[1.47, 0.76, 0.07]} />
          <mesh geometry={missileModel.nodes.Material2.geometry} material={missileModel.materials.auto_13} />
          <mesh
            geometry={missileModel.nodes.Material2_1.geometry}
            material={missileModel.materials.auto_14}
          />
          <mesh
            geometry={missileModel.nodes.Material2_2.geometry}
            material={missileModel.materials.auto_16}
          />
          <lineSegments
            geometry={missileModel.nodes.Material2_3.geometry}
            material={missileModel.nodes.Material2_3.material}
          />
        </group>
      </group>
    </group>
  );
};

export const MemoEnemyFighter = memo(EnemyFighter);
