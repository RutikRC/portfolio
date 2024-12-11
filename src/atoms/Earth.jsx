import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import earthTexture from "../assets/earth-day.jpg";

const Earth = ({ speed, size, orbitRadius }) => {
  const earthRef = useRef();
  const texture = useLoader(THREE.TextureLoader, earthTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (earthRef.current) {
        earthRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
        earthRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
    }
  });

  return (
    <Sphere ref={earthRef} args={[size, 32, 32]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

export default Earth;
