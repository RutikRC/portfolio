import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

const MilkyWay = ({ starCount = 1000, innerRadius = 10, outerRadius = 50 }) => {
    const points = [];
    const ref = useRef();

    // Generate points in a disk-like formation
    for (let i = 0; i < starCount; i++) {
        const angle = Math.random() * Math.PI * 2; // Random angle around the circle
        const radius = Math.sqrt(Math.random()) * (outerRadius - innerRadius) + innerRadius; // Random radius within the bounds
        const x = Math.cos(angle) * radius;
        const y = (Math.random() - 0.5) * 2; // Random slight vertical displacement
        const z = Math.sin(angle) * radius;

        points.push(new THREE.Vector3(x, y, z));
    }

    const galaxyGeometry = new THREE.BufferGeometry().setFromPoints(points);
    const galaxyMaterial = new THREE.PointsMaterial({
        size: 0.2,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.8,
        color: new THREE.Color(0xffffff),
    });

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.z = clock.getElapsedTime() * 0.02; // Slowly rotate the galaxy
        }
    });

    return (
        <points ref={ref} geometry={galaxyGeometry} material={galaxyMaterial} />
    );
};

export default MilkyWay;