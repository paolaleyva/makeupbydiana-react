import { useLanguage } from "../context/LanguageContext";

// Swap `src` for real photos in /public/portfolio/ once you have them.
// Keeping this as plain data means adding a new photo never touches the layout code.
const portfolioItems = [
  { id: 1, src: "src/assets/bridal-1.jpeg", alt: { en: "Bridal makeup, soft glam", es: "Maquillaje de novia, glam suave" } },
  { id: 2, src: "src/assets/quince-2.jpeg", alt: { en: "Quinceanera look", es: "Look de quinceañera" } },
  { id: 3, src: "src/assets/glam-1.jpeg", alt: { en: "Full glam event makeup", es: "Maquillaje glam para evento" } },
  { id: 4, src: "src/assets/wax-1.jpeg", alt: { en: "Brow waxing result", es: "Resultado de cera de cejas" } },
  { id: 5, src: "src/assets/quince-1.jpeg", alt: { en: "Quinceanera look", es: "Look de quinceañera" } },
  { id: 6, src: "src/assets/glam-2.jpeg", alt: { en: "Makeup glam look", es: "Look de maquillaje para salir" } },
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