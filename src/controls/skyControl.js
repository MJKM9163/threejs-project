import React, { useState } from "react";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { useStore } from "../hooks/useStore"

export function SetSky () {
    const num = useStore((state) => state.skyXYZ)
    return num;
}
export function SetLight () {
    const light = useStore((state) => state.lightXYZ)
    return light;
}

export function SkyCountrol (x, y, z) {
    const [clock] = React.useState(new THREE.Clock());
    const [sunX, setSunX] = useState(false);
    const [sunY, setSunY] = useState(false);
    const [sunZ, setSunZ] = useState(false);

    const num = useStore((state) => state.skyXYZ)
    const setNum = useStore((state) => state.setSkyXYZ)
    const light = useStore((state) => state.lightXYZ)
    const setLight = useStore((state) => state.setLightXYZ)

    useFrame((state) => {
        state.ready = false;
        state.invalidate();
        const timeUntilNextFrame = (1000 / 30) - clock.getDelta();

        if (sunY === false && num[0] > 0) {
            setSunY(true);
        }
        if (num[0] > 100) {
            setSunX(true);
            setSunZ(true);
        } 
        if (sunY === true && num[0] < 0) {
            setSunY(false);
        }
        if (num[0] < -100) {
            setSunX(false);
            setSunZ(false);
        } 
        setTimeout(() => {
            setNum(
                (sunX ? (num[0]-0.02) : (num[0]+0.02)),
                (sunY ? (num[1]-0.02) : (num[1]+0.02)),
                (sunZ ? (num[2]+0.02) : (num[2]-0.02))
            );
            setLight(
                (sunX ? (light[0]-0.02) : (light[0]+0.02)),
                (sunY ? (light[1]-0.02) : (light[1]+0.02)),
                (sunZ ? (light[2]+0.02) : (light[2]-0.02))
            );
        }, Math.max(0, timeUntilNextFrame));
    })
    return(<></>)
}
// SetSky(0, 0, 50)