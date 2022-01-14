import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';
import { TextureLoader, RepeatWrapping } from 'three';
import grass from '../images/grass.png';
import { StartingRoad, CurvedRoad } from './Roads/RoadIndex';
import { BoxHouse, CylinderHouse } from './Houses/HouseIndex';
import { WoodFences } from './Fences/FencesIndex';

const Ground = (props) => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    const texture = useMemo(() => new TextureLoader().load(grass),[]);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(50, 50);

    return (
        <>
            <group name='starting'>
                <BoxHouse
                    position={[-92, 1, 15]}
                    rotation={[0, 0, 0]}
                    args={[3, 3, 3]}
                />
                <CylinderHouse
                    position={[-33, 2, -60]}
                    rotation={[0, 0, 0]}
                    args={[5, 15, 20, 10]}
                />
                <group name="Fences">
                    <WoodFences
                        position={[-11, 3, -23]}
                        rotation={[0, -Math.PI / 2, 0]}
                        position3d={[-11, 0, -24]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / -2-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-23, 3, -11]}
                        rotation={[0, 0, -Math.PI / 1]}
                        position3d={[-21.7, 0, -11]}
                        rotation3d={[-Math.PI / 2, 0, 0-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-11, 3, 22]}
                        rotation={[0, -Math.PI / 2, 0]}
                        position3d={[-11, 0, 21]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / -2-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-23.5, 3, 11]}
                        rotation={[0, 0, -Math.PI / 1]}
                        position3d={[-24.5, 0, 11]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / 1-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, 3, -36]}
                        rotation={[0, -Math.PI / 2, 0]}
                        position3d={[11, 0, -35]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / 2-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, 3, -13]}
                        rotation={[0, -Math.PI / 2, 0]}
                        position3d={[11, 0, -12]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / 2-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, 3, 10]}
                        rotation={[0, -Math.PI / 2, 0]}
                        position3d={[11, 0, 11]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / 2-0.1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, 3, 33]}
                        rotation={[0, -Math.PI / 2, 0]}
                        position3d={[11, 0, 34]}
                        rotation3d={[-Math.PI / 2, 0, -Math.PI / 2-0.1]}
                        scale3d={0.005}
                    />
                </group>
                <group name='Roads'>
                    <StartingRoad
                        position={[-40, 0, 0]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        args={[20, 100]}
                        />
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
            </group>
            <mesh ref={ref} receiveShadow>
                <planeBufferGeometry attach='geometry' args={[350, 400]} />
                <meshStandardMaterial map={texture} attach='material' />
            </mesh>
        </>
    );
};

export default React.memo(Ground);