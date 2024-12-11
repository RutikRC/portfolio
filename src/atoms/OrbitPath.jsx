import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const OrbitPath = ({ radius }) => {
    const points = [];
    const segments = 64;

    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }

    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={orbitGeometry}>
            <lineBasicMaterial attach="material" color="#4B5563" linewidth={2} />
        </line>
    );
};

export default OrbitPath;