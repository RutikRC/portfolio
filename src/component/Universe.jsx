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
                    maxDistance={100} 
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
                <OrbitPath radius={25} />
                <Planet radius={25} speed={0.5} size={0.8} color={"#6B7280"} />

                <OrbitPath radius={30} />
                <Planet radius={30} speed={0.3} size={1.1} color={"#10B981"} />

                <OrbitPath radius={35} />
                <Planet radius={35} speed={0.2} size={1.2} color={"#FBBF24"} />

                <OrbitPath radius={45} />
                <PlanetWithMoon
                    radius={45}
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
                <OrbitPath radius={55} />
                <Planet radius={55} speed={0.08} size={1.8} color={"#c224fb"} />

                <OrbitPath radius={70} />
                <Planet radius={70} speed={0.05} size={2} color={"#24fb85"} />
            </Canvas>
        </div>
    );
};

export default Universe;
