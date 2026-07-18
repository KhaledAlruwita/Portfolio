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

const ScrollReactiveObjects = ({
  children,
  isMobile,
}: {
  children: ReactNode;
  isMobile: boolean;
}) => {
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
    groupRef.current.position.x =
      Math.sin(scroll * 0.002) * (isMobile ? 0.2 : 0.45);
    groupRef.current.position.y =
      -(isMobile ? 0 : Math.min(scroll * 0.0025, 2.5)) +
      Math.sin(clock.elapsedTime * 0.5) * 0.12;
    groupRef.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.22) * (isMobile ? 0.018 : 0.01);
  });

  return <group ref={groupRef}>{children}</group>;
};

const HeroScene = () => {
  const isSmall = useMediaQuery({ maxWidth: 480 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  const laptopScale = isSmall ? 4.2 : isMobile ? 4.6 : 5.4;
  const laptopY = isSmall ? -1.15 : isMobile ? -1.35 : -1.8;

  return (
    <Canvas
      className="size-full"
      aria-hidden="true"
      dpr={isMobile ? [1, 1.35] : [1, 2]}
      gl={{
        alpha: true,
        antialias: !isMobile,
        powerPreference: "high-performance",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

        <HeroCamera isMobile={isMobile}>
          <group
            scale={laptopScale}
            position={[0, laptopY, 0]}
            rotation={isMobile ? [0.04, -0.08, 0] : [0.08, -0.18, 0]}
          >
            <LaptopModel />
          </group>
        </HeroCamera>

        <ScrollReactiveObjects isMobile={isMobile}>
          <group scale={isMobile ? 0.68 : 1}>
            <Target position={sizes.targetPosition as Vector3} />
          </group>
          <Rings position={sizes.ringPosition as [number, number, number]} />
          <Cube
            position={sizes.cubePosition as Vector3}
            scale={isSmall ? 0.48 : isMobile ? 0.58 : 0.74}
          />
          <FloatingObjModel
            modelPath="/models/blitz-ball/model.obj"
            texturePath="/models/blitz-ball/texture.webp"
            position={sizes.blitzBallPosition as [number, number, number]}
            baseRotation={[0.2, -0.35, 0]}
            targetSize={isMobile ? 1.75 : 3.2}
            scrollTravel={isMobile ? 0.2 : 0.5}
          />
        </ScrollReactiveObjects>

        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
