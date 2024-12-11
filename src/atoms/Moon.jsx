// Moon Component
import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import moonTexture from "../assets/moon-texture.jpg";

const Moon = ({ speed, size, orbitRadius }) => {
    const moonRef = useRef();
    const texture = useLoader(THREE.TextureLoader, moonTexture);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (moonRef.current) {
            moonRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            moonRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
        }
    });

    return (
        <Sphere ref={moonRef} args={[size, 32, 32]}>
            <meshStandardMaterial map={texture} />
        </Sphere>
    );
};

export default Moon;

