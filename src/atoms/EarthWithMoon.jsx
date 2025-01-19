import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from "../assets/earth-day.jpg";
import moonTexture from "../assets/moon-texture.jpg";
import OrbitPath from './OrbitPath';


const EarthWithMoon = ({ speed, size, radius, moonProps }) => {
    const earthRef = useRef();
    const moonRef = useRef();
    const earthTexture2 = useLoader(THREE.TextureLoader, earthTexture);
    const moonTexture2 = useLoader(THREE.TextureLoader, moonTexture);


    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        // Planet position
        const planetX = Math.cos(time * speed) * radius;
        const planetZ = Math.sin(time * speed) * radius;

        if (earthRef.current) {
            earthRef.current.position.set(planetX, 0, planetZ);
        }

        // Moon position relative to the planet
        if (moonRef.current) {
            const moonX = planetX + Math.cos(time * moonProps.speed) * moonProps.radius;
            const moonZ = planetZ + Math.sin(time * moonProps.speed) * moonProps.radius;
            moonRef.current.position.set(moonX, 0, moonZ);
        }
    });
    return (
        <group>
            {/* Planet */}
            <Sphere ref={earthRef} args={[size, 32, 32]}>
                <meshStandardMaterial map={earthTexture2} />
            </Sphere>

            {/* Moon */}
            <Sphere ref={moonRef} args={[moonProps.size, 32, 32]}>
                <meshStandardMaterial map={moonTexture2} />
            </Sphere>

            {/* Moon Orbit */}
            <OrbitPath radius={moonProps.radius} />
        </group>
    );
};

export default EarthWithMoon;