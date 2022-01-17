import React, { useRef } from "react";
import { useBox, useCylinder } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export const BoxHouse = ({...props}) => {
    const [ref] = useBox(() => ({
        mass: 1,
        type: "Static",
        ...props,
    }))
    return (
        <mesh ref={ref} castShadow> 
            <boxGeometry attach="geometry" args={props.args}/>
            <meshStandardMaterial attach="material" />
        </mesh>
    )
}
