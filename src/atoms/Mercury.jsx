import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import mercuryTexture from "../assets/mercury-texture.jpg";

const Mercury = ({ speed, size, orbitRadius }) => {
  const mercuryRef = useRef();
  const texture = useLoader(THREE.TextureLoader, mercuryTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (mercuryRef.current) {
      mercuryRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
      mercuryRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
    }
  });

  return (
    <Sphere ref={mercuryRef} args={[size, 32, 32]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

export default Mercury;
