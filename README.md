# Patinhas & Cia 🐾

Patinhas & Cia is a scheduling system for a fictional pet shop: a tutor-facing site where pet owners browse services and book a time slot, and a staff panel where the team manages the daily agenda, payments, and appointment status.

Designed and built as a front-end learning project, with a focus on fundamentals: plain HTML, CSS, and JavaScript (no frameworks), storing all data in the browser.

## Live demo

[Open the site](https://nathaliadebona.github.io/REPOSITORY-NAME/)

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

### Staff panel
- Simulated login with a protected panel and a logout button
- Daily agenda that opens on today, with a date filter and appointments sorted by time
- Appointment cards with time, pet, tutor, phone, and service
- Payment and status can be updated on each card, and changes are saved
- Manual booking form with the same available-slot logic, plus price and payment fields
- Friendly message for days without appointments

### Design and accessibility
- Mobile-first, responsive layout
- Custom palette and fonts (Fredoka and Nunito), with CSS custom properties
- Sticker-style cards with solid shadows, and a decorative sticker on desktop
- Playful animations that respect `prefers-reduced-motion`
- Labels linked to every field, status and alert messages for screen readers, and visible keyboard focus

## Tech stack

- HTML5, CSS3 (Flexbox, Grid, media queries, custom properties), and vanilla JavaScript
- `localStorage` for appointments and `sessionStorage` for the demo login
- [Font Awesome](https://fontawesome.com/) (icons)
- [Google Fonts](https://fonts.google.com/) (Fredoka and Nunito)

## Demo access

The staff panel is at `login.html`. Use the demo credentials shown on the login page:

- **User:** `equipe`
- **Password:** `123456`

The login is **simulated**. There is no server, so the credentials live in the JavaScript and the panel is not truly protected. It exists to demonstrate the flow, not as real security.

All data is stored in your own browser, so each visitor only sees the appointments they created themselves.

## Project structure

```
index.html        Tutor area
login.html        Staff login
painel.html       Staff panel
scripts/
  servicos.js     Service list (name, price, duration, grooming types)
  comum.js        Shared helpers (today's date, appointments by day)
  formulario.js   Shared booking logic (time slots, grooming types, Sundays)
  tutor.js        Tutor area: service buttons and booking submit
  login.js        Simulated login
  painel.js       Staff panel: agenda, status, manual booking
styles/
  style.css       All styles
assets/           Stickers and images
```

## Running locally

1. Clone the repository.
2. Open `index.html` in your browser. There is no build step and no server required.
3. If you prefer a local server, the VS Code "Live Server" extension works too.

## Roadmap

Planned features, not yet implemented:

- Total to receive per day
- Charged amount shown on each appointment card
- Edit appointments
- Filter by payment and service status
- Recurring plans for tutors
- Recurring clients area in the staff panel

## Screenshots

_Coming soon._

---

Personal learning project, built by [Nathalia](mailto:nathalia.contactdc@gmail.com).
