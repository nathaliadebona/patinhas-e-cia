# Patinhas & Cia 🐾
 
Patinhas & Cia is a scheduling system for a fictional pet shop: a tutor-facing site where pet owners browse services, book a time slot, and sign up for monthly plans, and a staff panel where the team manages the daily agenda, payments, appointment status, and plan subscriptions.
 
Designed and built as a front-end learning project, with a focus on fundamentals: plain HTML, CSS, and JavaScript (no frameworks), storing all data in the browser.
 
## Live demo
 
[Open the site](https://nathaliadebona.github.io/patinhas-e-cia/)
 
## Features
 
### Tutor area
- Service cards with description, duration, and price
- "Select" button that fills in the booking form and scrolls to it
- Booking form with tutor, pet, service, date, time, and notes, laid out in two columns on desktop
- Grooming type field that only appears for services that have options
- Available time slots calculated from the service duration and the opening hours
- Occupied slots hidden from the list (cancelled appointments free their slot)
- Past dates and Sundays blocked, and past times hidden for today
- Confirmation message after booking
- Banner that invites visitors to see the monthly plans
- Footer with the shop's details, a link to the plans page (or back to the booking form), and a link to the staff area
### Monthly plans
- Dedicated page with one card per plan, built from a single data file
- Each card shows the price, a short description, and what is included per month (for example, "Bath: 2 times a month")
- Savings calculated automatically by comparing the plan price with the sum of the individual services
- "Subscribe" button that opens a modal with a short interest form
- Subscriptions saved with the plan price at the time of signing up, so later price changes do not affect old subscriptions
### Staff panel
- Simulated login with a protected panel and a logout button
- Tab menu to switch between the agenda and the subscriptions, with the current page highlighted
- Daily agenda that opens on today, with a date filter and appointments sorted by time
- Appointment cards with time, pet, tutor, phone, service, and charged amount
- Cards turn green when the payment is marked as paid, and the color updates right away without reloading the list
- Payment and status can be updated on each card, and changes are saved
- Daily totals: amount to receive (pending, not cancelled) and amount received (paid, not cancelled), updated as soon as a payment or status changes
- Filters by payment and status in a collapsible panel (the totals always reflect the whole day)
- Booking modal for manual appointments, with the same available-slot logic, plus price and payment fields
- Edit any appointment in the same modal, keeping its own time slot available while editing
- Friendly message for days without appointments
### Subscriptions (staff)
- Separate page listing every plan subscription, newest first
- Each card shows the person, phone, pet, plan, and the price they signed up for
- Status can be updated (new, contacted, active, cancelled), and changes are saved
- Totals for active subscribers and monthly revenue, updated as soon as a status changes
### Design and accessibility
- Mobile-first, responsive layout, with a slightly larger base text size on desktop
- Custom palette and fonts (Fraunces for headings and Nunito for body text), with CSS custom properties
- Sticker-style cards with solid shadows, a decorative sticker on desktop, and an illustrated banner
- Playful animations that respect `prefers-reduced-motion`
- Labels linked to every field, status and alert messages for screen readers, and visible keyboard focus
- Labels and inputs aligned with the rounded corners of the fields
- Navigation landmarks with accessible names, and `aria-current` marking the current page in the staff tabs
- Native `<dialog>` for the modals (focus stays inside, Esc closes) and native `<details>` for the filters
- Descriptive labels on icon-only and repeated buttons (for example, "Edit appointment for Thor")
- Text and button colors checked for contrast (at least 4.5:1), based on Lighthouse feedback
- A meta description on every page
## Performance
 
Audited with Lighthouse (mobile, simulated slow 4G): 94 to 98 in Performance and 100 in Accessibility, Best Practices, and SEO on the tutor page. Some of the optimizations:
 
- Banner image preloaded with high priority, since it is the largest element on the first screen
- Decorative sticker loaded lazily, so it is not downloaded where it is hidden
- Space reserved for the plan cards, so the footer does not jump when they appear
- Banner served as WebP, which is much lighter than PNG
## Tech stack
 
- HTML5, CSS3 (Flexbox, Grid, media queries, custom properties, pseudo-elements), and vanilla JavaScript
- Native `<dialog>` and `<details>` elements
- `localStorage` for appointments and subscriptions, and `sessionStorage` for the demo login
- [Font Awesome](https://fontawesome.com/) (icons)
- [Google Fonts](https://fonts.google.com/) (Fraunces and Nunito)
## Demo access
 
The staff panel is at `login.html`. Use the demo credentials shown on the login page:
 
- **User:** `equipe`
- **Password:** `123456`
The login is **simulated**. There is no server, so the credentials live in the JavaScript and the panel is not truly protected. It exists to demonstrate the flow, not as real security.
 
All data is stored in your own browser, so each visitor only sees the appointments and subscriptions they created themselves.
 
## Project structure
 
```
index.html         Tutor area
planos.html        Monthly plans
login.html         Staff login
painel.html        Staff panel (agenda)
assinaturas.html   Staff panel (subscriptions)
scripts/
  servicos.js        Service list (name, price, duration, grooming types)
  planos.js          Plan list (name, price, what is included)
  comum.js           Shared helpers (today's date, appointments by day, totals)
  formulario.js      Shared booking logic (time slots, grooming types, Sundays)
  tutor.js           Tutor area: service buttons and booking submit
  pagina-planos.js   Plans page: cards, savings, and subscription modal
  login.js           Simulated login
  painel.js          Staff panel: agenda, totals, filters, booking and editing
  assinaturas.js     Staff panel: subscriptions, status, and totals
styles/
  style.css          All styles
assets/              Stickers and banner image
```
 
## Running locally
 
1. Clone the repository.
2. Open `index.html` in your browser. There is no build step and no server required.
3. If you prefer a local server, the VS Code "Live Server" extension works too.
## Roadmap
 
Planned features, not yet implemented:
 
- Generate the recurring appointments automatically from an active subscription
- Edit and delete subscriptions
- Replace Font Awesome with inline SVG icons to reduce page weight
## Screenshots
 
<!--
Add the new screenshots here, dragging each image into the GitHub editor to generate the links.
Suggested order: tutor area (home), booking form, plans page, staff panel with a paid (green) and a pending card.
-->
 
---
 
Personal learning project, built by [Nathalia](mailto:nathalia.contactdc@gmail.com).
