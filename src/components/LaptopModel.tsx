import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { useMeteorTexture } from "./useMeteorTexture";

const LAPTOP_MODEL = "/models/laptop/NPC_209.obj";
const LAPTOP_TEXTURE = "/models/laptop/NPC_209.png";

export const LaptopModel = ({ screenTexture }: { screenTexture?: string }) => {
  const source = useLoader(OBJLoader, LAPTOP_MODEL);
  const casingTexture = useLoader(THREE.TextureLoader, LAPTOP_TEXTURE);
  const loadedScreenTexture = useLoader(
    THREE.TextureLoader,
    screenTexture ?? LAPTOP_TEXTURE
  );
  const meteorTexture = useMeteorTexture();

  const displayTexture = useMemo(() => {
    const texture = casingTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [casingTexture]);

  const customScreenTexture = useMemo(() => {
    const texture = loadedScreenTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [loadedScreenTexture]);

  const laptop = useMemo(() => {
    const clone = source.clone(true);

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: displayTexture,
          roughness: 0.72,
          metalness: 0.08,
        });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    return clone;
  }, [displayTexture, source]);

  return (
    <group rotation={[0, -0.28, 0]}>
      <primitive object={laptop} />

      <mesh position={[0.005, 0.397, -0.351]} rotation={[-0.403, 0, 0]}>
        <planeGeometry args={[1.08, 0.63]} />
        <meshBasicMaterial
          map={screenTexture ? customScreenTexture : meteorTexture}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};
