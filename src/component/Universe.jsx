/**
 * Universe Application
 * 
 * © 2024 Rutik Ravindra Chavan. All rights reserved.
 * Developed by: Rutik Ravindra Chavan
 * Designation: Software Developer
 * Contact: +91-9657858193 | chavanrutik133@gmail.com
 * GitHub: https://github.com/RutikRC
 * LinkedIn: www.linkedin.com/in/rutik-chavan
 * 
 * Description:
 * This application visualizes a universe with planets, stars, and orbits using React and Three.js.
 * 
 * Note:
 * Redistribution or use of this code without permission is prohibited.
 */


import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";

// Function to generate random positions in 3D space
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

// Stars component scattered like particles
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

const Sun = () => {
    const sphereRef = useRef();
    const [intensity, setIntensity] = useState(1.5); // Emissive intensity state
    const [hovered, setHovered] = useState(false); // Hover state

    useFrame(() => {
        // Animate the emissive intensity to simulate a flame effect
        setIntensity(1.5 + Math.sin(Date.now() * 0.005) * 0.5); // Pulsating effect
    });

    return (
        <group>
            <Sphere
                ref={sphereRef}
                args={[2, 64, 64]}
                onPointerOver={() => setHovered(true)} // Show label on hover
                onPointerOut={() => setHovered(false)} // Hide label when not hovered
            >
                <meshStandardMaterial
                    emissive="#FFDD44"
                    emissiveIntensity={intensity} // Apply dynamic intensity
                    roughness={0.1}
                    color="#FFDD44"
                    metalness={0.5}
                />
            </Sphere>
            <pointLight intensity={intensity * 2} position={[0, 0, 0]} /> {/* Glowing light */}

            {/* Full-width label */}
            {hovered && (
                <Html
                    center
                    distanceFactor={10} // Adjust size based on distance from camera
                    style={{
                        position: "fixed", // Fix position relative to the viewport
                        top: "50%", // Center vertically
                        left: 0,
                        width: "400px", // Full-width background
                        backgroundColor: "rgba(255, 255, 255, 0.9)", // Light background
                        padding: "20px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)", // Subtle shadow for pop-out effect
                        borderRadius: "8px",
                        textAlign: "center",
                        color: "#333",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        zIndex: 10, // Ensure it's above other elements
                    }}
                >
                    <div>
                        <p><strong>Universe Application</strong></p>
                        <p>© 2024 Rutik Ravindra Chavan. All rights reserved.</p>
                        <p>Developed by: Rutik Ravindra Chavan</p>
                        <p>Designation: Software Developer</p>
                        <p>
                            Contact: +91-9657858193 |{" "}
                            <a
                                href="mailto:chavanrutik133@gmail.com"
                                style={{ color: "#0066cc", textDecoration: "none", fontWeight: "bold" }}
                            >
                                chavanrutik133@gmail.com
                            </a>
                        </p>
                        <p>
                            <a
                                href="https://github.com/RutikRC"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#0066cc", textDecoration: "none", fontWeight: "bold" }}
                            >
                                GitHub
                            </a>{" "}
                            |{" "}
                            <a
                                href="https://www.linkedin.com/in/rutik-chavan"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#0066cc", textDecoration: "none", fontWeight: "bold" }}
                            >
                                LinkedIn
                            </a>
                        </p>
                        <p style={{ fontStyle: "italic", fontSize: "0.9rem", marginTop: "10px" }}>
                            Redistribution or use of this code without permission is prohibited.
                        </p>
                    </div>
                </Html>
            )}
        </group>
    );
};




// Orbit Path
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

// Planet component
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

// Moon Component

const Moon = ({ radius, speed, size, color }) => {
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

// Function to create a Milky Way-like galaxy with stars and circles
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

const PlanetWithMoon = ({ radius, speed, size, color, moonProps }) => {
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



const Universe = () => {
    return (
        <div className="relative">
            <Canvas
                camera={{
                    position: [20, -3.5, -3],
                }}
                style={{ height: "100vh" }}
                className="bg-slate-900"
            >
                <OrbitControls 
                    maxDistance={50} 
                    minDistance={5} 
                    screenSpacePanning={true} 
                    enablePan={true} 
                />
                <directionalLight />
                <pointLight position={[-30, 0, -30]} power={10.0} />

                {/* Milky Way */}
                <MilkyWay starCount={2000} innerRadius={10} outerRadius={50} />

                {/* Stars scattered across the universe */}
                <Stars count={200} spread={50} />

                {/* Sun at the center */}
                <Sun />

                {/* Add multiple planets with orbits */}
                <OrbitPath radius={5} />
                <Planet radius={5} speed={0.5} size={0.5} color={"#6B7280"} />

                <OrbitPath radius={8} />
                <Planet radius={8} speed={0.3} size={0.8} color={"#10B981"} />

                <OrbitPath radius={12} />
                <Planet radius={12} speed={0.2} size={1.2} color={"#FBBF24"} />

                <OrbitPath radius={18} />
                <PlanetWithMoon
                    radius={18}
                    speed={0.1}
                    size={1.5}
                    color={"#24defb"}
                    moonProps={{
                        radius: 4, // Distance of moon from planet
                        speed: 0.5, // Speed of moon around planet
                        size: 0.5, // Moon size
                        color: "#e0e0df", // Moon color
                    }}
                />
                <OrbitPath radius={25} />
                <Planet radius={25} speed={0.08} size={1.8} color={"#c224fb"} />

                <OrbitPath radius={32} />
                <Planet radius={32} speed={0.05} size={2} color={"#24fb85"} />
            </Canvas>
        </div>
    );
};

export default Universe;
