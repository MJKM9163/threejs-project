import { useEffect, useState } from "react";
import { screenStore } from "./stores/screenStore";

let prevention = true;

function actionByKey(key) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
  };
  return keys[key];
}

export const KeyboardControls = () => {
  const [movement, setMovement] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
  });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }));
      }
    };
    const handleKeyUp = (e) => {
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }));
      }
    };
    const hotKeys = (e) => {
      if (prevention) {
        prevention = false;
        if (e.code === "Digit1") {
          const check = screenStore.getState().researchMapOnOff;
          screenStore.setState({ researchMapOnOff: !check });
        } else if (e.code === "Digit2") {
          const check = screenStore.getState().productionControl;
          screenStore.setState({ productionControl: !check });
        }
      }
    };
    const hotKeysUp = () => {
      prevention = true;
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("keydown", hotKeys);
    document.addEventListener("keyup", hotKeysUp);
    return () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      document.addEventListener("keydown", hotKeys);
      document.addEventListener("keyup", hotKeysUp);
    };
  });
  return movement;
};
