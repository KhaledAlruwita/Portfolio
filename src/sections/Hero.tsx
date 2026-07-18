import { lazy, Suspense } from "react";
import { useMediaQuery } from "react-responsive";

import { Button } from "../components/Button";
import { WebGLGuard } from "../components/WebGLGuard";
import { links } from "../constants";

const HeroScene = lazy(() => import("../components/HeroScene"));

interface HeroProps {
  isActivated: boolean;
  onExplore: () => void;
}

export const Hero = ({ isActivated, onExplore }: HeroProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });
  const shouldRenderScene = !prefersReducedMotion && (isMobile || isActivated);
  const sceneFallback = (
    <div className="hero-fallback" aria-hidden="true">
      <div className="hero-fallback_glow" />
      <img src="/images/pfp.svg" alt="" />
      <div className="hero-fallback_code">Python · SQL · PySpark · Airflow</div>
    </div>
  );

  return (
    <section className="relative flex min-h-screen w-full flex-col" id="home">
      <div className="c-space relative z-10 mx-auto mt-20 flex w-full flex-col gap-3 sm:mt-32">
        <p className="text-center font-generalsans text-xl font-medium text-white sm:text-3xl">
          Hi, I&apos;m Khaled Alruwita <span className="meteor-icon">☄️</span>
        </p>

        <p className="hero_tag text-gray_gradient">
          Data Engineer &amp; Analyst
        </p>

        <p className="mx-auto max-w-2xl text-center text-sm text-white-600 sm:text-base">
          I build reliable data pipelines, analytics platforms, and automation
          that turn complex information into decisions.
        </p>
      </div>

      <div className="absolute inset-0 size-full">
        {shouldRenderScene ? (
          <WebGLGuard fallback={sceneFallback}>
            <Suspense fallback={sceneFallback}>
              <HeroScene />
            </Suspense>
          </WebGLGuard>
        ) : (
          sceneFallback
        )}
      </div>

      <div className="c-space absolute bottom-7 left-0 right-0 z-10 mx-auto flex w-full max-w-3xl flex-col gap-3 sm:flex-row">
        <Button
          isBeam
          containerClass="sm:w-fit w-full sm:min-w-96"
          href="#projects"
          onClick={onExplore}
        >
          <span className="explore-label">
            <strong>Explore my work</strong>
            <small>Scroll down ↓</small>
          </span>
        </Button>

        <Button href={links.cv} target="_blank" containerClass="w-full sm:w-44">
          View CV
        </Button>
      </div>
    </section>
  );
};
