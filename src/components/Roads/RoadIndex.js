import React from 'react';

// 충돌 반응 없는 도로임!
// 링크에서 Geometry 사용법 확인 가능
// https://threejs.org/manual/#ko/primitives
export const StartingRoad = ({...props}) => {
    return (
        <mesh
            receiveShadow
            position={props.position}
            rotation={props.rotation}
        >
            <planeGeometry attach='geometry' args={props.args} />
            <meshStandardMaterial attach='material' />
        </mesh>
    )
}

export const CurvedRoad = ({...props}) => {
    return (
        <mesh
            receiveShadow
            position={props.position}
            rotation={props.rotation}
        >
            <ringGeometry attach='geometry' args={props.args} />
            <meshStandardMaterial attach='material' />
        </mesh>
    );
};