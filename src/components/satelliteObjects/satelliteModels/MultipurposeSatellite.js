import React, { useRef, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useBox, useSphere } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import styled from "styled-components";
import { boundingStore } from "../../../hooks/stores/boundingStore";
import { Vector3 } from "three";
import { SatelliteDurabilityBar } from "../../../hooks/DurabilityBar";
import { screenStore } from "../../../hooks/stores/screenStore";
import { effectSound } from "../../../hooks/stores/effectSound";
import { satelliteDamageCalculation } from "../../../hooks/damageCalculation";
import { planetStore } from "../../../hooks/stores/planetStore";

const SelectSatellite = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  top: ${(props) => (props.check ? "-80px" : "100000px")};
  left: -114px;
  width: 225px;
  height: 63.25px;
  cursor: default;

  .sbox {
    position: relative;
    width: 112.5px;
    height: 63.25px;
    transition: 0.2s;

    :hover {
      background-color: #ffffff3d;
    }
    :active {
      background-color: #ffffff8d;
    }

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -2;
    }
    .text {
      position: absolute;
      width: 100%;
      bottom: 0px;
      text-align: center;
      color: white;
      background-color: #8080807d;
    }
  }
`;

let satelliteOption = {
  0: { R: 0, T: "multi" },
  1: { R: 0, T: "multi" },
  2: { R: 0, T: "multi" },
  3: { R: 0, T: "multi" },
  4: { R: 0, T: "multi" },
};

export function MultipurposeSatellite({ position, num, adjust }) {
  const { nodes } = useGLTF("/space/multipurposeSatellite/scene.gltf");
  const defense = useGLTF("/space/DefenseSatellite/scene.gltf");
  const dust = useGLTF("/space/dustExtractor/scene.gltf");
  const missileModel = useGLTF("flyingObjects/projectiles/missile/scene.gltf");

  let launch = false;
  let FR = false;
  let MTime;
  let a = 0;

  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Static",
    position,
    args: [70],
    onCollide: (e) => {
      satelliteDamageCalculation(num, e.body.name);
      const data = screenStore.getState().satellitePos;
      if (e.body.name === "enemybasic") {
        screenStore.setState((state) => (state.satellitePos[num].D -= 20));
      }
      if (data[num].data.durability <= 0) {
        effectSound.getState().fighter.FlightExplosionSound.action();
        screenStore.setState((state) => (state.dataList.multipurposeSatellite.count -= 1));
        delete boundingStore.getState().fighter.friendly["위성" + num];
        data.splice(num, 1);
        screenStore.setState({ satellitePos: [...data] });
      }
    },
  }));

  const [missileRef, missilesApi] = useBox(() => ({
    type: "Dynamic",
    mass: 1,
    position: [0, 0, 10000000 + num * 1000],
    rotation: [0, -Math.PI / 2, 0],
    args: [10, 10, 50],
    onCollide: (e) => {
      clearInterval(MTime);
      launch = false;
      let pos = new Vector3(0, 0, 0);
      pos.add(BS.current.geometry.boundingSphere.center);
      //effectSound.getState().fighter.FlightExplosionSound.action();
      missilesApi.position.set(...Object.values(pos));
      missilesApi.rotation.set(0, -Math.PI / 2, 0);
    },
  }));

  const weapons = boundingStore.getState().weapons;
  const core = useRef();
  const BS = useRef();
  const mlook = useRef();
  const [on, setOn] = useState(false);

  let boundingDetect = () => {
    let boundingArray = boundingStore.getState().fighter.enemy;
    for (let key in boundingArray) {
      const check = BS.current.geometry.boundingSphere?.intersectsSphere(boundingArray[key]);
      if (check === true) {
        mlook.current.lookAt(boundingArray[key].center);
        return check;
      }
    }
  };

  let boundingUpdate = () => {
    const fighter = boundingStore.getState().fighter;
    boundingStore.getState().fighter.friendly = {
      ...fighter.friendly,
      ["위성" + num]: core.current.geometry.boundingSphere,
    };
    if (FR === false) {
      FR = true;
      missileRef.current.name = { weapon: weapons.missile, source: "friendly", adjust: adjust };
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
        yPos = (BS.current.geometry.boundingSphere.center.y - boundingArray[key].center.y) * -1;
        zPos = (BS.current.geometry.boundingSphere.center.z - boundingArray[key].center.z) * -1;

        return [xPos, yPos, zPos];
      }
    }
  };

  useFrame(() => {
    mlook.current.lookAt(ref.current.getWorldPosition(new Vector3()));
    api.rotation.set(0, (satelliteOption[num].R += 0.01), 0);
    if (BS.current.geometry.boundingSphere) {
      ref.current.getWorldPosition(BS.current.geometry.boundingSphere.center);
      ref.current.getWorldPosition(core.current.geometry.boundingSphere.center);
      boundingUpdate();

      if (boundingDetect() && satelliteOption[num].T === "defense") {
        let [X, Y, Z] = moveFun();
        missilesApi.velocity.set(X * 2.5, Y * 2.5, Z * 2.5);
        if (launch === false) {
          MTime = setInterval(() => {
            a += 1;
          }, 1000);
          launch = true;
        }
        if (a === 3) {
          clearInterval(MTime);
          a = 0;
          launch = false;

          missilesApi.position.set(
            ...ref.current
              .getWorldPosition(BS.current.geometry.boundingSphere.center)
              .add(new Vector3(0, 0, 0))
          );
        }
      } else if (satelliteOption[num].T === "defense") {
        missilesApi.position.set(
          ...ref.current.getWorldPosition(BS.current.geometry.boundingSphere.center).add(new Vector3(0, 0, 0))
        );
      }
    }
  });

  return (
    <group>
      <group
        ref={ref}
        scale={1}
        position={position}
        dispose={null}
        onClick={(e) => {
          setOn(!on);
        }}>
        <Html>
          <SatelliteDurabilityBar num={num} name={"satellite"} d={200} />
        </Html>
        <mesh ref={core}>
          <sphereGeometry args={[50]} />
          <meshStandardMaterial wireframe opacity={0} transparent />
        </mesh>
        <mesh ref={BS}>
          <sphereGeometry args={[1600]} />
          <meshStandardMaterial attach="material" wireframe opacity={0} transparent />
        </mesh>
        {satelliteOption[num].T === "multi" ? (
          <group>
            <Html>
              <SelectSatellite check={on}>
                <div
                  className="sbox"
                  onClick={(e) => {
                    satelliteOption[num].T = "defense";
                    setOn(false);
                  }}>
                  <img
                    className="simage"
                    width={112.5}
                    height={63.25}
                    src="/images/production/defenseSatellite.png"
                    alt="방어 위성"></img>
                  <div className="text">행성 방어 위성</div>
                </div>
                <div
                  className="sbox"
                  onClick={(e) => {
                    satelliteOption[num].T = "dust";
                    planetStore.setState(
                      (state) => (state.planetResources[Object.keys(state.planetResources)[0]]["food"] += 2)
                    );
                    setOn(false);
                  }}>
                  <img
                    className="simage"
                    width={112.5}
                    height={63.25}
                    src="/images/production/dustExtractor.png"
                    alt="채칩 위성"></img>
                  <div className="text">먼지 추출기</div>
                </div>
              </SelectSatellite>
            </Html>
            <group scale={100} rotation={[-Math.PI / 2, 0, 0]}>
              <group rotation={[Math.PI / 2, 0, 0]}>
                <mesh geometry={nodes.defaultMaterial.geometry} material={nodes.defaultMaterial.material} />
                <mesh
                  geometry={nodes.defaultMaterial_1.geometry}
                  material={nodes.defaultMaterial_1.material}
                />
              </group>
            </group>
          </group>
        ) : null}

        {satelliteOption[num].T === "defense" ? (
          <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -200, 0]}>
            <group rotation={[Math.PI / 2, 0, 0]}>
              <group position={[0, 100, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 100]}>
                <mesh geometry={defense.nodes.Cube_beacon_0.geometry} material={defense.materials.beacon} />
              </group>
              <group position={[0, 200, 110.71]} rotation={[-Math.PI / 2, 0, 0]} scale={18.59}>
                <mesh geometry={defense.nodes.Sphere_eye_0.geometry} material={defense.materials.material} />
              </group>
              <group
                position={[-18.89, 240.18, 59.49]}
                rotation={[-2.61, -0.25, 0.16]}
                scale={[84.47, 84.47, 64.79]}>
                <mesh
                  geometry={defense.nodes.Cylinder002_cables_0.geometry}
                  material={defense.materials.cables}
                />
              </group>
              <group
                position={[60.71, 152.15, 49.54]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 100]}>
                <mesh
                  geometry={defense.nodes.Cube001_plates_0.geometry}
                  material={defense.nodes.Cube001_plates_0.material}
                />
              </group>
              <group
                position={[60.86, 318.53, 49.47]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 100]}>
                <mesh
                  geometry={defense.nodes.Cube002_plates_0.geometry}
                  material={defense.nodes.Cube002_plates_0.material}
                />
              </group>
              <group
                position={[-60.73, 318.34, 49.65]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 100]}>
                <mesh
                  geometry={defense.nodes.Cube003_plates_0.geometry}
                  material={defense.nodes.Cube003_plates_0.material}
                />
              </group>
              <group
                position={[-60.63, 152.15, 49.62]}
                rotation={[-Math.PI / 2, 0, 0]}
                scale={[100, 100, 100]}>
                <mesh
                  geometry={defense.nodes.Cube006_plates_0.geometry}
                  material={defense.nodes.Cube006_plates_0.material}
                />
              </group>
            </group>
          </group>
        ) : null}

        {satelliteOption[num].T === "dust" ? (
          <group position={[0.15, -180.05, -0.27]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={0.21}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={30.01}>
              <group rotation={[-Math.PI / 2, 0, 0]} scale={[100, 100, 50]}>
                <mesh geometry={dust.nodes.lantern002_low_emit_0.geometry} material={dust.materials.emit} />
              </group>
            </group>
          </group>
        ) : null}
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
}
useGLTF.preload("/space/multipurposeSatellite/scene.gltf");
