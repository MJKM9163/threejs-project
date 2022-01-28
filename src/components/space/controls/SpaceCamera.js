import React, { useEffect, useMemo, useRef } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { storeApi, useStore } from "../../../hooks/useStore";

CameraControls.install({ THREE: THREE });
//state.cameraRotationY
export const SpaceCamera = ({ pos = new Vector3(), look = new Vector3() }) => {
  console.log("카메라 랜더링 확인");

  let focus = useRef(useStore.getState().focus);
  let zoomCheck = useRef(useStore.getState().zoom);
  useEffect(() => {
    storeApi.subscribe((state) => {
      focus.current = state.focus;
    });
    storeApi.subscribe((state) => {
      zoomCheck.current = state.zoom;
    });
  });

  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  return useFrame((state, delta) => {
    zoomCheck.current
      ? pos.set(
          focus.current.x + 400,
          focus.current.y + 550,
          focus.current.z + -500
        )
      : pos.set(1100, 2600, -4000);
    zoomCheck.current
      ? look.set(focus.current.x, focus.current.y, focus.current.z)
      : look.set(0, 0, 0);

    state.camera.position.lerp(pos, 0.1);
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
