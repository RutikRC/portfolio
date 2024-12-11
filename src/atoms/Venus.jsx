import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import venusTexture from "../assets/venus-surface-texture.jpg";

const Venus = ({ speed, size, orbitRadius }) => {
  const venusRef = useRef();
  const texture = useLoader(THREE.TextureLoader, venusTexture);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (venusRef.current) {
        venusRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius;
        venusRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius;
    }
  });

  return (
    <Sphere ref={venusRef} args={[size, 32, 32]}>
      <meshStandardMaterial map={texture} />
    </Sphere>
  );
};

export default Venus;
