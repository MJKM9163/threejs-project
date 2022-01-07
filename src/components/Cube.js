import React from "react";
import { useBox } from "@react-three/cannon";
//import { BoxBufferGeometry } from "three";
import * as textures from '../textures';

export const Cube = ({ position, type, ...props }) => {
    const [ref] = useBox(() => ({
        type: 'Static',
        position,
        ...props,
    }));
    function Cubea(props) {
        
        const [ref] = useBox(() => ({ mass: 1, type: 'Dynamic', position: [1.5, 7, 0], ...props }));

        return (
          <mesh castShadow ref={ref}>
            <boxGeometry />
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