import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import marsTexture from "../assets/mars-texture.jpg";

const Mars = ({ speed, size, orbitRadius }) => {
  const marsRef = useRef();
  const texture = useLoader(THREE.TextureLoader, marsTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (marsRef.current) {
        marsRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
        marsRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
    }
  });

  return (
    <Sphere ref={marsRef} args={[size, 32, 32]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

export default Mars;
