import React, { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Sky, useFBX, useGLTF } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Cube } from './components/Cube';
import { Player } from './components/Player';
import Model from './3ds/Scene';



function App() {

  return (
    <Canvas shadows colorManagement sRGB camera={{position: [0, 20, 50], fov: 60}}>
      <Sky sunPosition={[100, 100, 100]} />
      <ambientLight intensity={0.25} />
      <directionalLight castShadow intensity={0.7} position={[30, 50, 30]} />
      <Suspense fallback={null}>
        <Html fullscreen>
          <Model />
        </Html>
      </Suspense>

      <Physics gravity={[0, -30, 0]} step={1 / 60}>
        <Ground position={[0, -0.05, 0]} />
        <Cube position={[0, 5, 0]} type="wood"/>
        <Player position={[0, 10, 15]} />
      </Physics>
      {/* <OrbitControls /> */}
    </Canvas>
  );
}

export default App;
