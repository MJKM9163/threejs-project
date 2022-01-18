import React from "react";
import { useBox } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";

export const WoodFences = ({position3d, rotation3d, scale3d, color, ...props}) => {
    const { nodes } = useGLTF("/old_fence/scene.gltf");
    const [ref] = useBox(() => ({
        mass: 1,
        type: 'Static',
        args: [23, 1, 5],
        //rotation: [-Math.PI / 2, 0, Math.PI / 2],
        ...props,
    }))
    return (
        <group dispose={null}>
            <mesh castShadow
                ref={ref}
                scale={scale3d}
            >
                <mesh
                    position={[0, 0, -500]}
                    rotation={[0, 0, -0.1]}
                    geometry={nodes.Box006__0.geometry}
                    material={nodes.Box006__0.material}>
                </mesh>
            </mesh>
        </group>
    );
};
useGLTF.preload("/old_fence/scene.gltf");