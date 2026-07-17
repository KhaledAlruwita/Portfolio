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
          <span aria-hidden="true">⌖</span>
          <div>
            <small>Location</small>
            <strong>Riyadh, Saudi Arabia</strong>
          </div>
        </div>

        <div className="contact-links">
          <a href={links.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
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
