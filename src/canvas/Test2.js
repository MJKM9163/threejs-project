import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three'
import { Physics, useSphere } from '@react-three/cannon';

const dummy = new THREE.Vector3()
const lookAtPos = new THREE.Vector3()
const cursor = {
    x: 0,
    y: 0
}
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function Thing() {
  const ref = useRef()
  const num = 10;
  
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))


  window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX*num / sizes.width - 0;
    cursor.y = event.clientY*num / sizes.height - 0;
  });

  useFrame((state, delta) => {
    
    const step = 0.1
    state.camera.fov = THREE.MathUtils.lerp(state.camera.fov, 42, step)
    state.camera.position.lerp(dummy.set(0, 10, 10), step)

    lookAtPos.x = cursor.x - (num/2);
    lookAtPos.y = (cursor.y - (num/2)) * -1;
    state.camera.lookAt(lookAtPos)
    //console.log(lookAtPos.y)
    state.camera.updateProjectionMatrix()
  })


  return (
    <mesh
      ref={ref}
      onClick={(e) => console.log('click')}
      onPointerOver={(e) => console.log('hover')}
      onPointerOut={(e) => console.log('unhover')}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

const Tt = () => {
  return (
    <Canvas className="canvas">
      <Thing />
      <spotLight position={[0, 5, 10]} penumbra={1} castShadow />
      <ambientLight />

      <gridHelper />
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default Tt;