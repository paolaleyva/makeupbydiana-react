import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <p>Makeup by Diana Leyva · Licensed Brow & Lash Tech</p>
      
    <a href="https://www.instagram.com/makeupbydianaleyva/" target="_blank" rel="noreferrer" className="footer__link">
        @makeupbydianaleyva — {t("followInstagram")}
    </a> 
    </footer>
  );
}