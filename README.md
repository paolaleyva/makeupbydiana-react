# Makeup by Diana Leyva — Booking & Portfolio Site

A bilingual booking and portfolio website built for Diana Leyva, a licensed
makeup artist, hairstylist, and brow/lash technician. Built as a React
final project (WEB 3350).

Diana's clients find her almost entirely through Instagram and TikTok, and
until now every booking, inquiry, and DM had to be handled manually across
scattered links and forms. This site brings all of that into one
mobile-first place: a real portfolio, her actual service menu, live
appointment scheduling, and an event inquiry flow for weddings and other
bookings that need more back-and-forth than a simple time slot.

## What it does

**Home** introduces Diana with her real branding — tagline, service tags
(Bridal, Quinceañera, Social, Photoshoots), and two clear paths in: book a
service instantly, or start an inquiry for an event.

**Portfolio** is a photo grid linking out to her Instagram, where most of
her actual work lives.

**Book a Lash/Brow Service** lists her real menu — Signature Brow Lami,
Korean Lash Lift, Brow Wax + Tint, and more — with live pricing and
duration. Picking a service opens a real-time availability calendar:
clients pick an open slot and it's reserved the moment they submit, with
no possibility of two people booking the same time.

**Hair & Makeup Inquiry** is a separate path for weddings, quinceañeras,
and other events that need a real conversation rather than an instant
booking — event type, date, service needed, and event details, all
routed to Diana for manual follow-up.

**Contact** covers general questions, plus Diana's booking policies and
social info.

Every form sends an automatic confirmation email to both the client and
Diana, so nothing gets lost the way it could in a DM inbox.

The whole site is fully bilingual — visitors choose English or Español
the moment they land, and that choice carries across every page — since
Diana's client base is largely Spanish-speaking.

## How it's built

- **React + Vite**, with React Router for navigation
- **Context API** manages language and light/dark theme, persisted so
  returning visitors don't have to re-choose
- **Firebase Realtime Database** powers the live scheduling — booking a
  slot uses a database transaction so it's impossible for two clients to
  double-book the same appointment
- **EmailJS** sends confirmation emails straight from the browser, no
  backend server required
- Custom styling throughout — dusty rose and mauve in light mode, deep
  plum and charcoal in dark mode — matching Diana's existing brand, with
  a few small touches (twinkling sparkles, a soft background glow) to
  make the site feel a little more alive than a flat template.