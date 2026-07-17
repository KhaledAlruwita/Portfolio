import { useGSAP } from "@gsap/react";
import { Center, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Suspense, useState } from "react";

import { CanvasLoader } from "../components/CanvasLoader";
import { LaptopModel } from "../components/LaptopModel";
import { WebGLGuard } from "../components/WebGLGuard";
import { myProjects } from "../constants";
import { referenceAsset } from "../constants/assets";

const projectOrder = [2, 0, 1, 3] as const;

export const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(2);

  const currentProject = myProjects[selectedProjectIndex];
  const projectCount = myProjects.length;

  const handleNavigation = (direction: "previous" | "next" = "next") => {
    setSelectedProjectIndex((prevIndex) => {
      if (direction === "previous") {
        return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
      } else {
        return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.animatedText`,
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  }, [selectedProjectIndex]);

  return (
    <section className="c-space my-20" id="projects">
      <p className="head-text">Featured projects</p>

      <p className="mt-3 max-w-2xl text-white-600">
        Selected data engineering and analytics work, from automated pipelines
        to decision-support systems.
      </p>

      <div className="project-selector" aria-label="Choose a featured project">
        {projectOrder.map((index) => {
          const project = myProjects[index];

          return (
            <button
              type="button"
              key={project.title}
              onClick={() => setSelectedProjectIndex(index)}
              aria-pressed={selectedProjectIndex === index}
              className={selectedProjectIndex === index ? "is-active" : ""}
            >
              <img src={project.logo} alt="" />
              <span>{project.title}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid w-full grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="relative flex flex-col gap-5 px-5 py-10 shadow-2xl shadow-black-200 sm:p-10">
          <div className="absolute right-0 top-0">
            <img
              src={currentProject.spotlight}
              alt="Spotlight"
              className="pointer-events-none h-96 w-full select-none rounded-xl object-cover"
            />
          </div>

          <div
            className="w-fit rounded-lg p-3 backdrop-blur-3xl backdrop-filter"
            style={currentProject.logoStyle}
          >
            <img
              src={currentProject.logo}
              alt={`${currentProject.title} preview`}
              className="size-10 rounded object-cover shadow-sm"
            />
          </div>

          <div className="my-5 flex flex-col gap-5 text-white-600">
            <p className="animatedText text-2xl font-semibold text-white">
              {currentProject.title}
            </p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>

            <div className="animatedText flex flex-wrap gap-2">
              {currentProject.metrics.map((metric) => (
                <span className="project-metric" key={metric}>
                  {metric}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5">
            <div className="flex flex-wrap items-center gap-2">
              {currentProject.tags.map((tag) => (
                <span
                  key={`${currentProject.title}-${tag}`}
                  className="tech-pill"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {currentProject.links.map(({ href, label }) => (
                <a
                  href={href}
                  key={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="project-link"
                >
                  <span>{label}</span>
                  <img
                    src={referenceAsset("assets/arrow-up.png")}
                    className="size-3"
                    alt=""
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between">
            <button
              className="arrow-btn"
              onClick={() => handleNavigation("previous")}
              aria-label="Previous project"
            >
              <img
                src={referenceAsset("assets/left-arrow.png")}
                alt="Left arrow"
                className="size-4"
              />
            </button>

            <button
              className="arrow-btn"
              onClick={() => handleNavigation("next")}
              aria-label="Next project"
            >
              <img
                src={referenceAsset("assets/right-arrow.png")}
                alt="Right arrow"
                className="size-4"
              />
            </button>
          </div>
        </div>

        <div className="h-96 rounded-lg border border-black-300 bg-black-200 md:h-full">
          <WebGLGuard
            fallback={
              <div className="project-fallback">
                <img
                  src={currentProject.fallbackImage}
                  alt={`${currentProject.title} project`}
                />
              </div>
            }
          >
            <Canvas camera={{ position: [0, 1.5, 5], fov: 36 }}>
              <ambientLight intensity={Math.PI} />
              <directionalLight position={[10, 10, 5]} />

              <Center>
                <Suspense fallback={<CanvasLoader />}>
                  <group
                    scale={1.4}
                    position={[0, -0.25, 0]}
                    rotation={[0, 0.08, 0]}
                  >
                    <LaptopModel screenTexture={currentProject.texture} />
                  </group>
                </Suspense>
              </Center>

              <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
            </Canvas>
          </WebGLGuard>
        </div>
      </div>
    </section>
  );
};
