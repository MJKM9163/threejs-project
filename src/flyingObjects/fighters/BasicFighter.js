import React, { useEffect, useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Vector3 } from "three";
import { screenStore } from "../../hooks/stores/screenStore";
import { FighterDurabilityBar } from "../../hooks/DurabilityBar";
import { friendlyDamageCalculation } from "../../hooks/damageCalculation";

let friendlyFighterOption = {
  0: { R: 0, S: 0, SM: 0, SOO: false, SOOM: false },
  1: { R: 0, S: 0, SM: 0, SOO: false, SOOM: false },
  2: { R: 0, S: 0, SM: 0, SOO: false, SOOM: false },
};

export const BasicFighter = ({ position, rotation, num, adjust }) => {
  let FR = false;
  let launch = false;
  let selectCheck = false;
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
  const selectUnit = useRef();
  const flyingMovePos = useRef(screenStore.getState().flyingMovePos);
  const weapons = boundingStore.getState().weapons;
  const fighter = boundingStore.getState().fighter;
  const durabilityDefault = boundingStore.getState().friendlyData.basic.durability;
  const { nodes, materials } = useGLTF("flyingObjects/basicFighter/scene.gltf");
  const missileModel = useGLTF("flyingObjects/projectiles/missile/scene.gltf");

  useEffect(() => {
    screenStore.subscribe(
      (state) => (flyingMovePos.current = state.flyingMovePos),
      (state) => state
    );
  });

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [60],
    onCollide: (e) => {
      friendlyDamageCalculation(num, e.body.name);
      const data = boundingStore.getState().friendlyLive;

      if (data[num].durability <= 0) {
        effectSound.getState().fighter.FlightExplosionSound.action();
        data[num] = false;
        delete boundingStore.getState().fighter.friendly["전투기" + num];
        screenStore.setState((state) => {
          state.dataList.fighterPlane.completion = false;
          state.dataList.fighterPlane.repetition = true;
        });
        boundingStore.setState({ friendlyLive: [...data] });
      }
    },
  }));

  const [missileRef, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [500, 0, 0],
    rotation: [0, 0, 0],
    args: [10, 10, 10],
    onCollide: (e) => {
      missileRef.current.userData = true;
      missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
    },
  }));

  let boundingDetect = () => {
    let boundingArray = boundingStore.getState().fighter.enemy;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        look.current.children[1].rotation.set(-Math.PI / 2, 0, -Math.PI / 1);
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
    if (flyingMovePos.current[num] !== null) {
      xPos = (collideRef.current.getWorldPosition(new Vector3()).x - flyingMovePos.current[num].x) * -1;
      yPos = 0;
      zPos = (collideRef.current.getWorldPosition(new Vector3()).z - flyingMovePos.current[num].z) * -1;

      return [xPos, yPos, zPos];
    } else {
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
    }
  };

  useFrame(() => {
    mlook.current.lookAt(collideRef.current.getWorldPosition(new Vector3()));
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      collideRef.current.getWorldPosition(move.current.geometry.boundingSphere.center);
      if (FR === false) {
        FR = true;
        missileRef.current.name = { weapon: weapons.missile, source: "friendly", adjust: adjust };
        missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
      }
      boundingStore.getState().fighter.friendly = {
        ...fighter.friendly,
        ["전투기" + num]: move.current.geometry.boundingSphere,
      };

      if (flyingMovePos.current[num] !== null) {
        look.current.lookAt(flyingMovePos.current[num]);
        //missileRef.current.lookAt(flyingMovePos.current[num]);
        missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
        let [mX, mY, mZ] = moveFun();
        if (friendlyFighterOption[num].SOOM === false) {
          friendlyFighterOption[num].SOOM = true;
          let speedUpm = setInterval(() => {
            friendlyFighterOption[num].SM += 0.03;
            if (friendlyFighterOption[num].SM >= 3) {
              clearInterval(speedUpm);
            }
          }, 100);
        }
        collideApi.velocity.set(
          (mX > 3000 || mX < -3000 ? mX / 10 : mX / 5) * friendlyFighterOption[num].SM,
          0,
          (mZ > 3000 || mZ < -3000 ? mZ / 10 : mZ / 5) * friendlyFighterOption[num].SM
        );

        if ((mX > 0 ? mX < 500 : mX > -500) && (mZ > 0 ? mZ < 500 : mZ > -500)) {
          friendlyFighterOption[num].SM = 0;
          friendlyFighterOption[num].SOOM = false;
          const data = screenStore.getState().flyingMovePos;
          data[num] = null;
          screenStore.setState({ flyingMovePos: data });
        }
      } else {
        if (boundingDetect()) {
          let [X, Y, Z] = moveFun();
          if (friendlyFighterOption[num].SOO === false) {
            friendlyFighterOption[num].SOO = true;
            let speedUp = setInterval(() => {
              friendlyFighterOption[num].S += 0.03;
              if (friendlyFighterOption[num].S >= 3) {
                clearInterval(speedUp);
              }
            }, 100);
          }
          collideApi.velocity.set(
            X < 1000 ? 0 : (X / 5) * friendlyFighterOption[num].S,
            0,
            X < 1000 ? 0 : (Z / 5) * friendlyFighterOption[num].S
          );
          missilesApi.velocity.set(X * 2, 0, Z * 2);

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
            missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
          } else if (missileRef.current.userData === true) {
            clearInterval(run);
            missileRef.current.userData = false;
            launch = false;
            a = 0;
          }
        } else {
          friendlyFighterOption[num].SM = 0;
          missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
          collideApi.velocity.set(
            (mPosRef.current.getWorldPosition(new Vector3()).x -
              collideRef.current.getWorldPosition(new Vector3()).x) *
              3,
            0,
            (mPosRef.current.getWorldPosition(new Vector3()).z -
              collideRef.current.getWorldPosition(new Vector3()).z) *
              3
          );
          collideApi.rotation.set(0, (friendlyFighterOption[num].R += 0.01), 0);
          if (friendlyFighterOption[num].SOO === true) {
            friendlyFighterOption[num].SOO = false;
          }
        }
      }
    }
  });

  const RightClick = (e) => {
    if (selectUnit.current !== undefined && selectCheck) {
      selectCheck = false;
      screenStore.setState({ flyingMoveMapCheck: null });
      selectUnit.current.material.opacity = 0;
    }
  };

  document.addEventListener("contextmenu", RightClick);
  return (
    <group>
      <group ref={collideRef} dispose={null}>
        <Html>
          <FighterDurabilityBar num={num} name={"fighter"} d={durabilityDefault} />
        </Html>
        <mesh
          ref={selectUnit}
          onClick={(e) => {
            selectCheck = true;
            effectSound.getState().fighter.flightSelcts.action();
            screenStore.setState({ flyingMoveMapCheck: num });
            e.eventObject.material.opacity = 0.3;
          }}>
          <sphereGeometry args={[150]} />
          <meshStandardMaterial opacity={0} transparent color={"white"} />
        </mesh>
        <group ref={look} rotation={[0, 0, 0]} scale={10}>
          <mesh ref={mPosRef} position={[0, 0, 8]}>
            <sphereGeometry args={[0]} />
            <meshStandardMaterial opacity={0} transparent />
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
        <mesh ref={move}>
          <sphereGeometry args={[100]} />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <mesh ref={BS}>
          <sphereGeometry args={[1500]} />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
      </group>
      <group ref={missileRef} scale={1} dispose={null}>
        <group ref={mlook} position={[0, 0, 0.44]} rotation={[Math.PI, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <mesh
              geometry={missileModel.nodes.Object_4.geometry}
              material={missileModel.materials.MissileBlue}
            />
            <mesh
              geometry={missileModel.nodes.Object_5.geometry}
              material={missileModel.materials.MissileDarkBlue}
            />
            <mesh
              geometry={missileModel.nodes.Object_6.geometry}
              material={missileModel.materials.BareMetal}
            />
            <group rotation={[0, Math.PI / 4, 0]}>
              <mesh
                geometry={missileModel.nodes.Object_8.geometry}
                material={missileModel.nodes.Object_8.material}
              />
            </group>
            <group position={[-0.03, 0.02, -0.03]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]}>
              <mesh
                geometry={missileModel.nodes.Object_10.geometry}
                material={missileModel.nodes.Object_10.material}
              />
            </group>
            <group position={[-0.03, 0.02, -0.03]} rotation={[-Math.PI, -Math.PI / 4, -Math.PI]}>
              <mesh
                geometry={missileModel.nodes.Object_12.geometry}
                material={missileModel.nodes.Object_12.material}
              />
            </group>
            <group position={[-0.03, 0.02, -0.03]} rotation={[0, -Math.PI / 4, 0]}>
              <mesh
                geometry={missileModel.nodes.Object_14.geometry}
                material={missileModel.nodes.Object_14.material}
              />
            </group>
            <group position={[0, 40.32, 0]} rotation={[0, Math.PI / 4, 0]}>
              <mesh
                geometry={missileModel.nodes.Object_16.geometry}
                material={missileModel.nodes.Object_16.material}
              />
            </group>
            <group position={[0, 40.32, 0]} rotation={[0, -Math.PI / 4, 0]}>
              <mesh
                geometry={missileModel.nodes.Object_18.geometry}
                material={missileModel.nodes.Object_18.material}
              />
            </group>
            <group position={[0, 40.32, 0]} rotation={[-Math.PI, -Math.PI / 4, -Math.PI]}>
              <mesh
                geometry={missileModel.nodes.Object_20.geometry}
                material={missileModel.nodes.Object_20.material}
              />
            </group>
            <group position={[0, 40.32, 0]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]}>
              <mesh
                geometry={missileModel.nodes.Object_22.geometry}
                material={missileModel.nodes.Object_22.material}
              />
            </group>
            <group position={[0, 44.98, 0]} rotation={[-Math.PI, Math.PI / 4, -Math.PI]}>
              <mesh
                geometry={missileModel.nodes.Object_24.geometry}
                material={missileModel.nodes.Object_24.material}
              />
            </group>
            <group position={[0, 44.98, 0]} rotation={[0, Math.PI / 4, 0]}>
              <mesh
                geometry={missileModel.nodes.Object_26.geometry}
                material={missileModel.nodes.Object_26.material}
              />
            </group>
            <group position={[0, 44.98, 0]} rotation={[0, -Math.PI / 4, 0]}>
              <mesh
                geometry={missileModel.nodes.Object_28.geometry}
                material={missileModel.nodes.Object_28.material}
              />
            </group>
            <group position={[0, 44.98, 0]} rotation={[-Math.PI, -Math.PI / 4, -Math.PI]}>
              <mesh
                geometry={missileModel.nodes.Object_30.geometry}
                material={missileModel.nodes.Object_30.material}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
