import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import { CanvasLoader } from "../components/CanvasLoader";
import { LaptopModel } from "../components/LaptopModel";
import { WebGLGuard } from "../components/WebGLGuard";
import { workExperiences } from "../constants";

export const Experience = () => {
  return (
    <section className="c-space my-20" id="experience">
      <div className="w-full text-white-600">
        <h3 className="head-text">Experience</h3>

        <div className="work-container">
          <div className="laptop-showcase">
            <WebGLGuard
              fallback={
                <div className="laptop-fallback">
                  <span aria-hidden="true">☄️</span>
                  <strong>Data in motion</strong>
                </div>
              }
            >
              <Canvas
                camera={{ position: [0, 1.6, 5], fov: 36 }}
                shadows
                dpr={[1, 1.5]}
              >
                <ambientLight intensity={2.8} />
                <directionalLight
                  position={[4, 6, 5]}
                  intensity={3.4}
                  castShadow
                />
                <pointLight
                  position={[-3, 2, 2]}
                  intensity={2}
                  color="#38bdf8"
                />

                <Suspense fallback={<CanvasLoader />}>
                  <group scale={1.55} position={[0, -0.34, 0]}>
                    <LaptopModel />
                  </group>
                </Suspense>

                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 2}
                />
              </Canvas>
            </WebGLGuard>
          </div>

          <div className="work-content">
            <div className="experience-list">
              {workExperiences.map((experience) => (
                <article className="experience-item" key={experience.id}>
                  <div className="experience-company">
                    <img
                      src={experience.icon}
                      alt={`${experience.name} logo`}
                    />
                    <div>
                      <h4>{experience.name}</h4>
                      <p>{experience.employment}</p>
                    </div>
                  </div>

                  {experience.roles ? (
                    <div className="role-timeline">
                      {experience.roles.map((role) => (
                        <div className="role-item" key={role.position}>
                          <span aria-hidden="true" />
                          <div>
                            <h5>{role.position}</h5>
                            <p>{role.duration}</p>
                            <p>{role.location}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="experience-details">
                      <h5>{experience.position}</h5>
                      <p>{experience.duration}</p>
                      <p>{experience.location}</p>
                      {experience.description ? (
                        <details className="experience-disclosure">
                          <summary>View responsibilities</summary>
                          <p>{experience.description}</p>
                        </details>
                      ) : null}
                      <div className="experience-skills">
                        {experience.skills?.map((skill) => (
                          <span key={skill}>{skill}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
