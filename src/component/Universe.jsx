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
import Sun from "../atoms/Sun";
import PlanetWithMoon from "../atoms/PlaneWithMoon";
import MilkyWay from "../atoms/MilkyWay";
import Planet from "../atoms/Planet";
import OrbitPath from "../atoms/OrbitPath";
import Stars from "../atoms/Stars";
import Mercury from "../atoms/Mercury";
import Venus from "../atoms/Venus";
import Earth from "../atoms/Earth";
import Mars from "../atoms/Mars";
import Jupiter from "../atoms/Jupiter";
import Saturn from "../atoms/Saturn";
import Uranus from "../atoms/Uranus";
import Neptune from "../atoms/Neptune";

const Universe = () => {
    return (
        <div className="relative">
            <Canvas
                camera={{
                    position: [50, -8.5, -5],
                }}
                style={{ height: "100vh" }}
                className="bg-slate-900"
            >
                <OrbitControls
                    maxDistance={250}
                    minDistance={5}
                    screenSpacePanning={true}
                    enablePan={true}
                />
                <directionalLight />
                <pointLight position={[-30, 0, -30]} power={10.0} />

                {/* Stars scattered across the universe */}
                <Stars count={200} spread={50} />

                {/* Sun at the center */}
                <Sun />

                <OrbitPath radius={25} />
                <Mercury
                    radius={25}
                    speed={0.7}
                    size={1}
                    orbitRadius={25}
                />

                <OrbitPath radius={30} />
                <Venus
                    radius={30}
                    speed={0.5}
                    size={1.2}
                    orbitRadius={30}
                />

                <OrbitPath radius={35} />
                <Earth
                    radius={35}
                    speed={0.3}
                    size={1.5}
                    orbitRadius={35}
                />
                
                <OrbitPath radius={45} />
                <Mars
                    radius={45}
                    speed={0.2}
                    size={1.8}
                    orbitRadius={45}
                />

                <OrbitPath radius={55} />
                <Jupiter
                    radius={55}
                    speed={0.1}
                    size={2}
                    orbitRadius={55}
                />

                <OrbitPath radius={70} />
                <Saturn
                    radius={70}
                    speed={0.05}
                    size={1.9}
                    orbitRadius={70}
                />

                <OrbitPath radius={80} />
                <Uranus
                    radius={80}
                    speed={0.03}
                    size={1.4}
                    orbitRadius={80}
                />

                <OrbitPath radius={90} />
                <Neptune
                    radius={90}
                    speed={0.01}
                    size={1.3}
                    orbitRadius={90}
                />
            </Canvas>
        </div>
    );
};

export default Universe;
