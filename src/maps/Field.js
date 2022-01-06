import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { Physics, usePlane, useSphere } from '@react-three/cannon';

const Plane = ({position, args, materialcolor}) => {

    return (
        <mesh
            receiveShadow
            //ref={ref}
            rotation={[-Math.PI / 2, 0, 0]}
            position={position}>
            <planeGeometry
                attach='geometry'
                args={args}/>
            <meshStandardMaterial color={materialcolor} />
        </mesh>
    )
}

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const cursor = {
    x: 0,
    y: 0
}

const mesh = {
    position: null
}

const Camera = () => {
    const camera = useRef()
    const box = useRef()
    mesh.position = box;
    window.addEventListener("mousemove", (event) => {
        cursor.x = event.clientX / sizes.width - 0.5;
        cursor.y = event.clientY / sizes.height - 0.5;
      });

    useFrame(() => {
        if (camera.current && mesh.position.current) {
          camera.current.position.x = Math.sin(cursor.x * Math.PI * 2) * 2;
          camera.current.position.z = Math.cos(cursor.x * Math.PI * 2) * 2;
          camera.current.position.y = cursor.y * 3;
    
          camera.current.lookAt(mesh.position.current.position);
        }
      });
    
    return(
        <perspectiveCamera
            ref={camera}
            fov={75}
            aspect={sizes.eidth/sizes.height}
            mear={0.1}
            far={100}
        >
            <mesh
                name='box'
                castShadow
                ref={box}
                position={[0, 5, 0]}
                >
                <boxGeometry attach='geometry' args={[3, 2, 1]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>
            
        </perspectiveCamera>
    )
};


const Field = () => {

    let mesh1 = useRef(null);
    
    return (
        <>
        <Canvas 
            shadows
            colorManagement
            camera={{position: [-10, 15, 20], fov: 60}}
            
            >
        <ambientLight intensity={0.6}/>
        <directionalLight
          castShadow
          position={[0, 20, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10} />
        <pointLight position={[10, 10, 10]} />
        <Physics gravity={[0, -30, 0]}/>
        <Camera />
            <mesh
                name='box'
                castShadow
                ref={mesh1}
                position={[0, 5, 0]}
                >
                <boxGeometry attach='geometry' args={[3, 2, 1]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>
            
        <group name="road">
            <Plane args={[10, 100]} materialcolor={'white'} position={[0, 0, 0]}/>
        </group>
        <Plane name='mainField' args={[100, 100]} materialcolor={'gray'} position={[0, -0.1, 0]}/>
        
        <primitive object={new THREE.AxesHelper(15)} />
        {/* <Rig /> */}
        {/* <OrbitControls target={[-0.061775 , 0, 0]}/> */}
        {/* <Dummy /> */}
        {/* <Test /> */}
        </Canvas>
        </>
    )
}

export default Field;