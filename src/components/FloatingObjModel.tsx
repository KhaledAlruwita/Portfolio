import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

interface FloatingObjModelProps {
  modelPath: string;
  texturePath: string;
  position?: [number, number, number];
  baseRotation?: [number, number, number];
  targetSize?: number;
  scrollTravel?: number;
  pixelated?: boolean;
}

export const FloatingObjModel = ({
  modelPath,
  texturePath,
  position = [0, 0, 0],
  baseRotation = [0, 0, 0],
  targetSize = 2.8,
  scrollTravel = 0.35,
  pixelated = false,
}: FloatingObjModelProps) => {
  const source = useLoader(OBJLoader, modelPath);
  const sourceTexture = useLoader(THREE.TextureLoader, texturePath);
  const animatedGroup = useRef<THREE.Group>(null);

  const normalizedModel = useMemo(() => {
    const model = source.clone(true);
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = pixelated ? THREE.NearestFilter : THREE.LinearFilter;
    texture.needsUpdate = true;

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
    });

    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const wrapper = new THREE.Group();

    model.position.sub(center);
    wrapper.add(model);
    wrapper.scale.setScalar(targetSize / largestDimension);
    wrapper.rotation.set(...baseRotation);

    return wrapper;
  }, [baseRotation, pixelated, source, sourceTexture, targetSize]);

  useFrame(({ clock }) => {
    if (!animatedGroup.current) return;
    const elapsed = clock.getElapsedTime();
    const scroll = typeof window === "undefined" ? 0 : window.scrollY;

    animatedGroup.current.position.set(
      position[0] + Math.sin(scroll * 0.003 + elapsed * 0.35) * scrollTravel,
      position[1] + Math.cos(scroll * 0.0025 + elapsed * 0.7) * 0.25,
      position[2]
    );
    animatedGroup.current.rotation.x = elapsed * 0.48 + scroll * 0.0018;
    animatedGroup.current.rotation.y = elapsed * 0.72 + scroll * 0.0028;
    animatedGroup.current.rotation.z = elapsed * 0.22 + scroll * 0.001;
  });

  return (
    <group ref={animatedGroup}>
      <primitive object={normalizedModel} />
    </group>
  );
};
