import { AboutModel } from "../components/AboutModel";
import { Button } from "../components/Button";
import { techStackGroups } from "../constants";

export const About = () => {
  return (
    <section className="c-space my-20" id="about">
      <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-3">
        <div className="flex flex-col gap-5">
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
            <AboutModel kind="arwing" label="Animated Star Fox Arwing" />

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
        </div>

        <div className="flex flex-col gap-5 md:col-span-2 xl:col-span-1">
          <div className="grid-container">
            <AboutModel kind="mailbox" label="Animated mailbox" />

            <Button href="#contact" containerClass="w-full" isBeam>
              Contact Me
            </Button>
          </div>

          <div className="grid-container">
            <AboutModel
              kind="certificate"
              label="Animated Pokémon Pokédex certificate"
            />

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
      </div>
    </section>
  );
};
