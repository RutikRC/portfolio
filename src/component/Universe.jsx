import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import createStarGeometry from "./Star";

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

// Stars component scattered like particles
const Stars = ({ count = 100, spread = 50 }) => {
    const points = generateRandomPoints(count, spread);

    return (
        <group>
            {points.map((point, index) => (
                <mesh key={index} position={point.position}>
                    <Sphere args={[0.05, 8, 8]}>
                        <meshStandardMaterial
                            emissive={point.color}
                            emissiveIntensity={1}
                            color={point.color}
                        />
                    </Sphere>
                </mesh>
            ))}
        </group>
    );
};

// Sun component
const Sun = () => {
    return (
        <group>
            <Sphere args={[2, 64, 64]}>
                <meshStandardMaterial emissive="#FFDD44" emissiveIntensity={1.5} roughness={0.1} />
            </Sphere>
            <pointLight intensity={2} position={[0, 0, 0]} />
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

// Function to create a Milky Way-like galaxy
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

const Universe = () => {
    return (
        <div className="relative">
            <Canvas
                camera={{
                    position: [10, -7.5, -5],
                }}
                style={{ height: "100vh" }}
                className="bg-slate-900"
            >
                <OrbitControls maxDistance={20} minDistance={10} />
                <directionalLight />
                <pointLight position={[-30, 0, -30]} power={10.0} />

                {/* Milky Way */}
                <MilkyWay starCount={2000} innerRadius={10} outerRadius={50}/>

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

                <OrbitPath radius={16} />
                <Planet radius={16} speed={0.1} size={1.5} color={"#24defb"} />

                <OrbitPath radius={20} />
                <Planet radius={20} speed={0.09} size={1.8} color={"#c224fb"} />

                <OrbitPath radius={25} />
                <Planet radius={25} speed={0.08} size={2} color={"#24fb85"} />
            </Canvas>
        </div>
    );
};

export default Universe;
