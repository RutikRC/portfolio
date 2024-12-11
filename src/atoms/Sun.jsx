import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { Html } from "@react-three/drei";
export default function Sun () {
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

