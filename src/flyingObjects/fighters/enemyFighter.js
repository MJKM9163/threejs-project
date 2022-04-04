import React, { memo, useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { effectSound } from "../../hooks/stores/effectSound";
import { boundingStore } from "../../hooks/stores/boundingStore";
import { Vector3 } from "three";
import { enemyDamageCalculation } from "../../hooks/damageCalculation";
import { EnemyDurabilityBar } from "../../hooks/DurabilityBar";

export const EnemyFighter = ({ position, rotation, num, adjust }) => {
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
  const weapons = boundingStore.getState().weapons;
  const durabilityDefault = boundingStore.getState().enemyData.basic.durability;
  const { nodes, materials } = useGLTF("flyingObjects/enemyFighter/scene.gltf");
  const missileModel = useGLTF("flyingObjects/projectiles/missile/scene.gltf");

  const [collideRef, collideApi] = useSphere(() => ({
    type: "Dynamic",
    mass: 100,
    position,
    rotation,
    args: [50],
    onCollide: (e) => {
      enemyDamageCalculation(num, e.body.name);
      const data = boundingStore.getState().enemyLive;

      if (data[num].durability <= 0) {
        effectSound.getState().fighter.FlightExplosionSound.action();
        data[num] = false;
        delete boundingStore.getState().fighter.enemy["전투기" + num];
        boundingStore.setState({ enemyLive: [...data] });
      }
    },
  }));

  const [missileRef, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [50000 * (num + 1), 0, 0],
    rotation: [0, -Math.PI / 2, 0],
    args: [10, 10, 10],
    onCollide: (e) => {
      missileRef.current.userData = true;
      missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
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

  let speedOnOff = false;
  let speed = 0;
  useFrame(() => {
    mlook.current.lookAt(collideRef.current.getWorldPosition(new Vector3()));
    if (BS.current.geometry.boundingSphere) {
      collideRef.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      collideRef.current.getWorldPosition(move.current.geometry.boundingSphere.center);
      if (FR === false) {
        FR = true;
        missileRef.current.name = { weapon: weapons.missile, source: "enemy", adjust: adjust };
        missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
      }
      boundingStore.getState().fighter.enemy = {
        ...fighter.enemy,
        ["전투기" + num]: move.current.geometry.boundingSphere,
      };
      if (boundingDetect()) {
        let [X, Y, Z] = moveFun();
        if (speedOnOff === false) {
          speedOnOff = true;
          let speedUp = setInterval(() => {
            speed += 0.03;
            if (speed >= 3) {
              clearInterval(speedUp);
            }
          }, 100);
        }
        collideApi.velocity.set(X < 1000 ? 0 : (X / 5) * speed, 0, X < 1000 ? 0 : (Z / 5) * speed);
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
          missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
        } else if (missileRef.current.userData === true) {
          clearInterval(run);
          missileRef.current.userData = false;
          launch = false;
          a = 0;
        }
      } else {
        missilesApi.position.set(...Object.values(mPosRef.current.getWorldPosition(new Vector3())));
        collideApi.velocity.set(
          ((BS.current.geometry.boundingSphere.center.x - 0) * -1) / 10,
          0,
          ((BS.current.geometry.boundingSphere.center.z - 0) * -1) / 10
        );
        look.current.lookAt(new Vector3(0, 0, 0));
        if (speedOnOff === true) {
          speedOnOff = false;
        }
      }
    }
  });

  return (
    <group>
      <group ref={collideRef} dispose={null}>
        <Html>
          <EnemyDurabilityBar num={num} name={"fighter"} d={durabilityDefault} />
        </Html>
        <mesh ref={move}>
          <sphereGeometry args={[100]} />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <mesh ref={BS}>
          <sphereGeometry args={[1500]} />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
        <group ref={look} rotation={[-Math.PI / 2, -Math.PI / 2, -Math.PI / 2]} scale={50}>
          {/* <axesHelper scale={50} /> */}
          <mesh ref={mPosRef} position={[0, 0, 3]}>
            <sphereGeometry args={[0]} />
            <meshStandardMaterial opacity={0} transparent />
          </mesh>
          <group position={[0, 0, 0]} rotation={[0, -Math.PI * 0.5, 0]}>
            <mesh geometry={nodes.defaultMaterial.geometry} material={materials.Northstar_L_chi_bang} />
            <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.Northstar_L_bo_li} />
            <mesh geometry={nodes.defaultMaterial_2.geometry} material={materials.Northstar_L_ji_cang} />
            <mesh geometry={nodes.defaultMaterial_3.geometry} material={materials.Northstar_L_ji_shen} />
          </group>
        </group>
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

export const MemoEnemyFighter = memo(EnemyFighter);
