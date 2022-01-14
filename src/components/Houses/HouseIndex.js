import React from "react";
import { useBox, useCylinder } from "@react-three/cannon";

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

export const CylinderHouse = ({...props}) => {
    const [ref] = useCylinder(() => ({
        mass: 1,
        type: "Static",
        ...props,
    }))
    return (
        <mesh ref={ref} castShadow>
            <cylinderGeometry attach="geometry" args={props.args}/>
            <meshStandardMaterial attach="material" />
        </mesh>
    )
}