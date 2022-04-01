import React, { useEffect, useRef } from "react";
import { boundingStore } from "../hooks/stores/boundingStore";
import { BasicFighter } from "./fighters/BasicFighter";

export const Friendlys = () => {
  const num = useRef();
  const friendlyLive = boundingStore((state) => state.friendlyLive);

  return (
    <group ref={num}>
      {friendlyLive.map((item, index) =>
        item.type === "공격함" ? (
          <BasicFighter
            key={index}
            num={index}
            position={[1300 + index * -500, 0, -1000]}
            rotation={[0, 0, 0]}
            scale={25}
            adjust={item.adjust}
          />
        ) : null
      )}
    </group>
  );
};
