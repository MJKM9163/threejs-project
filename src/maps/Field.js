import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

const Plane = ({position, args, materialcolor}) => {

    return (
        <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={position}>
            <planeGeometry
                attach='geometry'
                args={args}/>
            <meshStandardMaterial color={materialcolor} />
        </mesh>
    )
}

function Rig() {
    const { camera, mouse } = useThree()
    const vec = new THREE.Vector3()
    console.log(camera.position.z)
    return useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, mouse.y * 5, camera.position.z), 0.15))
  }


  //position: [-10, 15, 20]
const Field = () => {
    let mesh = useRef(null);
    
    return (
        <>
        <Canvas 
            shadows
            colorManagement
            camera={{fov: 60}}>
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
            <mesh
                name='box'
                castShadow
                ref={mesh}
                position={[0, 5, 0]}
                >
                <boxGeometry attach='geometry' args={[3, 2, 1]} />
                <meshStandardMaterial color={'orange'} />
            </mesh>
            
        <group name="road">
            <Plane args={[10, 100]} materialcolor={'white'} position={[0, 0, 0]}/>
        </group>
        <Plane name='mainField' args={[100, 100]} materialcolor={'gray'} position={[0, -0.1, 0]}/>
        {/* <OrbitControls /> */}
        
        <primitive object={new THREE.AxesHelper(15)} />
        <Rig />
        </Canvas>
        </>
    )
}

export default Field;