import { useLanguage } from "../context/LanguageContext";

const portfolioItems = [
  { id: 1, src: "/portfolio/bridal-1.jpeg", alt: { en: "Bridal makeup, soft glam", es: "Maquillaje de novia, glam suave" } },
  { id: 2, src: "/portfolio/quince-2.jpeg", alt: { en: "Quinceañera makeup", es: "Maquillaje de quinceañera" } },
  { id: 3, src: "/portfolio/glam-1.jpeg", alt: { en: "Full glam event makeup", es: "Maquillaje glam para evento" } },
  { id: 4, src: "/portfolio/wax-1.jpeg", alt: { en: "Waxing service result", es: "Resultado de servicio de cera" } },
  { id: 5, src: "/portfolio/quince-1.jpeg", alt: { en: "Quinceañera hairstyling", es: "Peinado de quinceañera" } },
  { id: 6, src: "/portfolio/glam-2.jpeg", alt: { en: "Night out makeup look", es: "Look de maquillaje para salir" } },
];

export default function Portfolio() {
  const { language, t } = useLanguage();

  return (
    <section className="page page--portfolio">
      <h1>{t("navPortfolio")}</h1>
      <div className="portfolio-grid">
        {portfolioItems.map((item) => (
          <figure key={item.id} className="portfolio-grid__item">
            <img
              src={item.src}
              alt={item.alt[language] || item.alt.en}
              loading="lazy"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
          </figure>
        ))}
      </div>

      <a
        href="https://www.instagram.com/makeupbydianaleyva/"
        target="_blank"
        rel="noreferrer"
        className="btn btn--ghost portfolio-grid__cta">
        {t("followInstagram")}
      </a>
    </section>
  );
}