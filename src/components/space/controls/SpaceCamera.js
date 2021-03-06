import { useEffect, useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { KeyboardControls } from "../../../hooks/keyboardControls";
import { screenStore } from "../../../hooks/stores/screenStore";
import { planetStore } from "../../../hooks/stores/planetStore";

CameraControls.install({ THREE: THREE });
let x = 0;
let z = 0;

let posX = 300;
let posY = 7000;
let posZ = -10000;

export const SpaceCamera = ({ pos = new Vector3(), look = new Vector3() }) => {
  const focus = useRef(planetStore.getState().selectPlanet.position);
  const zoomCheck = useRef(screenStore.getState().zoom);

  useEffect(() => {
    planetStore.subscribe(
      (state) => {
        focus.current = state.selectPlanet.position;
      },
      (state) => state.selectPlanet.position
    );
  });
  useEffect(() => {
    screenStore.subscribe(
      (state) => {
        zoomCheck.current = state.zoom;
      },
      (state) => state.zoom
    );
  });
  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  const { moveForward, moveBackward, moveLeft, moveRight } = KeyboardControls();

  return useFrame((state, delta) => {
    if (moveForward === true && z < 4000) {
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
      ? pos.set(focus.current.x - 400, focus.current.y + 550, focus.current.z + -1500)
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
