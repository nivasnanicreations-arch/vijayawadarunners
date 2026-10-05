# Vijayawada Runners — Official Marathon & Community Web Portal

A high-performance, responsive web platform created for **Vijayawada Runners**, modeled on the proven structure, philanthropic mission, and runner experience of **Dream Runners Chennai** (`https://dreamrunners.in/`).

---

## 🌟 Comparative Architecture: Dream Runners vs. Vijayawada Runners

| Feature / Section | Dream Runners (`dreamrunners.in`) | Vijayawada Runners (`vijayawadarunners`) |
| :--- | :--- | :--- |
| **Flagship Event** | DRHM (Dream Runners Half Marathon) | **VRHM (Vijayawada Runners Half Marathon)** |
| **Iconic Landmark** | Chennai Coastline / Marina / Besant Nagar | **Krishna Riverfront, Prakasam Barrage & Bhavani Island** |
| **Race Categories** | 21.1K, 10K | **21.1K Half Marathon, 10K Timed, 5K Fitness, 3K Family Joy Run** |
| **City Chapters** | Anna Nagar, Boat Club, OMR, Marina, etc. | **Benz Circle, Krishna Riverfront, BRTS Road, KL University/Amaravati, Gunadala, Bhavanipuram** |
| **Charitable Causes** | Freedom Trust (Prosthetics), PCVC, Vijay Human Services | **Freedom Trust (Prosthetic Limbs), #RunClean Krishna River Plogging, Para-Athletes Sponsorship** |
| **Free Training** | Free Structured Training (12 Weeks) | **12-Week Couch to 21.1K Structured Training Syllabus & Sunday Group Runs** |
| **Pacer System** | Official 10K & 21.1K Pacer Buses | **Interactive Pacer Buses (1:45 to 2:45 for 21.1K; 50 to 75 min for 10K)** |
| **Runner Utilities** | Static info pages | **Interactive Pace & Split Calculator + Assigned Pacer Bus Recommender** |
| **Results & Bibs** | External results link | **Interactive Live Bib Lookup Simulator + Instant Printable Timing Certificate** |
| **Registration Flow** | External ticketing redirect | **Interactive Multi-Step Registration Modal with simulated confirmation & Bib ID** |

---

## 🎨 Different Versions Included

The project provides multiple versions in two flexible ways:

### 1. Live Interactive Theme Switcher (Available on `index.html`)
Use the top sticky control bar to toggle seamlessly between 4 visual themes:
1. **v1 Classic Riverfront (Default)**: Clean sapphire river blue & gold palette inspired by the Dream Runners aesthetic.
2. **v2 Electric Marathon**: High-energy athletic blaze orange & volt yellow designed for competitive race excitement.
3. **v3 Midnight Ultra**: OLED stealth dark theme with neon cyan & purple accents for night runs and modern athletic tech.
4. **v4 Eco Sunrise**: Fresh emerald green and morning amber celebrating Amaravati nature and riverfront plogging.

### 2. Dedicated Standalone Hubs / Versions
- **[`index.html`](index.html)**: Master Portal containing all features, interactive switcher, calculator, registration, and race details.
- **[`version-marathon.html`](version-marathon.html)**: **Race Day & Expo Focus** — Master flag-off timeline, cash prize pool (₹3,00,000), expo logistics, and rules.
- **[`version-club.html`](version-club.html)**: **Community Club & Chapters Focus** — 6 neighborhood hubs, WhatsApp community links, and complete 12-week Couch to 21.1K syllabus.
- **[`version-charity.html`](version-charity.html)**: **Philanthropy & #RunClean Focus** — Prosthetic donations, Krishna River plogging, 80G tax exemption, and volunteer registration.
- **[`version-results.html`](version-results.html)**: **Timing & Leaderboard Focus** — Live bib lookup, split times, hall of fame, and printable certificate generator.

---

## 🚀 How to Run & Preview

1. **Directly in Any Browser**:
   Double click or open `index.html` in Chrome, Edge, Firefox, or Safari.

2. **Using a Local Server (Optional)**:
   ```bash
   # Using Node.js npx
   npx serve "c:\Vijayawada Runners"
   ```

---

## 📂 File Structure

```
Vijayawada Runners/
├── index.html               # Main flagship portal with live version switcher
├── version-marathon.html    # Dedicated Race Day & Expo hub
├── version-club.html        # Dedicated Running Club & Chapters hub
├── version-charity.html     # Dedicated Philanthropy & Plogging hub
├── version-results.html     # Dedicated Results & Finisher Certificate hub
├── css/
│   └── styles.css           # Master CSS with CSS Custom Variables for all 4 versions
├── js/
│   └── app.js               # Interactive JS (switcher, countdown, calculator, bib search, modal)
├── images/                  # Image assets directory
└── README.md                # Documentation & Architecture breakdown
```
