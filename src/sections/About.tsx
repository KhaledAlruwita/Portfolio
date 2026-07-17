import { useState } from "react";
import Globe from "react-globe.gl";

import { Button } from "../components/Button";
import { WebGLGuard } from "../components/WebGLGuard";
import { links } from "../constants";
import { referenceAsset } from "../constants/assets";

export const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    void navigator.clipboard.writeText(links.contactEmail);

    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid h-full grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6">
        <div className="col-span-1 xl:row-span-3">
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
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src={referenceAsset("assets/grid2.png")}
              alt="Data engineering technology stack"
              className="h-fit w-full object-contain sm:w-[276px]"
            />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                Python, SQL, PySpark, Airflow, PostgreSQL, Power BI, Docker,
                Linux, and cloud services across AWS, Alibaba, and Oracle.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
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

              <p className="grid-subtext">
                Open to data engineering, analytics, and automation
                opportunities where measurable business impact matters.
              </p>

              <Button href="#contact" containerClass="w-full mt-10" isBeam>
                Contact Me
              </Button>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
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
                My work combines engineering discipline with analytical
                thinking: automate the repetitive parts, surface quality issues
                early, and make the final output useful to people.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src={referenceAsset("assets/grid4.png")}
              alt="Grid 4"
              className="h-fit w-full object-cover sm:h-[276px] sm:object-top md:h-[126px]"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">
                Reach me directly by email
              </p>

              <div className="copy-container">
                <Button onClick={handleCopy} containerClass="w-full">
                  <img
                    src={referenceAsset(
                      hasCopied ? "assets/tick.svg" : "assets/copy.svg"
                    )}
                    alt={hasCopied ? "Check" : "Copy"}
                    className="size-5"
                  />
                  {hasCopied ? "Copied to clipboard" : "Copy Email"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
