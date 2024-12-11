import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import sunTexture from "../assets/sun-texture.jpg";
import { useFrame, useLoader } from "@react-three/fiber";

const Sun = () => {
    const texture = useLoader(THREE.TextureLoader, sunTexture); // Use React-Three's useLoader for textures

    const sunRef = useRef();

    // Optionally animate the Sun (rotate for effect)
    useFrame(() => {
        if (sunRef.current) {
            sunRef.current.rotation.y += 0.01; // Rotate the Sun to animate it
        }
    });

    return (
        <mesh ref={sunRef}>
            <sphereGeometry args={[12, 25, 20]} /> {/* Sphere for Sun */}
            <meshBasicMaterial map={texture} /> {/* Apply the texture */}
        </mesh>
    );
};

export default Sun;
