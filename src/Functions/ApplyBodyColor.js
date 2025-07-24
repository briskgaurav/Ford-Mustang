import * as THREE from "three";

export const applyBodyColor = (name, materials, color) => {
    const mat = materials[name];
    if (mat && mat instanceof THREE.MeshStandardMaterial) {
      // Upgrade to MeshPhysicalMaterial if not already
      const newMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.9,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 1.0,
        envMapIntensity: 2.0,
        ior: 1.5,
        transmission: 0, // set > 0 for glass-like
      });
  
      // Copy other existing values if needed
      Object.assign(mat, newMaterial);
    }
  };