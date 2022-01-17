import React, { Suspense, useRef } from 'react';
import './App.css';
import styled from 'styled-components'
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, Sky, Stars, useHelper } from '@react-three/drei';
import { Physics, Debug } from '@react-three/cannon';
import Ground from './components/Ground';
import { Cube } from './components/Cube';
import { Player } from './components/Player';
import { SetSky, SetLight, SkyCountrol } from './controls/skyControl';
import { DirectionalLightHelper } from 'three';

const HtmlDiv = styled(Html)`
  background-color: blue;
  font-size: 30px;
`

function App() {
  const Light = () => {
    const ref = useRef()
    useHelper(ref, DirectionalLightHelper, 10);

    return (
      <>
        <ambientLight intensity={0.35} />
        <directionalLight
          ref={ref}
          intensity={3}
          position={SetLight()}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={1000}
          shadow-camera-near={0.5}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={-100}
          shadow-camera-bottom={100}
          castShadow
        />
      </>
    )
  }

  return (
    <>
    <div style={{position: 'absolute', textAlign:'center', zIndex: '2'}}>
      dd
    </div>
    <Canvas shadows colorManagement sRGB camera={{position: [30, 20, -50], fov: 60}}>
      <HtmlDiv position={[5, 25, 0]}>
        aa
      </HtmlDiv>
      <group>
        {/* <SkyCountrol /> */}
        <Sky sunPosition={SetSky()} turbidity={0.5} />
      </group>
      <Light />
      <Physics gravity={[0, -30, 0]} step={1 / 60}>
        <Debug>
        <Cube position={[0, 5, 0]} type="wood"/>
        {/* <Player position={[0, 10, 15]} /> */}
        <Suspense fallback={null}>
          <Ground position={[0, -0.1, 0]} />
        </Suspense>
        </Debug>
      </Physics>
      <OrbitControls />
      <Stars radius={200} count={300}/>
    </Canvas>
    </>
  );
}

export default App;
