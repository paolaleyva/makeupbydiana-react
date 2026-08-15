import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import LanguageGate from "./components/LanguageGate";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Services from "./pages/Services";
import ServiceBooking from "./pages/ServiceBooking";
import EventInquiry from "./pages/EventInquiry";
import Contact from "./pages/Contact";
import "./App.css";

// Everything below the gate only renders once a language has been chosen.
function SiteContent() {
  const { language } = useLanguage();

  if (!language) return <LanguageGate />;

  return (
    <BrowserRouter>
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/book/:serviceId" element={<ServiceBooking />} />
          <Route path="/inquiry" element={<EventInquiry />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <SiteContent />
      </ThemeProvider>
    </LanguageProvider>
  );
}