import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';
import { TextureLoader, RepeatWrapping } from 'three';
import grass from '../images/grass.png';
import { StartingRoad, CurvedRoad } from './Roads/RoadIndex';

const Ground = (props) => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    const texture = useMemo(() => new TextureLoader().load(grass),[]);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 100);

    return (
        <>
            <group>
                <StartingRoad
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    args={[20, 100]}
                />
                <CurvedRoad
                    position={[-45, 0, -50]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    args={[35, 55, 15, 1, 0, Math.PI / 2]}
                />
            </group>
            <mesh ref={ref} receiveShadow>
                <planeBufferGeometry attach='geometry' args={[175, 200]} />
                <meshStandardMaterial map={texture} attach='material' />
            </mesh>
        </>
    );
};

export default React.memo(Ground);