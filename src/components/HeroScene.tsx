import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, type Vector3 } from "@react-three/fiber";
import { type ReactNode, Suspense, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import * as THREE from "three";

import { calculateSizes } from "../lib/utils";
import { CanvasLoader } from "./CanvasLoader";
import { Cube } from "./Cube";
import { FloatingObjModel } from "./FloatingObjModel";
import { HeroCamera } from "./HeroCamera";
import { LaptopModel } from "./LaptopModel";
import { Rings } from "./Rings";
import { Target } from "./Target";

const ScrollReactiveObjects = ({ children }: { children: ReactNode }) => {
  const groupRef = useRef<THREE.Group>(null);
  const smoothedScroll = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!groupRef.current) return;
    const targetScroll = typeof window === "undefined" ? 0 : window.scrollY;
    smoothedScroll.current = THREE.MathUtils.damp(
      smoothedScroll.current,
      targetScroll,
      2,
      delta
    );
    const scroll = smoothedScroll.current;
    groupRef.current.position.x = Math.sin(scroll * 0.002) * 0.45;
    groupRef.current.position.y =
      -Math.min(scroll * 0.0025, 2.5) +
      Math.sin(clock.elapsedTime * 0.5) * 0.12;
  });

  return <group ref={groupRef}>{children}</group>;
};

const HeroScene = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <Canvas className="size-full" aria-hidden="true">
      <Suspense fallback={<CanvasLoader />}>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

        <HeroCamera isMobile={isMobile}>
          <group
            scale={5.4}
            position={[0, -1.8, 0]}
            rotation={[0.08, -0.18, 0]}
          >
            <LaptopModel />
          </group>
        </HeroCamera>

        <ScrollReactiveObjects>
          <Target position={sizes.targetPosition as Vector3} />
          <Rings position={sizes.ringPosition as [number, number, number]} />
          <Cube position={sizes.cubePosition as Vector3} />
          <FloatingObjModel
            modelPath="/models/blitz-ball/model.obj"
            texturePath="/models/blitz-ball/texture.webp"
            position={sizes.blitzBallPosition as [number, number, number]}
            baseRotation={[0.2, -0.35, 0]}
            targetSize={3.2}
            scrollTravel={0.5}
          />
        </ScrollReactiveObjects>

        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
