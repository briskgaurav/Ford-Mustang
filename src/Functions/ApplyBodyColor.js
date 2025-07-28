import * as THREE from "three";

export const applyBodyColor = (name, materials, color) => {
  const mat = materials[name];
  if (mat && mat instanceof THREE.MeshStandardMaterial) {
    const baseColor = new THREE.Color(color);
    baseColor.convertSRGBToLinear();

    const newMaterial = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      metalness: 0.9,
      roughness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMapIntensity: 2.5, // boosted for mac
      ior: 1.5,
      transmission: 0,
    });

    Object.assign(mat, newMaterial);
  }
};
