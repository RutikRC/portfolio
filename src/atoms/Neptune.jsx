import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import neptuneTexture from "../assets/neptune-texture.jpg";


const Neptune = ({ speed, size, orbitRadius }) => {
    const neptuneRef = useRef();
    const texture = useLoader(THREE.TextureLoader, neptuneTexture);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (neptuneRef.current) {
            neptuneRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            neptuneRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
        }
    });

    return (
        <Sphere ref={neptuneRef} args={[size, 32, 32]}>
            <meshStandardMaterial map={texture} />
        </Sphere>
    );
};

export default Neptune;