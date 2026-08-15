import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

export default function Nav() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("navHome") },
    { to: "/portfolio", label: t("navPortfolio") },
    { to: "/services", label: t("navBookService") },
    { to: "/inquiry", label: t("navBookEvent") },
    { to: "/contact", label: t("navContact") },
  ];

  return (
    <header className="nav">
      <div className="nav__bar">
        <NavLink to="/" className="nav__brand" onClick={() => setOpen(false)}>
          Diana Leyva
        </NavLink>

        <div className="nav__controls">
          <button
            className="icon-btn"
            onClick={() => setLanguage(language === "en" ? "es" : "en")}
            aria-label="Switch language"
          >
            {language === "en" ? "ES" : "EN"}
          </button>
          <button className="icon-btn" onClick={toggleTheme} aria-label={t("themeToggle")}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button
            className="icon-btn nav__hamburger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav__link ${isActive ? "nav__link--active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}