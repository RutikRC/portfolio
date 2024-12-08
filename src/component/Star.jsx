import * as THREE from "three";

const createStarGeometry = () => {
    const starShape = new THREE.Shape();
    const spikes = 5;
    const outerRadius = 0.2;
    const innerRadius = 0.1;

    // Create a 2D star shape
    for (let i = 0; i < spikes * 2; i++) {
        const angle = (i / (spikes * 2)) * Math.PI * 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (i === 0) {
            starShape.moveTo(x, y);
        } else {
            starShape.lineTo(x, y);
        }
    }
    starShape.closePath();

    // Extrude the 2D star shape into a 3D geometry
    const extrudeSettings = {
        depth: 0.1, // Thickness of the star
        bevelEnabled: true, // Add beveled edges
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0.02,
        bevelThickness: 0.02,
    };

    return new THREE.ExtrudeGeometry(starShape, extrudeSettings);
};

export default createStarGeometry;
