import React from "react";
import { useBox } from "@react-three/cannon";
import * as textures from '../textures';

export const Cube = ({ position, type, ...props }) => {
    const [ref] = useBox(() => ({
        mass: 1,
        type: 'Static',
        position,
        ...props,
    }));
    function Cubea() {
        
        const [ref] = useBox(() => ({ mass: 1, type: 'Static', position: [0, 7, 0], args:[1,1,1] }));

        return (
          <mesh castShadow ref={ref}>
            <boxGeometry args={[1,1,1]} />
            <meshStandardMaterial  color={"aqua"}/>
          </mesh>
        )
      }

    return (
        <>

        <Cubea/>
        <mesh castShadow ref={ref}>
            {[...Array(6)].map((_, index) => (
                <meshStandardMaterial
                    attachArray="material"
                    map={textures[type]}
                    key={index}
                />
            ))}
            <boxBufferGeometry attach="geometry" />
        </mesh>
        </>
    )
}