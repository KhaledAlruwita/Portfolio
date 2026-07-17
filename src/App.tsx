import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { Footer } from "./sections/Footer";
import { Hero } from "./sections/Hero";
import { Navbar } from "./sections/Navbar";

const About = lazy(() =>
  import("./sections/About").then((module) => ({ default: module.About }))
);
const Projects = lazy(() =>
  import("./sections/Projects").then((module) => ({ default: module.Projects }))
);
const Experience = lazy(() =>
  import("./sections/Experience").then((module) => ({
    default: module.Experience,
  }))
);
const Contact = lazy(() =>
  import("./sections/Contact").then((module) => ({ default: module.Contact }))
);

const SectionFallback = ({ id }: { id: string }) => (
  <section className="c-space my-20 min-h-96" id={id} aria-busy="true">
    <div className="h-10 w-64 animate-pulse rounded-lg bg-white/5" />
    <div className="mt-8 h-72 animate-pulse rounded-xl border border-white/5 bg-black-200" />
  </section>
);

const ViewportSection = ({
  children,
  id,
  priority = false,
}: {
  children: ReactNode;
  id: string;
  priority?: boolean;
}) => {
  const [isNearViewport, setIsNearViewport] = useState(priority);
  const boundaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNearViewport || !boundaryRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsNearViewport(true);
        observer.disconnect();
      },
      { rootMargin: "450px 0px" }
    );

    observer.observe(boundaryRef.current);
    return () => observer.disconnect();
  }, [isNearViewport]);

  return (
    <div ref={boundaryRef}>
      {isNearViewport ? children : <SectionFallback id={id} />}
    </div>
  );
};

function App() {
  const [showSections, setShowSections] = useState(false);
  const revealSections = useCallback(() => setShowSections(true), []);

  useEffect(() => {
    if (showSections) return;

    const handleInitialWheel = (event: WheelEvent) => {
      revealSections();
      if (event.deltaY <= 0) return;

      window.setTimeout(() => {
        window.scrollBy({
          top: Math.min(Math.max(event.deltaY, 72), 150),
          behavior: "smooth",
        });
      }, 80);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        revealSections();
      }
    };

    window.addEventListener("wheel", handleInitialWheel, {
      passive: true,
      once: true,
    });
    window.addEventListener("touchmove", revealSections, {
      passive: true,
      once: true,
    });
    window.addEventListener("scroll", revealSections, {
      passive: true,
      once: true,
    });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleInitialWheel);
      window.removeEventListener("touchmove", revealSections);
      window.removeEventListener("scroll", revealSections);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [revealSections, showSections]);

  useEffect(() => {
    if (!showSections) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let currentScroll = window.scrollY;
    let targetScroll = currentScroll;
    let animationFrame = 0;
    let previousFrameTime = performance.now();
    const scrollRoot = document.documentElement;
    const previousInlineScrollBehavior = scrollRoot.style.scrollBehavior;

    const getMaximumScroll = () =>
      Math.max(document.documentElement.scrollHeight - window.innerHeight, 0);

    const animateScroll = (frameTime: number) => {
      const elapsedSeconds = Math.min(
        Math.max((frameTime - previousFrameTime) / 1000, 0),
        0.1
      );
      previousFrameTime = frameTime;
      const distance = targetScroll - currentScroll;
      const easing = 1 - Math.exp(-8 * elapsedSeconds);
      currentScroll += distance * easing;
      window.scrollTo(0, currentScroll);

      if (Math.abs(distance) > 0.35) {
        animationFrame = window.requestAnimationFrame(animateScroll);
      } else {
        window.scrollTo(0, targetScroll);
        animationFrame = 0;
        scrollRoot.style.scrollBehavior = previousInlineScrollBehavior;
      }
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || Math.abs(event.deltaY) < 0.5)
        return;

      event.preventDefault();
      const deltaScale =
        event.deltaMode === WheelEvent.DOM_DELTA_LINE
          ? 24
          : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
            ? window.innerHeight
            : 1;
      targetScroll = Math.min(
        Math.max(targetScroll + event.deltaY * deltaScale * 0.9, 0),
        getMaximumScroll()
      );

      if (!animationFrame) {
        currentScroll = window.scrollY;
        previousFrameTime = performance.now();
        scrollRoot.style.scrollBehavior = "auto";
        animationFrame = window.requestAnimationFrame(animateScroll);
      }
    };

    const synchronizeScroll = () => {
      if (animationFrame) return;
      currentScroll = window.scrollY;
      targetScroll = currentScroll;
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });
    window.addEventListener("scroll", synchronizeScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("scroll", synchronizeScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      scrollRoot.style.scrollBehavior = previousInlineScrollBehavior;
    };
  }, [showSections]);

  return (
    <main className="relative mx-auto max-w-7xl">
      <Navbar onRevealSections={revealSections} />
      <Hero isActivated={showSections} onExplore={revealSections} />

      {showSections ? (
        <>
          <ViewportSection id="about" priority>
            <Suspense fallback={<SectionFallback id="about" />}>
              <About />
            </Suspense>
          </ViewportSection>
          <ViewportSection id="projects">
            <Suspense fallback={<SectionFallback id="projects" />}>
              <Projects />
            </Suspense>
          </ViewportSection>
          <ViewportSection id="experience">
            <Suspense fallback={<SectionFallback id="experience" />}>
              <Experience />
            </Suspense>
          </ViewportSection>
          <ViewportSection id="contact">
            <Suspense fallback={<SectionFallback id="contact" />}>
              <Contact />
            </Suspense>
          </ViewportSection>

          <Footer />
        </>
      ) : (
        <div className="sr-only" aria-live="polite">
          Scroll down to load the rest of the portfolio.
        </div>
      )}
    </main>
  );
}

export default App;
