// Planet component
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const Planet = ({ radius, speed, size, color }) => {
    const ref = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        const x = Math.cos(time * speed) * radius;
        const z = Math.sin(time * speed) * radius;
        if (ref.current) {
            ref.current.position.set(x, 0, z);
        }
    });

    return (
        <Sphere ref={ref} args={[size, 32, 32]}>
            <meshStandardMaterial color={color} roughness={0.7} metalness={0.3} />
        </Sphere>
    );
};

export default Planet;