import React from "react";
import * as THREE from "three";
import { Sphere } from "@react-three/drei";
import starsTexture from "../assets/stars-texture.jpg"; // Import stars texture

const Stars = () => {
  // Load the stars texture
  const texture = new THREE.TextureLoader().load(starsTexture);

  return (
    <Sphere args={[700, 64, 64]} scale={[-1, 1, 1]} /* Flip the sphere inside out */>
      <meshBasicMaterial map={texture} side={THREE.BackSide} /> {/* Apply texture */}
    </Sphere>
  );
};

export default Stars;
