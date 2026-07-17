import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, type Vector3 } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";

import { calculateSizes } from "../lib/utils";
import { CanvasLoader } from "./CanvasLoader";
import { Cube } from "./Cube";
import { HackerRoom } from "./HackerRoom";
import { HeroCamera } from "./HeroCamera";
import { ReactLogo } from "./ReactLogo";
import { Rings } from "./Rings";
import { Target } from "./Target";

const HeroScene = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <Canvas className="size-full">
      <Suspense fallback={<CanvasLoader />}>
        <PerspectiveCamera makeDefault position={[0, 0, 30]} />

        <HeroCamera isMobile={isMobile}>
          <HackerRoom
            scale={sizes.deskScale}
            position={sizes.deskPosition as Vector3}
            rotation={[0.1, -Math.PI, 0]}
          />
        </HeroCamera>

        <group>
          <Target position={sizes.targetPosition as Vector3} />
          <ReactLogo position={sizes.reactLogoPosition as Vector3} />
          <Rings position={sizes.ringPosition as [number, number, number]} />
          <Cube position={sizes.cubePosition as Vector3} />
        </group>

        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
