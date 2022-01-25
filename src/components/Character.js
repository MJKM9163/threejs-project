import React, { useEffect, useRef, useState } from "react";
import { useBox } from "@react-three/cannon";
import {
  OrbitControls,
  PointerLockControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useKeyboardControls } from "../hooks/useKeyboardControls";
import { Camera } from "../starting/Camera";
import { useStore } from "../hooks/useStore";

let a = 1.5;
let b = 1.5;
let c = 1.5;

const SPEED = 3;
const Character = ({ ...props }) => {
  const setMove = useStore((state) => state.setSpaceShipMove);
  const spaceShipMove = useStore((state) => state.spaceShipMove);
  const [hide, setHide] = useState(false);

  const { camera, mouse, gl } = useThree();
  const controls = useRef();

  const [Model, ModelApi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    rotation: [Math.PI / 2, 0, 0],
    ...props,
  }));

  const [ModelMovingBox, ModelMovingBoxApi] = useBox(() => ({
    mass: 1,
    type: "Kinematic",
    position: [0, 0, 0],
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

  const { nodes, materials, animations } = useGLTF("Ybot/Idle.gltf");
  const walking = useGLTF("Ybot/Walking.gltf");
  //console.log(ModelBoxapi);
  const idle = useAnimations(animations, Model);
  const walkingAction = useAnimations(walking.animations, Model);
  //console.log(walkingAction);
  const { moveForward, moveBackward, moveLeft, moveRight, jump } =
    useKeyboardControls();

  const velocity = useRef([0, 0, 0]);

  useEffect(() => {
    if (hide === false) {
      walkingAction.actions.Walking.stop();
      if (moveForward === true) {
        //ModelMovingBoxApi.rotation.set(0, 0, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      } else if (moveBackward === true) {
        //ModelMovingBoxApi.rotation.set(0, -Math.PI / 1, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      } else if (moveLeft === true) {
        //ModelMovingBoxApi.rotation.set(0, Math.PI / 2, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      } else if (moveRight === true) {
        //ModelMovingBoxApi.rotation.set(0, -Math.PI / 2, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      } else {
        walkingAction.actions.Walking.stop();
        idle.actions.Idle.play();
      }
      if (moveForward === true && moveLeft === true) {
        //ModelMovingBoxApi.rotation.set(0, Math.PI / 6, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
        console.log("대각선");
      } else if (moveForward === true && moveRight === true) {
        //ModelMovingBoxApi.rotation.set(0, -Math.PI / 6, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      } else if (moveBackward === true && moveLeft === true) {
        //ModelMovingBoxApi.rotation.set(0, Math.PI / 1.3, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      } else if (moveBackward === true && moveRight === true) {
        //ModelMovingBoxApi.rotation.set(0, -Math.PI / 1.3, 0);
        walkingAction.actions.Walking.play();
        idle.actions.Idle.stop();
      }
    }
    ModelBoxapi.velocity.subscribe((v) => (velocity.current = v));
    //ModelMovingBoxApi.velocity.subscribe((v) => (velocity.current = v));
  }, [
    ModelBoxapi,
    ModelMovingBoxApi,
    velocity,
    hide,
    walkingAction,
    idle,
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
  ]);

  useFrame(() => {
    //num += 0.001;

    //camera.position.set(0, 50, -20); // 이거
    //camera.rotation.set(-2.7233, 0, -3.14159); // 이거

    //Camera.current?.getWorldPosition(camera.position);
    //camera.getWorldPosition(Camera.current?.position);

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

    //ModelBoxapi.velocity.set(direction.x, velocity.current[1], direction.z);

    // ModelBoxapi.position.set(
    //   (a += direction.x) / 10,
    //   velocity.current[1],
    //   (b += direction.z) / 10
    // );

    // console.log(direction.x);

    // ModelMovingBoxApi.velocity.set(
    //   direction.x,
    //   velocity.current[1],
    //   direction.z
    // );
    // ModelMovingBoxApi.velocity.set(1, 0, 0);
    // console.log(ModelMovingBox.current?.position);
    //ttes.current?.position.set((a += a), velocity.current[1], direction.z);
    ModelMovingBox.current?.position.set(
      (a += direction.x),
      velocity.current[1],
      direction.z
    );
    //console.log(ModelMovingBox.current?.position);
    // ModelMovingBoxApi.position.set(
    //   (a += direction.x),
    //   velocity.current[1],
    //   direction.z
    // );
    //ModelMovingBox.current?.position.set(10, 0, 0);

    //camera.lookAt(ModelMovingBox.current?.position);
  });

  // console.log(controls.current?.target);
  // console.log(ModelMovingBox.current);

  return (
    <>
      <group name={"Model_Moving_Box"} ref={ModelMovingBox}>
        <Camera position={[0, 50, -100]} />
        <OrbitControls ref={controls} target={[0, 0, 0]} enablePan={false} />

        <group
          name="Model_Box"
          ref={ModelBox}
          dispose={null}
          scale={0.05}
        ></group>
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
