import * as THREE from "three";

export const applyBodyColor = (name, materials, color) => {
  if (!materials || !materials[name]) return; // safety check

  const mat = materials[name];
  if (!(mat instanceof THREE.MeshStandardMaterial)) return;

  const baseColor = new THREE.Color(color);
  baseColor.convertSRGBToLinear();

  const newMaterial = new THREE.MeshPhysicalMaterial({
    color: baseColor,
    // metalness: 0.9,
    // roughness: 0.05,
    // clearcoat: 1.0,
    // clearcoatRoughness: 0.03,
    // reflectivity: 1.0,
    // envMapIntensity: 2.5,
    // ior: 1.5,
    // transmission: 0,
  });

  Object.assign(mat, newMaterial);
};
