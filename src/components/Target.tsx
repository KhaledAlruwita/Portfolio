import { useGSAP } from "@gsap/react";
import { useGLTF } from "@react-three/drei";
import { useFrame, type MeshProps } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import type * as THREE from "three";

import { referenceAsset } from "../constants/assets";

const TARGET_MODEL = referenceAsset("models/target.gltf");

export const Target = (props: MeshProps) => {
  const targetRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF(TARGET_MODEL);

  useGSAP(() => {
    if (!targetRef.current) return;

    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  useFrame(({ clock }) => {
    if (!targetRef.current) return;
    const scroll = typeof window === "undefined" ? 0 : window.scrollY;
    targetRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.45) * 0.18;
    targetRef.current.rotation.y =
      Math.PI / 5 + clock.elapsedTime * 0.38 + scroll * 0.002;
    targetRef.current.rotation.z = scroll * 0.0008;
  });

  return (
    <mesh {...props} ref={targetRef} rotation={[0, Math.PI / 5, 0]} scale={1.5}>
      <primitive object={scene} />
    </mesh>
  );
};
