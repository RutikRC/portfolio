
import React, { useRef } from 'react';
import { Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

const Planet = ({ radius, speed, size, color }) => {
    const ref = useRef();

    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        // Move the planet along a circular orbit based on the current time
        const x = Math.cos(time * speed) * radius;
        const z = Math.sin(time * speed) * radius;
        if (ref.current) {
            ref.current.position.set(x, 0, z); // Adjust the orbit's plane (y stays 0)
        }
    });

    return (
        <Sphere ref={ref} args={[size, 32, 32]}>
            <meshStandardMaterial
                color={color}
                roughness={0.7}
                metalness={0.3}
            />
        </Sphere>
    );
};

export default Planet;