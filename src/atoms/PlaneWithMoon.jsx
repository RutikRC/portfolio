import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import OrbitPath from "./OrbitPath";

export default function PlanetWithMoon ({ radius, speed, size, color, moonProps }) {
    const planetRef = useRef();
    const moonRef = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        // Planet position
        const planetX = Math.cos(time * speed) * radius;
        const planetZ = Math.sin(time * speed) * radius;

        if (planetRef.current) {
            planetRef.current.position.set(planetX, 0, planetZ);
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
            <Sphere ref={planetRef} args={[size, 32, 32]}>
                <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
            </Sphere>

            {/* Moon */}
            <Sphere ref={moonRef} args={[moonProps.size, 32, 32]}>
                <meshStandardMaterial color={moonProps.color} roughness={0.7} metalness={0.3} />
            </Sphere>

            {/* Moon Orbit */}
            <OrbitPath radius={moonProps.radius} />
        </group>
    );
};