import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "../atoms/utils";
import createStarGeometry from "./Star";
import Planet from "./Planet";

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
        <PointCircle />

        {/* Add the planet with orbit */}
        <Planet radius={5} speed={0.5} size={0.5} color={"#6B7280"} />
        <Planet radius={8} speed={0.3} size={0.8} color={"#10B981"} />
      </Canvas>

      {/* <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-slate-200 font-medium text-2xl md:text-5xl pointer-events-none">
        Drag & Zoom
      </h1> */}
    </div>
  );
};

const PointCircle = () => {
  const ref = useRef(null);

  // useFrame(({ clock }) => {
  //   if (ref.current?.rotation) {
  //     ref.current.rotation.z = clock.getElapsedTime() * 0.05;
  //   }
  // });
  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
    ref.current.children.forEach((child, i) => {
      if (child.geometry.type === "ShapeGeometry") {
        const scale = Math.sin(clock.getElapsedTime() * 2 + i) * 0.2 + 1;
        child.scale.set(scale, scale, scale);
      }
    });
  });


  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

// const Point = ({ position, color }) => {
//   return (
//     <Sphere position={position} args={[0.1, 10, 10]}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={0.5}
//         roughness={0.5}
//         color={color}
//       />
//     </Sphere>
//   );
// };
// const Point = ({ position, color }) => {
//   const isStar = Math.random() > 0.5; // Randomly decide if the point is a star

//   return isStar ? (
//     <mesh position={position} geometry={createStarGeometry()}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={1}
//         roughness={0.5}
//         color={color}
//       />
//     </mesh>
//   ) : (
//     <Sphere position={position} args={[0.1, 10, 10]}>
//       <meshStandardMaterial
//         emissive={color}
//         emissiveIntensity={0.5}
//         roughness={0.5}
//         color={color}
//       />
//     </Sphere>
//   );
// };
const Point = ({ position, color }) => {
  const isStar = Math.random() > 0.5;
  const scale = Math.random() * 0.5 + 0.5; // Random scale for size variation

  return isStar ? (
      <mesh
          position={position}
          geometry={createStarGeometry()}
          scale={[scale, scale, scale]}
      >
          <meshStandardMaterial
              emissive={color}
              emissiveIntensity={1}
              roughness={0.5}
              color={color}
          />
      </mesh>
  ) : (
      <Sphere position={position} args={[0.1 * scale, 10, 10]}>
          <meshStandardMaterial
              emissive={color}
              emissiveIntensity={0.5}
              roughness={0.5}
              color={color}
          />
      </Sphere>
  );
};



export default Universe;
