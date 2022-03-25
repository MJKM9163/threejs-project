import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { BasicFighter } from "./fighters/BasicFighter";

export const Friendlys = () => {
  const num = useRef();
  //const friendlyNum = boundingStore.getState().friendlyNum;
  const friendlyNum = boundingStore((state) => state.friendlyNum);
  console.log(friendlyNum);

  return (
    <group ref={num}>
      {friendlyNum.map((item, index) =>
        item !== false ? (
          <BasicFighter
            key={index}
            num={index}
            position={[1300 + index * -500, 0, -1000]}
            rotation={[0, 0, 0]}
            scale={25}
          />
        ) : null
      )}
    </group>
  );
};

// event: () => {
//   let num = boundingStore.getState().friendlyNum.findIndex((e) => e === false);
//   console.log(boundingStore.getState().friendlyNum[num]);
//   let data = (boundingStore.getState().friendlyNum[num] = true);

//   console.log(num);
//   console.log(data);
//   boundingStore.setState({ friendlyNum: boundingStore.getState().friendlyNum });
// },
