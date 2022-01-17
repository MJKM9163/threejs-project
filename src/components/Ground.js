import React, { useMemo } from 'react';
import { usePlane } from '@react-three/cannon';
import { TextureLoader, RepeatWrapping } from 'three';
import grass from '../images/grass.png';
import { StraightRoad, CurvedRoad } from './Roads/RoadIndex';
import { BoxHouse } from './Houses/HouseIndex';
import { WoodFences } from './Fences/FencesIndex';

const Ground = (props) => {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
    const texture = useMemo(() => new TextureLoader().load(grass),[]);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 100);
    let w_f_position_Y = 2.5;
    return (
        <>
            <group name='starting'>
                <group name="House">
                    <BoxHouse
                        position={[-92, 1, 15]}
                        rotation={[0, 0, 0]}
                        args={[3, 3, 3]}
                    />
                    
                </group>
                <group name="Fences">
                    <WoodFences
                        position={[-11, w_f_position_Y, -23]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-23, w_f_position_Y, -11]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-11, w_f_position_Y, 22]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-23.5, w_f_position_Y, 11]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 1]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, -36]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, -13]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, 10]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, 33]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, 56]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, 79]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[11, w_f_position_Y, 102]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-11, w_f_position_Y, 45]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-11, w_f_position_Y, 68]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale3d={0.005}
                    />
                    <WoodFences
                        position={[-11, w_f_position_Y, 91]}
                        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
                        scale3d={0.005}
                    />
                </group>
                <group name='Roads'>
                    <StraightRoad
                        position={[-60, 0, 0]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        args={[20, 100]}
                    />
                    <StraightRoad
                        position={[0, 0, 0]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        args={[20, 100]}
                    />
                    <StraightRoad
                        position={[0, 0, 100]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        args={[20, 100]}
                    />
                    <StraightRoad
                        position={[-142.5, 0, 0]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        args={[20, 65.5]}
                    />
                    <StraightRoad
                        position={[-90, 0, -157.5]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        args={[20, 35]}
                    />
                    <StraightRoad
                        position={[60, 0, 140]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                        args={[20, 100]}
                    />

                    <CurvedRoad
                        position={[-45, 0, -50]}
                        rotation={[-Math.PI / 2, 0, 0]}
                        args={[35, 55, 15, 1, 0, Math.PI / 2]}
                    />
                    <CurvedRoad
                        position={[-45, 0, -140]}
                        rotation={[-Math.PI / 2, 0, -Math.PI / 1]}
                        args={[35, 55, 15, 1, 0, Math.PI / 2]}
                    />
                </group>
                <mesh ref={ref} receiveShadow>
                    <planeBufferGeometry attach='geometry' args={[350, 350]} />
                    <meshStandardMaterial map={texture} attach='material' />
                </mesh>
            </group>
        </>
    );
};

export default React.memo(Ground);