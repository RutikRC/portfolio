import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import uranusTexture from "../assets/uranus-texture.jpg";


const Uranus = ({ speed, size, orbitRadius }) => {
    const uranusRef = useRef();
    const texture = useLoader(THREE.TextureLoader, uranusTexture);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (uranusRef.current) {
            uranusRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            uranusRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
        }
    });

    return (
        <Sphere ref={uranusRef} args={[size, 32, 32]}>
            <meshStandardMaterial map={texture} />
        </Sphere>
    );
};

export default Uranus;