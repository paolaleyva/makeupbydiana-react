# Final Project Reflection

## Overview

This project started as a question of whether a real client site, my
sister Diana's makeup and brow/lash business, could satisfy the
requirements of a React final project, and turned into building the
actual booking system she needed. Working from something real changed
the whole process: instead of inventing features to hit a checklist, I
was constantly comparing what I built against what she actually uses
(her Square booking page, her existing bilingual inquiry forms, her
Instagram bio), and rebuilding pieces once I understood her workflow
better.

## Challenges

**Preventing double-booking with Firebase.** The live scheduling feature
was the part I was most nervous about. Getting a calendar UI to *display*
open slots is easy; making sure two clients can't grab the same slot at
the same moment is a different problem. I ended up using a Firebase
Realtime Database transaction, which only commits a slot if it's still
empty at write time — the first real distributed-systems-style problem
I've had to reason through in a class project.

**EmailJS without a backend.** Sending confirmation emails straight from
the browser meant learning EmailJS's template system, including its
Mustache-style conditional syntax (`{{#is_client}}...{{/is_client}}`) to
make one template branch its content by recipient and request type. I
also learned the hard way that EmailJS's Design editor silently discards
that syntax — it only works in the Code Editor — after my first version
rendered as one flat, unformatted paragraph in both inboxes.

**Restructuring the booking flow mid-project.** My original plan had one
generic "Book an Event" form for everything. Partway through, I realized
brow/lash services and full event bookings are fundamentally different
requests — one can be booked instantly against real availability, the
other genuinely needs a human conversation and approval. Splitting that
into "Book a Lash/Brow Service" (live Firebase scheduling) and a separate
"Hair & Makeup Inquiry" (manual follow-up) meant re-touching the nav,
routing, translations, and email logic, but it made the site actually
match how Diana runs her business.

**Small deployment gotchas.** Git rejected my first push because the
GitHub repo was initialized with its own README, so my local history and
the remote history had no common ancestor — an "unrelated histories"
merge I hadn't run into before. Separately, my portfolio images didn't
load because I referenced them as `"public/portfolio/..."` instead of
`"/portfolio/..."` — a reminder that Vite's `public/` folder name never
actually appears in the served URL.

## Lessons learned

Building for a real user surfaced problems a fictional brief wouldn't
have: real double-booking risk, a real bilingual audience, a real
distinction between "instant book" and "needs approval." I also came
away with a much better instinct for CSS specificity after debugging the
same rule twice, and a clearer sense of how much can be built without a
traditional backend — Firebase and EmailJS together cover scheduling and
notifications for a small business without me ever standing up a server.

## Future improvements

- Wire the Stripe Payment Link into the actual booking confirmation step
  so deposits can be collected automatically instead of manually.
- Build Diana a simple admin view so she can block off her own days/hours
  instead of me hardcoding a fixed weekly template in code.
- Replace the static portfolio grid with a live Instagram embed once I
  set up the Graph API access properly.
- Add SMS confirmations alongside email, since a lot of her clients text
  more than they email.
- Swap in real client photos and testimonials once Diana has them ready.
- A general accessibility pass (contrast checking in both themes, more
  thorough screen-reader testing on the booking form) before this goes
  live for real clients.