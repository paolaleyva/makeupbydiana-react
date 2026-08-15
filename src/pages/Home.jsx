import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Sparkles from "../components/Sparkles";

export default function Home() {
  const { t } = useLanguage();
  const tags = t("homeTags"); // array - see translations.js

  return (
    <section className="page page--home">
      <div className="hero">
        <Sparkles />
        <div className="hero__content">
          <p className="eyebrow">{t("homeSubhead")}</p>
          <h1>{t("homeHeadline")}</h1>
          <p className="hero__location">📍 {t("homeLocation")}</p>

          <div className="hero__tags">
            {tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>

          <p className="hero__brow-note">✂️ {t("homeBrowNote")}</p>
          
          <div className="hero__actions">
            <Link to="/services" className="btn btn--primary btn--glow">{t("homeCtaService")}</Link>
            <Link to="/inquiry" className="btn btn--ghost btn--glow">{t("homeCtaEvent")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}