import { useMemo, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useAvailability } from "../hooks/useAvailability";
import { services } from "../data/services";
import { sendConfirmationEmails } from "../utils/sendConfirmation";

const emptyForm = { name: "", email: "", phone: "", date: "", notes: "" };

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export default function ServiceBooking() {
  const { serviceId } = useParams();
  const { language, t } = useLanguage();
  const service = services.find((s) => s.id === serviceId);

  const [form, setForm] = useState(emptyForm);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error | slot-taken | select-slot

  const { slots, loading: slotsLoading, bookSlot } = useAvailability(form.date || null);

  const selectedSlot = useMemo(
    () => slots.find((s) => s.id === selectedSlotId),
    [slots, selectedSlotId]
  );

  // Unknown service id in the URL - bounce back to the service list
  if (!service) return <Navigate to="/services" replace />;

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedSlotId) {
      setStatus("select-slot");
      return;
    }

    setStatus("submitting");

    // Claim the slot via a Firebase transaction - loses gracefully if someone else got there first.
    const won = await bookSlot(selectedSlotId, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      serviceId: service.id,
      notes: form.notes,
    });

    if (!won) {
      setStatus("slot-taken");
      setSelectedSlotId(null);
      return;
    }

    try {
      await sendConfirmationEmails(
        {
          client_name: form.name,
          client_email: form.email,
          client_phone: form.phone,
          service_name: service.name[language] || service.name.en,
          service_price: `$${service.price}`,
          event_date: form.date,
          time_slot: selectedSlot?.label || selectedSlotId,
          notes: form.notes || "—",
        },
        "service_booking"
      );

      setStatus("success");
      setForm(emptyForm);
      setSelectedSlotId(null);
    } catch (err) {
      console.error("Email send failed:", err);
      setStatus("error");
    }
  }

  return (
    <section className="page page--book">
      <Link to="/services" className="back-link">{t("bookServiceBack")}</Link>

      <h1>{service.name[language] || service.name.en}</h1>
      <p className="page__subhead">
        ${service.price} · {t("bookServiceSubhead")}
      </p>

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
          <span>{t("fieldDate")}</span>
          <input
            required
            type="date"
            min={todayISO()}
            value={form.date}
            onChange={(e) => {
              updateField("date", e.target.value);
              setSelectedSlotId(null);
            }}
          />
        </label>

        {form.date && (
          <div className="field">
            <span>{t("availableSlots")}</span>
            {slotsLoading ? (
              <p>…</p>
            ) : slots.every((s) => s.taken) ? (
              <p className="hint">{t("noSlots")}</p>
            ) : (
              <div className="slot-grid">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot.id}
                    disabled={slot.taken}
                    className={`slot ${selectedSlotId === slot.id ? "slot--selected" : ""} ${slot.taken ? "slot--taken" : ""}`}
                    onClick={() => setSelectedSlotId(slot.id)}
                  >
                    {slot.label}
                    {slot.taken && <span className="slot__badge">{t("slotTaken")}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <label className="field">
          <span>{t("fieldNotes")}</span>
          <textarea rows={3} value={form.notes} onChange={(e) => updateField("notes", e.target.value)} />
        </label>

        {status === "select-slot" && <p className="form-message form-message--error">{t("selectSlotFirst")}</p>}
        {status === "slot-taken" && <p className="form-message form-message--error">{t("slotTakenError")}</p>}
        {status === "error" && <p className="form-message form-message--error">{t("submitError")}</p>}
        {status === "success" && <p className="form-message form-message--success">{t("serviceBookingSuccess")}</p>}

        <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
          {status === "submitting" ? t("submitting") : t("submit")}
        </button>
      </form>
    </section>
  );
}