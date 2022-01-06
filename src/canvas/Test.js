import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { softShadows, MeshWobbleMaterial, OrbitControls } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

//args={[1,1,1]} 너비 높이 깊이
softShadows();
const SpinningMesh = ({ position, args, color }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  const [expand, setExpand] = useState(false);

  const props = useSpring({
    scale: expand ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });
  return (
    <a.mesh
      onClick={() => setExpand(!expand)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}>
      <boxBufferGeometry attach='geometry' args={args} />
      <MeshWobbleMaterial attach='material' color={color} speed={1} factor={0.2}/>
    </a.mesh>
  );
};

//mesh.material.needsUpdate = true

//------
// const Camera = () => {
//   const camera = useRef()
//   const box = useRef()
//   mesh.position = box;
//   console.log(mesh)
//   window.addEventListener("mouseover", (event) => {
//       cursor.x = event.clientX / sizes.width - 0.5
//       cursor.y = event.clientY / sizes.height - 0.5
//   });
//   console.log(camera)

//   useFrame((state) => {
//       if(camera.current && mesh.position.current) {
//           camera.current.position.x = Math.sin(cursor.x * Math.PI* 2)* 2;
//           camera.current.position.y = cursor.y * 3;
//           camera.current.position.z = Math.cos(cursor.x * Math.PI* 2)* 2

//           camera.current.lookAt(mesh.position.current.position);
//       }
//   });
//   console.log(camera.current.position.x)
//   return(
//       <perspectiveCamera
//           ref={camera}
//           fov={75}
//           aspect={sizes.eidth/sizes.height}
//           mear={0.1}
//           far={100}
//       >
//           <mesh
//               name='box'
//               castShadow
//               ref={box}
//               position={[0, 5, 0]}
//               >
//               <boxGeometry attach='geometry' args={[3, 2, 1]} />
//               <meshStandardMaterial color={'orange'} />
//           </mesh>
//       </perspectiveCamera>
//   )
// };
//-----

const Test = () => {
  return (
    <>
      <Canvas
        shadows
        colorManagement
        camera={{position: [-5, 2, 10], fov: 60}}>
        <ambientLight intensity={0.5}/>
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}>
            <planeBufferGeometry attach='geometry' args={[100, 100]} />
            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpinningMesh position={[0, 1, 0]} args={[3, 2, 1]} color='lightblue'/>
          <SpinningMesh position={[-2, 1, -5]} color='pink'/>
          <SpinningMesh position={[5, 1, -2]} color='pink'/>
        </group>

        
        <OrbitControls />
      </Canvas>
    </>
  )
};

export default Test;