import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { services } from "../data/services";

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}h ${m}min`;
  if (h) return `${h}h`;
  return `${m}min`;
}

export default function Services() {
  const { language, t } = useLanguage();

  return (
    <section className="page page--services">
      <h1>{t("servicesTitle")}</h1>
      <p className="page__subhead">{t("servicesSubhead")}</p>

      <div className="service-list">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <div className="service-card__header">
              <h2>{service.name[language] || service.name.en}</h2>
              <span className="service-card__price">${service.price}</span>
            </div>
            <p className="service-card__description">
              {service.description[language] || service.description.en}
            </p>
            <p className="service-card__duration">
              {t("duration")}: {formatDuration(service.durationMinutes)}
            </p>
            <Link to={`/book/${service.id}`} className="btn btn--ghost btn--small">
              {t("selectService")}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}