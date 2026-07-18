import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef, type PropsWithChildren } from "react";
import * as THREE from "three";

interface HeroCameraProps {
  isMobile: boolean;
}

export const HeroCamera = ({
  children,
  isMobile,
}: PropsWithChildren<HeroCameraProps>) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);

    if (!groupRef.current) return;

    const pointerX = isMobile ? 0 : state.pointer.x;
    const pointerY = isMobile ? 0 : state.pointer.y;

    easing.damp3(
      groupRef.current.position,
      [pointerX * 0.85, pointerY * 0.45, 0],
      0.22,
      delta
    );
    easing.dampE(
      groupRef.current.rotation,
      [pointerY * 0.12, -pointerX * 0.24, pointerX * 0.015],
      0.22,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};
