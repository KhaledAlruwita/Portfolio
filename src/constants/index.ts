export const links = {
  contactEmail: "alruwita.k@gmail.com",
  phone: "+966566200419",
  sourceCode: "https://github.com/KhaledAlruwita/Portfolio",
  cv: "/CV.pdf",
  linkedin: "https://www.linkedin.com/in/khaled-alruwita/",
  github: "https://github.com/KhaledAlruwita",
  twitter: "https://x.com/iLononoa",
  whatsapp: "https://wa.me/966566200419",
} as const;

export const navLinks = [
  { id: 1, name: "Home", href: "#home" },
  { id: 2, name: "About", href: "#about" },
  { id: 3, name: "Projects", href: "#projects" },
  { id: 4, name: "Experience", href: "#experience" },
  { id: 5, name: "Contact", href: "#contact" },
] as const;

export const myProjects = [
  {
    title: "SITE — Data Engineering Toolkit",
    desc: "An internal toolkit that automates SQL validation, optimization analysis, and pipeline health monitoring.",
    subdesc:
      "The platform exposes data quality and lineage signals to engineers and leadership, reducing manual workload by approximately 80% while improving confidence in daily transformations.",
    texture: "/images/SITE.webp",
    fallbackImage: "/images/SITE.webp",
    logo: "/images/SITE.webp",
    logoStyle: {
      backgroundColor: "#102a43",
      border: "1px solid rgba(56, 189, 248, 0.35)",
      boxShadow: "0 0 60px rgba(14, 165, 233, 0.22)",
    },
    spotlight: referenceAsset("assets/spotlight1.png"),
    metrics: ["~80% less manual work", "Daily monitoring", "Data lineage"],
    tags: ["Python", "SQL", "Automation", "Data Quality"],
    links: [{ label: "View CV details", href: "/CV.pdf" }],
  },
  {
    title: "Used Cars ETL + Price Estimator",
    desc: "A production-style data platform for used-car listings, paired with a LightGBM price estimator.",
    subdesc:
      "The pipeline moves data through PostgreSQL staging, PySpark cleansing, bronze–silver–gold layers, a star-schema mart, orchestration, quality checks, and analytics-ready outputs.",
    texture: "/images/cars.png",
    fallbackImage: "/images/cars.png",
    logo: "/images/cars.png",
    logoStyle: {
      backgroundColor: "#0f2922",
      border: "1px solid rgba(52, 211, 153, 0.35)",
      boxShadow: "0 0 60px rgba(16, 185, 129, 0.22)",
    },
    spotlight: referenceAsset("assets/spotlight2.png"),
    metrics: ["R² ≈ 0.85", "MAE ≈ 3,140", "RMSE ≈ 5,768"],
    tags: ["PySpark", "Airflow", "PostgreSQL", "LightGBM"],
    links: [
      { label: "Project PDF", href: "/cars.pdf" },
      { label: "GitHub", href: "https://github.com/KhaledAlruwita/ETL_CARS" },
    ],
  },
  {
    title: "Award-Winning Traffic Simulation",
    desc: "A campus traffic simulation that evaluates waiting time, stop time, and vehicle throughput across multiple scenarios.",
    subdesc:
      "Decision-tree analysis supported data-driven recommendations for signal timing and campus entry changes. The work was awarded Best Research Project at the university level in 2025.",
    texture: "/images/cover.jpg",
    fallbackImage: "/images/cover.jpg",
    logo: "/images/cover.jpg",
    logoStyle: {
      backgroundColor: "#2b1a12",
      border: "1px solid rgba(251, 146, 60, 0.35)",
      boxShadow: "0 0 60px rgba(249, 115, 22, 0.22)",
    },
    spotlight: referenceAsset("assets/spotlight3.png"),
    metrics: ["Best Research Project", "2025", "Scenario analysis"],
    tags: ["SUMO", "Simulation", "Decision Trees", "Analytics"],
    links: [{ label: "Project PDF", href: "/sumo.pdf" }],
  },
  {
    title: "Transaction Parsing System",
    desc: "A web and iOS Shortcuts workflow that converts bank-message text into structured transaction records.",
    subdesc:
      "The system accepts quick mobile inputs, parses transaction fields, stores normalized records, and provides a simple interface for reviewing the resulting data.",
    texture: "/images/maal.png",
    fallbackImage: "/images/maal.png",
    logo: "/images/maal.png",
    logoStyle: {
      backgroundColor: "#24163a",
      border: "1px solid rgba(192, 132, 252, 0.35)",
      boxShadow: "0 0 60px rgba(168, 85, 247, 0.22)",
    },
    spotlight: referenceAsset("assets/spotlight4.png"),
    metrics: ["Mobile input", "Structured storage", "Automated parsing"],
    tags: ["Python", "iOS Shortcuts", "Parsing", "Automation"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/KhaledAlruwita/transaction-parsing-and-storage-system",
      },
    ],
  },
] as const;

export const workExperiences = [
  {
    id: 1,
    name: "SITE",
    pos: "Data Engineer Trainee",
    duration: "Aug 2025 — Present",
    title:
      "Built automated SQL validation and optimization tooling, a daily ETL pipeline, and dimensional warehouse models that improved data quality and transformation visibility.",
    icon: "/assets/site.svg",
    animation: "victory",
  },
  {
    id: 2,
    name: "Keeta Technology Arabia",
    pos: "Data Analyst Intern",
    duration: "Jun 2025 — Aug 2025",
    title:
      "Performed data cleaning, validation, and quality checks on large datasets while supporting internal data-management and reporting standards.",
    icon: "/assets/keeta.svg",
    animation: "clapping",
  },
  {
    id: 3,
    name: "Prince Sattam Bin Abdulaziz University",
    pos: "BSc, Computer Information Systems",
    duration: "Aug 2021 — May 2025",
    title:
      "Graduated with a foundation in information systems, analytics, software development, and data engineering; completed an award-winning traffic simulation project.",
    icon: "/assets/psau.svg",
    animation: "salute",
  },
] as const;

export const socialLinks = [
  { name: "LinkedIn", icon: "/assets/linkedin.svg", url: links.linkedin },
  {
    name: "GitHub",
    icon: referenceAsset("assets/github.svg"),
    url: links.github,
  },
  {
    name: "X",
    icon: referenceAsset("assets/twitter.svg"),
    url: links.twitter,
  },
  { name: "WhatsApp", icon: "/assets/whatsapp.svg", url: links.whatsapp },
] as const;
import { referenceAsset } from "./assets";
