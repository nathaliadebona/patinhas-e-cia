# Patinhas & Cia 🐾

Patinhas & Cia is a scheduling system for a fictional pet shop: a tutor-facing site where pet owners browse services, book a time slot, and sign up for monthly plans, and a staff panel where the team manages the daily agenda, payments, appointment status, and plan subscriptions.

Designed and built as a front-end learning project, with a focus on fundamentals: plain HTML, CSS, and JavaScript (no frameworks), storing all data in the browser.

## Live demo

[Open the site](https://nathaliadebona.github.io/patinhas-e-cia/)

## Features

### Tutor area
- Service cards with description, duration, and price
- "Select" button that fills in the booking form and scrolls to it
- Booking form with tutor, pet, service, date, time, and notes
- Grooming type field that only appears for services that have options
- Available time slots calculated from the service duration and the opening hours
- Occupied slots hidden from the list (cancelled appointments free their slot)
- Past dates and Sundays blocked, and past times hidden for today
- Confirmation message after booking
- Banner that invites visitors to see the monthly plans

### Monthly plans
- Dedicated page with one card per plan, built from a single data file
- Each card shows the price, a short description, and what is included per month (for example, "Bath: 2 times a month")
- Savings calculated automatically by comparing the plan price with the sum of the individual services
- "Subscribe" button that opens a modal with a short interest form
- Subscriptions saved with the plan price at the time of signing up, so later price changes do not affect old subscriptions

### Staff panel
- Simulated login with a protected panel and a logout button
- Daily agenda that opens on today, with a date filter and appointments sorted by time
- Appointment cards with time, pet, tutor, phone, service, and charged amount
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
- Mobile-first, responsive layout
- Custom palette and fonts (Fredoka and Nunito), with CSS custom properties
- Sticker-style cards with solid shadows, a decorative sticker on desktop, and an illustrated banner
- Playful animations that respect `prefers-reduced-motion`
- Labels linked to every field, status and alert messages for screen readers, and visible keyboard focus
- Native `<dialog>` for the modals (focus stays inside, Esc closes) and native `<details>` for the filters
- Descriptive labels on icon-only and repeated buttons (for example, "Edit appointment for Thor")

## Tech stack

- HTML5, CSS3 (Flexbox, Grid, media queries, custom properties), and vanilla JavaScript
- Native `<dialog>` and `<details>` elements
- `localStorage` for appointments and subscriptions, and `sessionStorage` for the demo login
- [Font Awesome](https://fontawesome.com/) (icons)
- [Google Fonts](https://fonts.google.com/) (Fredoka and Nunito)

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

## Screenshots

<img width="1954" height="5860" alt="nathaliadebona github io_patinhas-e-cia_" src="https://github.com/user-attachments/assets/9c542862-2529-4cb1-9b65-2040dffb3de5" />
<img width="1954" height="1856" alt="nathaliadebona github io_patinhas-e-cia_planos html1" src="https://github.com/user-attachments/assets/14a03903-2abd-448e-a14a-568615e8e58c" />
<img width="1954" height="1244" alt="127 0 0 1_5500_painel html" src="https://github.com/user-attachments/assets/075cd8e4-dab9-4c52-a5be-10035a155674" />

---

Personal learning project, built by [Nathalia](mailto:nathalia.contactdc@gmail.com).
