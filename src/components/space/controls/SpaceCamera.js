import React, { useEffect, useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useStore } from "../../../hooks/stores/useStore";
import { KeyboardControls } from "../../../hooks/keyboardControls";

CameraControls.install({ THREE: THREE });
let x = 0;
let z = 0;

let posX = 300;
let posY = 4000;
let posZ = -7000;

export const SpaceCamera = ({ pos = new Vector3(), look = new Vector3() }) => {
  console.log("카메라 랜더링 확인");
  const focus = useRef(useStore.getState().focus);
  const zoomCheck = useRef(useStore.getState().zoom);

  useEffect(() => {
    useStore.subscribe((state) => {
      focus.current = state.focus;
    });
    useStore.subscribe((state) => {
      zoomCheck.current = state.zoom;
    });
  });
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  const { moveForward, moveBackward, moveLeft, moveRight } = KeyboardControls();

  return useFrame((state, delta) => {
    if (moveForward === true && z < 5000) {
      z += 100;
    } else if (moveBackward === true && z > -3000) {
      z -= 100;
    }
    if (moveLeft === true && x < 3000) {
      x += 100;
    } else if (moveRight && x > -3000) {
      x -= 100;
    }
    zoomCheck.current
      ? pos.set(
          focus.current.x - 400,
          focus.current.y + 550,
          focus.current.z + -1500
        )
      : pos.set(posX + x, posY, posZ + z);
    zoomCheck.current
      ? look.set(focus.current.x, focus.current.y, focus.current.z)
      : look.set(0 + x, 0, 0 + z);

    state.camera.position.lerp(pos, 0.5);
    state.camera.updateProjectionMatrix();
    controls.setLookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z,
      look.x,
      look.y,
      look.z,
      false
    );
    return controls.update(delta);
  });
};
