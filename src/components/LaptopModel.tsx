import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

import { usePortfolioTexture } from "./usePortfolioTexture";

const LAPTOP_MODEL = "/models/laptop/NPC_209.obj";
const LAPTOP_TEXTURE = "/models/laptop/NPC_209.webp";

const ScreenPlane = ({ texture }: { texture: THREE.Texture }) => (
  <mesh position={[0.005, 0.397, -0.351]} rotation={[-0.403, 0, 0]}>
    <planeGeometry args={[1.08, 0.63]} />
    <meshBasicMaterial map={texture} toneMapped={false} />
  </mesh>
);

const PortfolioScreen = () => {
  const texture = usePortfolioTexture();

  return <ScreenPlane texture={texture} />;
};

const ProjectScreen = ({ screenTexture }: { screenTexture: string }) => {
  const loadedTexture = useLoader(THREE.TextureLoader, screenTexture);

  const texture = useMemo(() => {
    const clone = loadedTexture.clone();
    clone.colorSpace = THREE.SRGBColorSpace;
    clone.needsUpdate = true;
    return clone;
  }, [loadedTexture]);

  return <ScreenPlane texture={texture} />;
};

export const LaptopModel = ({ screenTexture }: { screenTexture?: string }) => {
  const source = useLoader(OBJLoader, LAPTOP_MODEL);
  const casingTexture = useLoader(THREE.TextureLoader, LAPTOP_TEXTURE);

  const displayTexture = useMemo(() => {
    const texture = casingTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [casingTexture]);

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
      {screenTexture ? (
        <ProjectScreen screenTexture={screenTexture} />
      ) : (
        <PortfolioScreen />
      )}
    </group>
  );
};
