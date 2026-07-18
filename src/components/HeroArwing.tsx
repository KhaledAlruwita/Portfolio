import { useGLTF } from "@react-three/drei";
import { useFrame, type GroupProps } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

const MODEL_PATH = "/models/hero-arwing/model.glb";

export const HeroArwing = (props: GroupProps) => {
  const animatedRef = useRef<THREE.Group>(null);
  const smoothedScroll = useRef(0);
  const { scene } = useGLTF(MODEL_PATH);

  const arwing = useMemo(() => {
    const model = cloneSkeleton(scene);

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mesh = child as THREE.Mesh<
        THREE.BufferGeometry,
        THREE.Material | THREE.Material[]
      >;
      const sourceMaterials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      const clonedMaterials = sourceMaterials.map((material) => {
        const cloned = material.clone();

        if ("map" in cloned && cloned.map instanceof THREE.Texture) {
          cloned.map.colorSpace = THREE.SRGBColorSpace;
          cloned.map.needsUpdate = true;
        }
        cloned.side = THREE.DoubleSide;

        return cloned;
      });

      mesh.material = Array.isArray(mesh.material)
        ? clonedMaterials
        : clonedMaterials[0];
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });

    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().setFromObject(model);
    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const wrapper = new THREE.Group();

    model.position.sub(center);
    wrapper.add(model);
    wrapper.scale.setScalar(2.8 / largestDimension);
    wrapper.rotation.set(0.24, -0.72, 0.06);

    return wrapper;
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (!animatedRef.current) return;
    const scrollTarget = typeof window === "undefined" ? 0 : window.scrollY;
    smoothedScroll.current = THREE.MathUtils.damp(
      smoothedScroll.current,
      scrollTarget,
      1.5,
      delta
    );
    const elapsed = clock.elapsedTime;
    const scroll = smoothedScroll.current;

    animatedRef.current.position.y = Math.sin(elapsed * 0.62) * 0.18;
    animatedRef.current.rotation.x = Math.sin(elapsed * 0.42) * 0.07;
    animatedRef.current.rotation.y =
      Math.sin(elapsed * 0.34) * 0.14 + scroll * 0.00012;
    animatedRef.current.rotation.z = Math.cos(elapsed * 0.31) * 0.05;
  });

  return (
    <group {...props}>
      <group ref={animatedRef}>
        <primitive object={arwing} />
      </group>
    </group>
  );
};

useGLTF.preload(MODEL_PATH);
