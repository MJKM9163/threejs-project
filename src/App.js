import React from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import { Ground } from './components/Ground';
import { Cube } from './components/Cube';
import { Player } from './components/Player';


function App() {
  

  return (
    <Canvas shadows sRGB>
      <Sky sunPosition={[100, 100, 100]} />
      <ambientLight intensity={0.25} />
      <pointLight castShadow intensity={0.7} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground position={[0, 0.5, 0]} />
        <Player position={[0, 7, 15]} />
        <Cube position={[0, 5, 0]} type="wood"/>
      </Physics>
    </Canvas>
  );
}

export default App;
