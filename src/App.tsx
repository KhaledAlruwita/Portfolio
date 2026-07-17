import { lazy, Suspense } from "react";

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

function App() {
  return (
    <main className="relative mx-auto max-w-7xl">
      <Navbar />

      <Hero />
      <Suspense fallback={<SectionFallback id="about" />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback id="projects" />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionFallback id="experience" />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionFallback id="contact" />}>
        <Contact />
      </Suspense>

      <Footer />
    </main>
  );
}

export default App;
