import React from "react";
import { useBox, useCompoundBody, useConvexPolyhedron } from "@react-three/cannon";
import { useGLTF } from "@react-three/drei";
import { Geometry } from "three-stdlib";
import { Box3, Color, Vector3 } from "three";



function toConvexProps(bufferGeometry) {
    const geo = new Geometry().fromBufferGeometry(bufferGeometry);
    geo.mergeVertices();
    console.log(geo)

    return [geo.vertices.map((v) => [v.x, v.y, v.z]), geo.faces.map((f) => [f.a, f.b, f.c]), []]; // prettier-ignore
  }

  function Diamond(props) {
      const { nodes, scene } = useGLTF("/blue_diamond/scene.gltf");

      console.log(nodes)
      console.log(scene)
      console.log(scene.position.set(0, 5, 3))

    console.log(nodes.defaultMaterial)
    console.log(nodes.defaultMaterial.geometry)
    console.log(nodes.defaultMaterial.material)


    const [ref] = useConvexPolyhedron(() => ({
        mass: 100,
        ...props,
        args: toConvexProps(nodes.defaultMaterial.geometry),
    }));

    const [refref] = useCompoundBody(() => ({
        mass: 12,
        shapes: [
          { type: 'Box', position: [0, 0, 0], rotation: [0, 0, 0], args: [1, 1, 1] },
          { type: 'Sphere', position: [0, 0.5, 0], rotation: [0, 0, 0], args: [0.65] }
        ],
        position: [3, 10, 0],
        rotation: [0, 3, 0]
      }))

    return (
        <>
        {/* <group ref={ref}> */}
      <mesh 
        castShadow
        receiveShadow
        ref={ref}
        geometry={nodes.defaultMaterial.geometry}
        material={nodes.defaultMaterial.material}
        {...props}
      >
          
          <meshNormalMaterial />
      </mesh>
      <mesh 
        castShadow
        receiveShadow
        ref={refref}
        geometry={nodes.defaultMaterial.geometry}
        material={nodes.defaultMaterial.material}
      >
          <meshPhongMaterial />
      </mesh>
      {/* </group> */}
      <primitive object={scene} dispose={null}/>
      </>
    );
  }
  
export const Stest = () => {
    return (
        <>
            <Diamond position={[0.5, 10, 0]} rotation={[0.4, 0.3, 0.7]} />
        </>
    )
};
  