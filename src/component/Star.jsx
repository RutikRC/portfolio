// Stars component scattered like particles
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const generateRandomPoints = (count, spread) => {
    return Array.from({ length: count }, () => ({
        position: [
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread,
            (Math.random() - 0.5) * spread,
        ],
        color: new THREE.Color(`hsl(${Math.random() * 360}, 70%, 70%)`),
    }));
};

const generateStarGeometry = () => {
    const starShape = new THREE.Shape();
    const outerRadius = 0.05;
    const innerRadius = 0.02;
    const spikes = 5;

    for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        starShape.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
    }
    starShape.closePath();
    const extrudeSettings = { depth: 0.01, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(starShape, extrudeSettings);
};

const Stars = ({ count = 100, spread = 50 }) => {
    const points = generateRandomPoints(count, spread);

    return (
        <group>
            {points.map((point, index) => {
                const isStar = Math.random() > 0.5; // 50% chance to choose star shape
                const geometry = isStar ? generateStarGeometry() : new THREE.SphereGeometry(0.05, 8, 8);

                return (
                    <mesh key={index} position={point.position} geometry={geometry}>
                        <meshStandardMaterial
                            emissive={point.color}
                            emissiveIntensity={1}
                            color={point.color}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};

// Function to generate random positions in 3D space
export default Stars;