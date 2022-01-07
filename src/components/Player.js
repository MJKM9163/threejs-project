import React from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';

export const Player = (props) => {
    const { camera } = useThree();
    const [ref] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        ...props,
      }));
      console.log(camera)
    useFrame(() => {
        //ref.current.position.x -= 0.03
        camera.position.copy(ref.current.position);
        //ref.current.position.z += 0.01;
        //console.log(ref.current.position)
    });


    return (
        <>
            <mesh ref={ref} />
        </>
    );
};