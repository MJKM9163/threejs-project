import React from 'react';
import { usePlane } from '@react-three/cannon';

export const Roads = () => {
    // const [ref] = usePlane(()=> ({
    //     rotation: [-Math.PI / 2, 0, 0],
    //     position: [0, 0, 0],
    //     args: [1, 1]
    // }));
    const args = [8, 100];
    const starting = {
        args: [8, 100],
        position: [0, 0, 0],
    }
    return (
        <>
        {/* <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            args={[30, 8]}
            >
            <planeGeometry attach='geometry' args={[30, 8]} />
            <meshStandardMaterial attach='material' />
        </mesh> */}
        <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            args={starting.args}
            position={starting.position}
            >
            <planeGeometry attach='geometry' args={starting.args} />
            <meshStandardMaterial attach='material' />
        </mesh>
        </>
    )
}