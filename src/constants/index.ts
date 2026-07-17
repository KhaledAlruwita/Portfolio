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

export const techStackGroups = [
  {
    label: "Data Engineering",
    tools: ["Python", "SQL", "PySpark", "Airflow", "PostgreSQL"],
  },
  {
    label: "Analytics",
    tools: ["Power BI", "Tableau", "Pandas", "Great Expectations"],
  },
  {
    label: "Cloud & DevOps",
    tools: ["AWS", "Alibaba Cloud", "Oracle Cloud", "Docker", "Linux", "Git"],
  },
] as const;

export const myProjects = [
  {
    title: "SITE — Data Engineering Toolkit",
    desc: "An internal toolkit that automates SQL validation, optimization analysis, and pipeline health monitoring.",
    subdesc:
      "The platform exposes data quality and lineage signals to engineers and leadership, reducing manual workload by approximately 80% while improving confidence in daily transformations.",
    texture: "/images/SITE.webp",
    fallbackImage: "/images/SITE.webp",
    logo: "/images/thumbnails/site.webp",
    metrics: ["~80% less manual work", "Daily monitoring", "Data lineage"],
    tags: ["Python", "SQL", "Automation", "Data Quality"],
    links: [{ label: "View CV details", href: "/CV.pdf" }],
  },
  {
    title: "Used Cars ETL + Price Estimator",
    desc: "A production-style data platform for used-car listings, paired with a LightGBM price estimator.",
    subdesc:
      "The pipeline moves data through PostgreSQL staging, PySpark cleansing, bronze–silver–gold layers, a star-schema mart, orchestration, quality checks, and analytics-ready outputs.",
    texture: "/images/cars.webp",
    fallbackImage: "/images/cars.webp",
    logo: "/images/thumbnails/cars.webp",
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
    texture: "/images/cover.webp",
    fallbackImage: "/images/cover.webp",
    logo: "/images/thumbnails/traffic.webp",
    metrics: ["Best Research Project", "2025", "Scenario analysis"],
    tags: ["SUMO", "Simulation", "Decision Trees", "Analytics"],
    links: [{ label: "Project PDF", href: "/sumo.pdf" }],
  },
  {
    title: "Transaction Parsing System",
    desc: "A web and iOS Shortcuts workflow that converts bank-message text into structured transaction records.",
    subdesc:
      "The system accepts quick mobile inputs, parses transaction fields, stores normalized records, and provides a simple interface for reviewing the resulting data.",
    texture: "/images/maal.webp",
    fallbackImage: "/images/maal.webp",
    logo: "/images/thumbnails/transactions.webp",
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

interface ExperienceRole {
  position: string;
  duration: string;
  location: string;
}

interface WorkExperience {
  id: number;
  name: string;
  employment: string;
  icon: string;
  roles?: ExperienceRole[];
  position?: string;
  duration?: string;
  location?: string;
  description?: string;
  skills?: string[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: 1,
    name: "Al Rajhi Bank",
    employment: "Full-time · 6 mos",
    icon: "/assets/rajhi.svg",
    roles: [
      {
        position: "Business Intelligence & Reporting Analyst",
        duration: "Jul 2026 — Present · 1 mo",
        location: "On-site",
      },
      {
        position: "IT GDP",
        duration: "Feb 2026 — Jul 2026 · 6 mos",
        location: "Riyadh, Saudi Arabia",
      },
    ],
  },
  {
    id: 2,
    name: "SITE",
    employment: "Internship · 7 mos",
    position: "Data Engineer",
    duration: "Aug 2025 — Feb 2026",
    location: "Riyadh, Saudi Arabia",
    description:
      "Developed a data engineering toolkit to automate, validate, analyze, and optimize SQL transformations, plus a daily ETL pipeline and dimensional warehouse models.",
    skills: ["PostgreSQL", "SQL", "Python", "ETL", "Data Modeling"],
    icon: "/assets/site.svg",
  },
  {
    id: 3,
    name: "Keeta",
    employment: "Internship · 3 mos",
    position: "Data Analyst Intern",
    duration: "Jun 2025 — Aug 2025",
    location: "Riyadh, Saudi Arabia",
    description:
      "Performed data cleaning, validation, and quality checks on large datasets, then standardized raw data to improve accuracy and usability.",
    skills: ["Microsoft Excel", "Data Scraping", "Data Quality", "Reporting"],
    icon: "/assets/keeta.svg",
  },
];

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
