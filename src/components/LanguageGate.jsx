import { useLanguage } from "../context/LanguageContext";

export default function LanguageGate() {
  const { language, setLanguage, t } = useLanguage();

  if (language) return null; // choice already made - render nothing

  return (
    <div className="language-gate" role="dialog" aria-modal="true" aria-label="Language selection">
      <div className="language-gate__card">
        <p className="language-gate__eyebrow">{t("gateTitle")} · Bienvenida</p>
        <h1 className="language-gate__title">
          {t("gateSubtitle")}
          <br />
          Elige tu idioma
        </h1>
        <div className="language-gate__buttons">
          <button className="btn btn--primary" onClick={() => setLanguage("en")}>
            Continue in English
          </button>
          <button className="btn btn--primary" onClick={() => setLanguage("es")}>
            Continuar en Español
          </button>
        </div>
      </div>
    </div>
  );
}