import { links } from "../constants";

export const Contact = () => {
  return (
    <section className="c-space my-20" id="contact">
      <h3 className="head-text">Contact me</h3>

      <div className="contact-card">
        <a className="contact-row" href={`mailto:${links.contactEmail}`}>
          <span aria-hidden="true">✉</span>
          <div>
            <small>Email</small>
            <strong>{links.contactEmail}</strong>
          </div>
        </a>

        <a className="contact-row" href={`tel:${links.phone}`}>
          <span aria-hidden="true">☎</span>
          <div>
            <small>Phone</small>
            <strong>{links.phone}</strong>
          </div>
        </a>

        <div className="contact-row">
          <span aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <circle
                cx="12"
                cy="10"
                r="2.6"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
          </span>
          <div>
            <small>Location</small>
            <strong>Riyadh, Saudi Arabia</strong>
          </div>
        </div>

        <a
          className="contact-row"
          href={links.linkedin}
          target="_blank"
          rel="noreferrer noopener"
        >
          <span aria-hidden="true">
            <img src="/assets/linkedin.svg" alt="" />
          </span>
          <div>
            <small>LinkedIn</small>
            <strong>Khaled Alruwita</strong>
          </div>
        </a>

        <div className="contact-links">
          <a href={links.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={links.whatsapp} target="_blank" rel="noreferrer noopener">
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
