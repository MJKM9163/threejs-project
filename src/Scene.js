import React, { useRef, useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox, useConvexPolyhedron, usePlane } from '@react-three/cannon'


export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials, scene } = useGLTF('/tree_of_life/scene.gltf')
  const [ref] = useConvexPolyhedron(()=> ({
    mass: 1,
    position:[0, 10, 0],
    rotation:[-Math.PI / 1, 0, 0],
    type: 'Dynamic',
  }));

  console.log(nodes)
  console.log(nodes.Object_2)
  console.log(scene)
  console.log(ref.current);
  console.log(materials);
  //scale={[0.14, 0.14, 0.14]}
  return (
    <group ref={ref} dispose={null} position={[3,0,0]} rotation={[-Math.PI / 1, 0, 0]} scale={[0.14, 0.14, 0.14]}>
    
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
  )
}

useGLTF.preload('/tree_of_life/scene.gltf')
