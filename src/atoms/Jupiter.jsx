import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import jupiterTexture from "../assets/jupiter-texture.jpg";

const Jupiter = ({ speed, size, orbitRadius }) => {
  const jupiterRef = useRef();
  const texture = useLoader(THREE.TextureLoader, jupiterTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (jupiterRef.current) {
      jupiterRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
      jupiterRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
    }
  });

  return (
    <Sphere ref={jupiterRef} args={[size, 32, 32]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

export default Jupiter;
