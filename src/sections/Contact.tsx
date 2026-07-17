import { useState } from "react";

import { links } from "../constants";
import { referenceAsset } from "../constants/assets";

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`
    );

    setStatus("Opening your email app…");
    window.location.href = `mailto:${links.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={referenceAsset("assets/terminal.png")}
          alt=""
          className="absolute inset-0 h-full min-h-screen w-full object-cover opacity-80"
        />

        <div className="contact-container">
          <h3 className="head-text">Let&apos;s connect</h3>

          <p className="mt-3 text-lg text-white-600">
            Have a data engineering, analytics, or automation opportunity? Send
            me a note or reach me directly.
          </p>

          <div className="contact-actions">
            <a href={`mailto:${links.contactEmail}`}>{links.contactEmail}</a>
            <a href={links.whatsapp} target="_blank" rel="noreferrer noopener">
              WhatsApp
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer noopener">
              LinkedIn
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col space-y-6"
          >
            <label className="space-y-3">
              <span className="field-label">Full name</span>
              <input
                required
                minLength={2}
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="field-input"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="field-input"
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="space-y-3">
              <span className="field-label">Message</span>
              <textarea
                required
                minLength={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="field-input"
                placeholder="Tell me about the opportunity…"
              />
            </label>

            <button type="submit" className="field-btn">
              Compose email
              <img
                src={referenceAsset("assets/arrow-up.png")}
                alt=""
                className="field-btn_arrow"
              />
            </button>

            <p className="min-h-6 text-sm text-white-600" aria-live="polite">
              {status}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
