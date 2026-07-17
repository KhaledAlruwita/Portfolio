import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";

import { CanvasLoader } from "./CanvasLoader";
import { FloatingObjModel } from "./FloatingObjModel";
import { WebGLGuard } from "./WebGLGuard";

export const ScrollArwing = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > window.innerHeight * 0.55);
      });
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <div
      className={`scroll-arwing ${isVisible ? "is-visible" : ""}`}
      aria-hidden="true"
    >
      <WebGLGuard fallback={<div />}>
        <Canvas camera={{ position: [0, 0, 5], fov: 34 }} dpr={[1, 1.5]}>
          <Suspense fallback={<CanvasLoader />}>
            <FloatingObjModel
              modelPath="/models/arwing/model.obj"
              texturePath="/models/arwing/palette.png"
              baseRotation={[0.18, 0.35, -0.3]}
              targetSize={3.35}
              scrollTravel={0.65}
              pixelated
            />
          </Suspense>
        </Canvas>
      </WebGLGuard>
    </div>
  );
};
