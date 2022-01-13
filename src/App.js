import React, { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky, Stars } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import Ground from './components/Ground';
import { Cube } from './components/Cube';
import { Player } from './components/Player';
import { SetSky, SkyCountrol } from './controls/skyControl';

function App() {

  return (
    <Canvas shadows colorManagement sRGB camera={{position: [30, 20, -50], fov: 60}}>
      <group>
        {/* <SkyCountrol /> */}
        <Sky sunPosition={SetSky()} turbidity={0.5} />
      </group>
      <ambientLight intensity={0.25} />
      <directionalLight castShadow intensity={0.7} position={SetSky()} />
      <Physics gravity={[0, -30, 0]} step={1 / 60}>
        <Debug scale={1} color="black">
        {/* <Suspense fallback={null}>
        </Suspense> */}
        <Cube position={[0, 5, 0]} type="wood"/>
        <Player position={[0, 10, 15]} />
        <Ground position={[0, -0.03, 0]} />
        </Debug>
      </Physics>
      <OrbitControls />
      <Stars radius={200} count={300}/>
    </Canvas>
  );
}

export default App;
