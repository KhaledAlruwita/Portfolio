import Globe from "react-globe.gl";

import { Button } from "../components/Button";
import { WebGLGuard } from "../components/WebGLGuard";
import { techStackGroups } from "../constants";
import { referenceAsset } from "../constants/assets";

export const About = () => {
  return (
    <section className="c-space my-20" id="about">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-5">
          <div className="grid-container">
            <img
              src="/images/pfp.svg"
              alt="Khaled Alruwita"
              className="h-fit w-full rounded-2xl object-contain sm:h-[276px]"
            />

            <div>
              <p className="grid-headtext">Building dependable data systems</p>
              <p className="grid-subtext">
                I design end-to-end pipelines and analytical platforms that make
                data reliable, understandable, and ready for action.
              </p>
            </div>
          </div>

          <div className="grid-container">
            <div
              className="data-flow"
              aria-label="Raw data to business insight"
            >
              <span>Raw data</span>
              <i>→</i>
              <span>Reliable pipelines</span>
              <i>→</i>
              <span>Business insight</span>
            </div>

            <div>
              <p className="grid-headtext">From raw data to decisions</p>
              <p className="grid-subtext">
                I build automated ETL workflows, dimensional data models, data
                quality checks, and analytics-ready datasets using Python, SQL,
                PySpark, Airflow, and PostgreSQL.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid-container">
            <img
              src={referenceAsset("assets/grid2.png")}
              alt="Data engineering technology stack"
              className="h-fit w-full object-contain sm:w-[276px]"
            />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <div className="stack-groups">
                {techStackGroups.map(({ label, tools }) => (
                  <div className="stack-group" key={label}>
                    <span>{label}</span>
                    <div>
                      {tools.map((tool) => (
                        <strong key={tool}>{tool}</strong>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid-container">
            <div className="certificate-mark" aria-hidden="true">
              ✓
            </div>

            <div className="space-y-3">
              <p className="grid-headtext">My Certificates</p>
              <ul className="certificate-list">
                <li>
                  <strong>CDMP® Associate</strong>
                  <span>DAMA International</span>
                </li>
                <li>
                  <strong>Business Analysis Fundamentals</strong>
                  <span>Tuwaiq Academy</span>
                </li>
              </ul>

              <Button href="/CV.pdf" target="_blank" containerClass="w-full">
                View in CV
              </Button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 xl:col-span-1">
          <div className="grid-container">
            <div className="flex h-fit w-full items-center justify-center rounded-3xl sm:h-[326px]">
              <WebGLGuard
                fallback={
                  <img
                    src={referenceAsset("assets/earth-night.jpg")}
                    alt="Riyadh, Saudi Arabia"
                    className="globe-fallback"
                  />
                }
              >
                <Globe
                  height={326}
                  width={326}
                  backgroundColor="rgba(0, 0, 0, 0)"
                  showAtmosphere
                  globeImageUrl={referenceAsset("assets/earth-night.jpg")}
                  bumpImageUrl={referenceAsset("assets/earth-topology.png")}
                  labelsData={[
                    {
                      lat: 24.7136,
                      lng: 46.6753,
                      text: "Riyadh",
                      color: "white",
                      size: 20,
                    },
                  ]}
                />
              </WebGLGuard>
            </div>

            <div>
              <p className="grid-headtext">Based in Riyadh, Saudi Arabia</p>

              <Button href="#contact" containerClass="w-full mt-6" isBeam>
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
