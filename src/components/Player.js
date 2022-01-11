import React, { useEffect, useRef } from 'react';
import { useSphere } from '@react-three/cannon';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { Vector3 } from 'three';

const SPEED = 6;
export const Player = (props) => {
    const {
        moveForward,
        moveBackward,
        moveLeft, 
        moveRight,
        jump,
    } = useKeyboardControls();
    
    const { camera } = useThree();
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        ...props,
      }));
    const velocity = useRef([0, 0, 0]);
    // useEffect(() => {
    //     api.velocity.subscribe((v) => (velocity.current = v));
    // }, [api,velocity])

    // //   console.log(camera.getObjectByProperty())
    // useFrame(() => {
    //     ref.current.getWorldPosition(camera.position)
    //     //camera.position.copy(ref.current.position);
    //     const direction = new Vector3();
    //     const frontVector = new Vector3(
    //         0,
    //         0,
    //         moveForward ? -1 : 0 - moveBackward ? 1 : 0
    //     );
    //     const sideVector = new Vector3(moveLeft ? 1 : 0 - moveRight ? -1 : 0, 0, 0);
    //     //console.log(frontVector)
    //     //console.log(sideVector)
    //     direction
    //         .subVectors(frontVector, sideVector)
    //         .normalize()
    //         .multiplyScalar(SPEED)
    //         .applyEuler(camera.rotation);
    //     //console.log(direction)
    //     api.velocity.set(direction.x, velocity.current[1], direction.z)
    //     //console.log(camera.rotation)
    // });


    return (
        <>
            <mesh ref={ref}>
                {/* <sphereGeometry />
                <meshStandardMaterial  color={"gray"}/> */}
            </mesh>
        </>
    );
};