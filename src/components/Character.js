import React, { useEffect, useRef, useState } from "react";
import { useBox, useSphere } from "@react-three/cannon";
import {
  PointerLockControls as PointerLockControlsImpl,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useKeyboardControls } from "../hooks/useKeyboardControls";

extend({ PointerLockControlsImpl });

let num = 0;
const SPEED = 25;
const Character = ({ ...props }) => {
  const [hide, setHide] = useState(true);
  const { camera, mouse, gl } = useThree();
  const controls = useRef();
  //console.log(mouse.x);
  //console.log(camera.position);
  const [Model, ModelApi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    rotation: [Math.PI / 2, 0, 0],
    ...props,
  }));

  const [ModelMovingBox, ModelMovingBoxApi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    ...props,
  }));
  const [ModelBox, ModelBoxapi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    args: [2, 2, 8.5],
    position: [0, 4.3, 0],
    rotation: [Math.PI / 2, 0, 0],
    ...props,
  }));

  const [Camera, Cameraapi] = useSphere(() => ({
    mass: 1,
    type: "Kinematic",
    args: [0],
    position: [0, 8, 0],
  }));

  const { nodes, materials, animations } = useGLTF("Ybot/Idle.gltf");
  const { actions } = useAnimations(animations, Model);

  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls();

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    // document.addEventListener("click", () => {
    //   controls.current.lock();
    // });
    if (hide === false) {
      actions.Idle.play();
    }
    ModelBoxapi.velocity.subscribe((v) => (velocity.current = v));
    ModelMovingBoxApi.velocity.subscribe((v) => (velocity.current = v));
  }, [Cameraapi, ModelBoxapi, ModelMovingBoxApi, velocity, actions, hide]);

  useFrame(() => {
    //num += 0.001;

    // camera.position.set(num, 50, -20); // 이거
    // camera.rotation.set(-2.7233, 0, -3.14159); // 이거

    Camera.current?.getWorldPosition(camera.position);

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      moveForward ? -1 : 0 - moveBackward ? 1 : 0
    );
    const sideVector = new Vector3(moveLeft ? 1 : 0 - moveRight ? -1 : 0, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    ModelBoxapi.velocity.set(direction.x, velocity.current[1], direction.z);

    ModelMovingBoxApi.velocity.set(
      direction.x,
      velocity.current[1],
      direction.z
    );
  });

  return (
    <>
      <group name={"Model_Moving_Box"} ref={ModelMovingBox}>
        <PointerLockControlsImpl
          ref={controls}
          args={[camera, gl.domElement]}
        />
        <mesh name="Camera" ref={Camera}></mesh>
        <mesh name="Model_Box" ref={ModelBox} />
        {/* <group
          name="Model_Box"
          ref={ModelBox}
          dispose={null}
          scale={0.05}
        ></group> */}
        {hide ? null : (
          <group
            name="Model"
            ref={Model}
            dispose={null}
            //rotation={[Math.PI / 2, 0, 0]}
            scale={0.05}
          >
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh
              geometry={nodes.Alpha_Joints.geometry}
              material={materials["Alpha_Joints_MAT.004"]}
              skeleton={nodes.Alpha_Joints.skeleton}
            />
            <skinnedMesh
              geometry={nodes.Alpha_Surface.geometry}
              material={materials["Alpha_Body_MAT.004"]}
              skeleton={nodes.Alpha_Surface.skeleton}
            />
          </group>
        )}
      </group>
    </>
  );
};

export default Character;
useGLTF.preload("Ybot/Idle.gltf");
