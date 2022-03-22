import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Vector3 } from "three";

let basicFighterOption = {
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

export const BasicFighter = ({ args, position, rotation, num }) => {
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
  const fighter = boundingStore.getState().fighter;
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");
  const missileModel = useGLTF("flyingObjects/projectiles/explosive/scene.gltf");

  let mPos = new Vector3();

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [args + 75],
    onCollide: (e) => {
      //effectSound.getState().fighter.FlightExplosionSound.action();
      console.log("타격 입음!");
      basicFighterOption[num].D -= 50;
      console.log(basicFighterOption[num].D);
      if (basicFighterOption[num].D <= 0) {
        const data = boundingStore.getState().friendlyNum;
        boundingStore.setState({ friendlyNum: [...data, (data[num] = false)] });
      }
    },
  }));

  const [missileRef, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [0, 500, 0],
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
    let boundingArray = boundingStore.getState().fighter.enemy;
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
    //collideApi.velocity.set(0, 0, Math.sin(clock.getElapsedTime() * 2) * -3500);
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      collideRef.current.getWorldPosition(move.current.geometry.boundingSphere.center);
      mPosRef.current.getWorldPosition(mPos);
      if (FR === false) {
        FR = true;
        missilesApi.position.set(...Object.values(mPos));
      }
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        ["전투기" + num]: move.current.geometry.boundingSphere,
      };
      if (boundingDetect()) {
        let [X, Y, Z] = moveFun();
        collideApi.velocity.set(X / 10, 0, Z / 10);
        missilesApi.velocity.set(X * 1, 0, Z * 1);

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

  console.log("비행체");
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
        <group ref={look} rotation={[0, 0, 0]} scale={20}>
          <axesHelper scale={50} />
          <mesh ref={mPosRef} position={[0, 0, 8]}>
            <sphereGeometry args={[0]} />
            <meshStandardMaterial wireframe opacity={1} transparent />
          </mesh>
          <group rotation={[-Math.PI * 0.5, -0, -Math.PI / 1]}>
            <mesh geometry={nodes["wave-material"].geometry} material={nodes["wave-material"].material} />
            <group scale={0.75}>
              <mesh
                geometry={nodes["wave-material_1"].geometry}
                material={nodes["wave-material_1"].material}
              />
            </group>
            <group scale={0.75}>
              <mesh
                geometry={nodes["wave-material_2"].geometry}
                material={nodes["wave-material_2"].material}
              />
            </group>
            <group scale={0.75}>
              <mesh
                geometry={nodes["wave-material_3"].geometry}
                material={nodes["wave-material_3"].material}
              />
            </group>
            <group
              position={[-2.66, -3.49, -1.8]}
              rotation={[0, Math.PI / 6, Math.PI]}
              scale={[0.75, 0.75, 0.75]}>
              <mesh
                geometry={nodes["landing-gear-material"].geometry}
                material={nodes["landing-gear-material"].material}
              />
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
      </group>
      <group ref={missileRef} dispose={null}>
        <group position={[-200, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
