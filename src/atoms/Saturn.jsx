import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import saturnTexture from "../assets/saturn-texture.jpg";

const Saturn = ({ speed, size, orbitRadius }) => {
    const saturnRef = useRef();
    const texture = useLoader(THREE.TextureLoader, saturnTexture);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
        if (saturnRef.current) {
            saturnRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
            saturnRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
        }
    });

    return (
        <Sphere ref={saturnRef} args={[size, 32, 32]}>
            <meshStandardMaterial map={texture} />
        </Sphere>
    );
};

export default Saturn;