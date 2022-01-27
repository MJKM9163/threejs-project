import React, { useMemo } from "react";
import CameraControls from "camera-controls";
import * as THREE from "three";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useStore } from "../../../hooks/useStore";

CameraControls.install({ THREE: THREE });
//state.cameraRotationY
export const SpaceCamera = ({ pos = new Vector3(), look = new Vector3() }) => {
  const obj = {
    space: "112222",
    earth: "32323",
  };

  const name = useStore((state) => state.name);
  const zoom = useStore((state) => state.zoom);
  const focus = useStore((state) => state.focus);
  const cameraRotationY = useStore((state) => null);
  console.log(name);
  console.log(obj[name]);

  const camera = useThree((state) => state.camera);
  const gl = useThree((state) => state.gl);
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), []);

  return useFrame((state, delta) => {
    zoom
      ? pos.set(focus.x + 400, focus.y + 550, focus.z + -500)
      : pos.set(1100, 2600, -4000);
    zoom ? look.set(focus.x, focus.y, focus.z) : look.set(0, 0, 0);

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
