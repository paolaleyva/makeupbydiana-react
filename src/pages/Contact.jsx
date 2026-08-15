import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { sendConfirmationEmails } from "../utils/sendConfirmation";

const emptyForm = { name: "", email: "", message: "" };

export default function Contact() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    try {
      await sendConfirmationEmails(
        {
          client_name: form.name,
          client_email: form.email,
          message: form.message,
        },
        "general_contact"
      );

      setStatus("success");
      setForm(emptyForm);
    } catch (err) {
      console.error("Email send failed:", err);
      setStatus("error");
    }
  }

  const policies = {
    en: [
        "A 50% non-refundable deposit is required to hold your date.",
        "Cancellations within 48 hours of the appointment forfeit the deposit.",
        "Please arrive with a clean, product-free face for makeup services.",
        "Travel fees may apply for on-location bookings outside the local area.",
    ],
    es: [
        "Se requiere un depósito no reembolsable del 50% para apartar tu fecha.",
        "Cancelaciones dentro de las 48 horas antes de la cita pierden el depósito.",
        "Por favor llega con el rostro limpio y sin productos para servicios de maquillaje.",
        "Puede aplicar una tarifa de viaje para citas a domicilio fuera del área local.",
    ],
  };

  return (
    <section className="page page--contact">
      <h1>{t("contactTitle")}</h1>
      <p className="page__subhead">{t("contactSubhead")}</p>

      <div className="contact-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>{t("fieldName")}</span>
            <input required value={form.name} onChange={(e) => updateField("name", e.target.value)} />
          </label>

          <label className="field">
            <span>{t("fieldEmail")}</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </label>

          <label className="field">
            <span>{t("fieldMessage")}</span>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
            />
          </label>

          {status === "error" && <p className="form-message form-message--error">{t("submitError")}</p>}
          {status === "success" && <p className="form-message form-message--success">{t("contactSuccess")}</p>}

          <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
            {status === "submitting" ? t("submitting") : t("contactSubmit")}
          </button>
        </form>

        <div className="contact-card">
          <h2>{t("policiesHeading")}</h2>
          <ul className="policy-list">
            {(policies[language] || policies.en).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}