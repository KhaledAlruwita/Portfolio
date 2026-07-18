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

    const elapsed = state.clock.getElapsedTime();
    const travel = isMobile ? 0.12 : 0.28;

    easing.damp3(
      groupRef.current.position,
      [
        Math.sin(elapsed * 0.34) * travel,
        Math.cos(elapsed * 0.42) * travel * 0.58,
        0,
      ],
      0.55,
      delta
    );
    easing.dampE(
      groupRef.current.rotation,
      [
        Math.sin(elapsed * 0.28) * 0.022,
        Math.cos(elapsed * 0.24) * 0.035,
        Math.sin(elapsed * 0.2) * 0.012,
      ],
      0.55,
      delta
    );
  });

  return <group ref={groupRef}>{children}</group>;
};
