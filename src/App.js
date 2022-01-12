import React, { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, useGLTF, Html, RoundedBox } from '@react-three/drei';
import { Physics, useConvexPolyhedron, useBox, Debug } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Cube } from './components/Cube';
import { Player } from './components/Player';
import Model from './Scene';
import { Stest } from './Stest';


const Model2 = () => {
  //const gltf = useGLTF('/tree_of_life/scene.gltf', true);
  //const gltf = useGLTF('/tree_of_life/scene.gltf')
  const { nodes, materials, scene } = useGLTF('/tree_of_life/scene.gltf')
  const [ref] = useConvexPolyhedron(() => ({
    mass: 1,
    rotation:[-Math.PI / 1, 0, 0],
    position:[0, 20, 0],
    // args:[3,3,3],
    type: 'Dynamic',
  }));
  // gltf.scene.position.set(0,20,10)
  // console.log(gltf.scene)
  return (
    <>
      {/* <primitive ref={ref} object={gltf.scene} dispose={null}> */}
      <group ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[0.14, 0.14, 0.14]}>
        <mesh geometry={nodes.Object_2.geometry} material={nodes.Object_2.material} />
        <mesh geometry={nodes.Object_3.geometry} material={nodes.Object_3.material} />
        <mesh geometry={nodes.Object_4.geometry} material={nodes.Object_4.material} />
        <mesh geometry={nodes.Object_5.geometry} material={nodes.Object_5.material} />
        <mesh geometry={nodes.Object_6.geometry} material={nodes.Object_6.material} />
        <mesh geometry={nodes.Object_7.geometry} material={nodes.Object_7.material} />
        <mesh geometry={nodes.Object_8.geometry} material={nodes.Object_8.material} />
        <mesh geometry={nodes.Object_9.geometry} material={nodes.Object_9.material} />
        <mesh geometry={nodes.Object_10.geometry} material={nodes.Object_10.material} />
        <mesh geometry={nodes.Object_11.geometry} material={nodes.Object_11.material} />
        <mesh geometry={nodes.Object_12.geometry} material={nodes.Object_12.material} />
        <mesh geometry={nodes.Object_13.geometry} material={nodes.Object_13.material} />
        <mesh geometry={nodes.Object_14.geometry} material={nodes.Object_14.material} />
        <mesh geometry={nodes.Object_15.geometry} material={nodes.Object_15.material} />
      </group>
      {/* </primitive> */}
    </>
  )
}


function App() {

  return (
    <Canvas shadows colorManagement sRGB camera={{position: [10, 10, 10], fov: 60}}>
      <Sky sunPosition={[100, 100, 100]} />
      <ambientLight intensity={0.25} />
      <directionalLight castShadow intensity={0.7} position={[30, 50, 30]} />
      <Physics gravity={[0, -30, 0]} step={1 / 60}>
        <Debug scale={1} color="black">
        <Suspense fallback={null}>
          {/* <Model2 /> */}
          <Stest />
          {/* <Model /> */}

        </Suspense>
        <Cube position={[0, 5, 0]} type="wood"/>
        <Player position={[0, 10, 15]} />
        </Debug>
        <Ground position={[0, -0.05, 0]} />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
