import React from "react";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export const WoodFences = ({position3d, rotation3d, scale3d, color, ...props}) => {
    const { nodes } = useGLTF("/old_fence/scene.gltf");

    const [ref] = useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [23, 5, 1],
        ...props,
    }))
    return (
        <group dispose={null}>
            <mesh castShadow
                scale={scale3d}
                rotation={rotation3d}
                position={position3d}
                geometry={nodes.Box006__0.geometry}
                material={nodes.Box006__0.material}
            >
            </mesh>
            <mesh ref={ref} castShadow>
                {/* <boxGeometry args={[23, 5, 1]} />
                <meshStandardMaterial color={color}/> */}
            </mesh>
        </group>
    );
};
useGLTF.preload("/old_fence/scene.gltf");