import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

const BRIEFCASE_MODEL = "/models/briefcase/model.obj";
const BRIEFCASE_TEXTURE = "/models/briefcase/texture.webp";

export const BriefcaseModel = () => {
  const source = useLoader(OBJLoader, BRIEFCASE_MODEL);
  const sourceTexture = useLoader(THREE.TextureLoader, BRIEFCASE_TEXTURE);

  const briefcase = useMemo(() => {
    const model = source.clone(true);
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      child.material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        toneMapped: false,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    });

    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const wrapper = new THREE.Group();

    model.position.sub(center);
    wrapper.add(model);
    wrapper.scale.setScalar(2.6 / largestDimension);
    wrapper.rotation.set(0.05, -0.5, -0.02);

    return wrapper;
  }, [source, sourceTexture]);

  return <primitive object={briefcase} />;
};
