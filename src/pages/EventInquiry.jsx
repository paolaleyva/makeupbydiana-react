import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { eventServices } from "../data/services";
import { sendConfirmationEmails } from "../utils/sendConfirmation";
import { timeOptions } from "../utils/timeOptions";

const EVENT_TYPES = [
  "wedding",
  "quinceanera",
  "elopement",
  "photoshoot",
  "prom",
  "graduation",
  "special-event",
  "birthday",
  "other",
];

const EVENT_TYPE_LABEL_KEY = {
  wedding: "eventTypeWedding",
  quinceanera: "eventTypeQuinceanera",
  elopement: "eventTypeElopement",
  photoshoot: "eventTypePhotoshoot",
  prom: "eventTypeProm",
  graduation: "eventTypeGraduation",
  "special-event": "eventTypeSpecialEvent",
  birthday: "eventTypeBirthday",
  other: "eventTypeOther",
};

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  eventType: "",
  eventTypeOther: "",
  date: "",
  time: "",
  locationType: "in-studio",
  address: "",
  serviceId: "",
  headcount: "1",
  notes: "",
};

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function EventInquiry() {
  const { language, t } = useLanguage();
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const eventTypeLabel =
      form.eventType === "other"
        ? form.eventTypeOther
        : t(EVENT_TYPE_LABEL_KEY[form.eventType] || "eventTypeOther");

    const selectedService = eventServices.find((s) => s.id === form.serviceId);
    const timeLabel = timeOptions.find((opt) => opt.value === form.time)?.label || form.time;

    try {
      await sendConfirmationEmails(
        {
          client_name: form.name,
          client_email: form.email,
          client_phone: form.phone,
          event_type: eventTypeLabel || "—",
          event_date: form.date,
          preferred_time: timeLabel || "—",
          location_type: form.locationType === "on-location" ? t("onLocation") : t("inStudio"),
          address: form.locationType === "on-location" ? form.address : "—",
          services_requested: selectedService ? (selectedService.name[language] || selectedService.name.en) : "—",
          headcount: form.headcount,
          notes: form.notes || "—",
        },
        "event_inquiry"
      );

      setStatus("success");
      setForm(emptyForm);
    } catch (err) {
      console.error("Email send failed:", err);
      setStatus("error");
    }
  }

  return (
    <section className="page page--inquiry">
      <h1>{t("inquiryTitle")}</h1>
      <p className="page__subhead">{t("inquirySubhead")}</p>

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
          <span>{t("fieldPhone")}</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </label>

        <label className="field">
          <span>{t("fieldEventType")}</span>
          <select
            required
            value={form.eventType}
            onChange={(e) => updateField("eventType", e.target.value)}
          >
            <option value="" disabled>{t("eventTypeSelectPlaceholder")}</option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(EVENT_TYPE_LABEL_KEY[type])}
              </option>
            ))}
          </select>
        </label>

        {/* Conditional rendering: only ask for details when "Other" is selected */}
        {form.eventType === "other" && (
          <label className="field">
            <span>{t("fieldEventTypeOther")}</span>
            <input
              required
              value={form.eventTypeOther}
              onChange={(e) => updateField("eventTypeOther", e.target.value)}
            />
          </label>
        )}

        <label className="field">
          <span>{t("fieldPreferredDate")}</span>
          <input
            required
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={(e) => updateField("date", e.target.value)}
          />
        </label>

        <label className="field">
          <span>{t("fieldPreferredTime")}</span>
          <select
            required
            value={form.time}
            onChange={(e) => updateField("time", e.target.value)}
          >
            <option value="" disabled>{t("timeSelectPlaceholder")}</option>
            {timeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>

        {/* Conditional rendering: only ask for an address when service is on-location */}
        <fieldset className="field">
          <legend>{t("fieldLocationType")}</legend>
          <label className="radio">
            <input
              type="radio"
              name="locationType"
              checked={form.locationType === "in-studio"}
              onChange={() => updateField("locationType", "in-studio")}
            />
            {t("inStudio")}
          </label>
          <label className="radio">
            <input
              type="radio"
              name="locationType"
              checked={form.locationType === "on-location"}
              onChange={() => updateField("locationType", "on-location")}
            />
            {t("onLocation")}
          </label>
        </fieldset>

        {form.locationType === "on-location" && (
          <label className="field">
            <span>{t("fieldAddress")}</span>
            <input required value={form.address} onChange={(e) => updateField("address", e.target.value)} />
          </label>
        )}

        <label className="field">
          <span>{t("fieldServicesRequested")}</span>
          <select
            required
            value={form.serviceId}
            onChange={(e) => updateField("serviceId", e.target.value)}
          >
            <option value="" disabled>{t("serviceSelectPlaceholder")}</option>
            {eventServices.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name[language] || service.name.en}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>{t("fieldHeadcount")}</span>
          <input
            type="number"
            min="1"
            value={form.headcount}
            onChange={(e) => updateField("headcount", e.target.value)}
          />
        </label>

        <label className="field">
          <span>{t("fieldNotes")}</span>
          <textarea rows={4} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} />
        </label>

        {status === "error" && <p className="form-message form-message--error">{t("submitError")}</p>}
        {status === "success" && <p className="form-message form-message--success">{t("inquirySuccess")}</p>}

        <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
          {status === "submitting" ? t("submitting") : t("inquirySubmit")}
        </button>
      </form>
    </section>
  );
}