import PDFDocument from "pdfkit";
import fs from "fs";

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 60, bottom: 60, left: 55, right: 55 },
  info: {
    Title: "ScoutPro - Documentation",
    Author: "ScoutPro Team",
  },
});

const stream = fs.createWriteStream("public/ScoutPro_Documentation.pdf");
doc.pipe(stream);

// ── Colors ──
const C = {
  primary: "#16a34a",
  dark: "#111827",
  body: "#374151",
  muted: "#6b7280",
  lightBg: "#f0fdf4",
  border: "#d1d5db",
  white: "#ffffff",
};

// ── Helper Functions ──
function heading1(text) {
  doc.moveDown(0.5);
  doc.fontSize(22).fillColor(C.primary).font("Helvetica-Bold").text(text);
  doc.moveDown(0.15);
  doc
    .moveTo(doc.x, doc.y)
    .lineTo(doc.x + 485, doc.y)
    .strokeColor(C.primary)
    .lineWidth(2)
    .stroke();
  doc.moveDown(0.6);
}

function heading2(text) {
  doc.moveDown(0.4);
  doc.fontSize(14).fillColor(C.dark).font("Helvetica-Bold").text(text);
  doc.moveDown(0.2);
}

function heading3(text) {
  doc.moveDown(0.3);
  doc.fontSize(11).fillColor(C.dark).font("Helvetica-Bold").text(text);
  doc.moveDown(0.15);
}

function body(text) {
  doc.fontSize(10).fillColor(C.body).font("Helvetica").text(text, { lineGap: 3 });
  doc.moveDown(0.2);
}

function bullet(text) {
  doc
    .fontSize(10)
    .fillColor(C.body)
    .font("Helvetica")
    .text(`  •  ${text}`, { lineGap: 2, indent: 10 });
}

function code(text) {
  const x = doc.x;
  const y = doc.y;
  doc.rect(x, y, 485, 14 * Math.ceil(text.length / 80) + 12).fill("#f3f4f6");
  doc
    .fontSize(9)
    .fillColor("#1f2937")
    .font("Courier")
    .text(text, x + 8, y + 6, { width: 470 });
  doc.moveDown(0.4);
}

function tableRow(cells, isHeader = false) {
  const startX = doc.x;
  const y = doc.y;
  const colWidths = cells.length === 2 ? [160, 325] : [120, 120, 245];
  const font = isHeader ? "Helvetica-Bold" : "Helvetica";
  const color = isHeader ? C.dark : C.body;
  const fontSize = isHeader ? 9 : 9;

  if (isHeader) {
    doc.rect(startX, y - 2, 485, 18).fill("#f9fafb");
  }

  let cx = startX;
  cells.forEach((cell, i) => {
    doc.fontSize(fontSize).fillColor(color).font(font).text(cell, cx + 4, y + 2, {
      width: colWidths[i] - 8,
      lineBreak: false,
    });
    cx += colWidths[i];
  });

  doc.y = y + 18;
  doc
    .moveTo(startX, doc.y)
    .lineTo(startX + 485, doc.y)
    .strokeColor("#e5e7eb")
    .lineWidth(0.5)
    .stroke();
  doc.moveDown(0.1);
}

// ═══════════════════════════════════════════════════════════
// ██  TITLE PAGE
// ═══════════════════════════════════════════════════════════

doc.rect(0, 0, 595, 842).fill(C.dark);

// Green accent bar
doc.rect(0, 300, 595, 6).fill(C.primary);

doc
  .fontSize(42)
  .fillColor(C.white)
  .font("Helvetica-Bold")
  .text("ScoutPro", 55, 200, { align: "center" });

doc
  .fontSize(14)
  .fillColor(C.primary)
  .font("Helvetica")
  .text("Professional Football Scouting Platform", 55, 255, { align: "center" });

doc
  .fontSize(11)
  .fillColor("#9ca3af")
  .font("Helvetica")
  .text("Technical Documentation", 55, 340, { align: "center" });

doc
  .fontSize(10)
  .fillColor("#6b7280")
  .font("Helvetica")
  .text("Version 2.0  |  February 2026", 55, 370, { align: "center" });

// ═══════════════════════════════════════════════════════════
// ██  TABLE OF CONTENTS
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("Table of Contents");
doc.moveDown(0.3);

const toc = [
  "1. Project Overview",
  "2. Technology Stack",
  "3. Project Structure",
  "4. Architecture & State Management",
  "5. Pages & Routing",
  "6. Components",
  "7. Data Model (Player)",
  "8. Internationalization (i18n)",
  "9. Admin Panel",
  "10. Installation & Launch",
  "11. Build & Deployment",
  "12. Environment & Configuration",
];

toc.forEach((item) => {
  doc.fontSize(11).fillColor(C.body).font("Helvetica").text(item, { lineGap: 6 });
});

// ═══════════════════════════════════════════════════════════
// ██  1. PROJECT OVERVIEW
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("1. Project Overview");

body(
  "ScoutPro is a professional football scouting analytics platform designed for discovering, evaluating, and comparing football talents worldwide. The application provides a comprehensive set of tools for scouts, analysts, and club management."
);

doc.moveDown(0.2);

heading2("Key Features");
bullet("Player database with detailed profiles (stats, history, market value)");
bullet("Advanced attribute visualization (radar charts, stat bars)");
bullet("Side-by-side player comparison tool");
bullet("Multi-language interface (Russian, English, Kyrgyz)");
bullet("Admin panel for managing players, content, and settings");
bullet("Responsive design optimized for all screen sizes");
bullet("Search, filter, and sort capabilities");

doc.moveDown(0.3);

heading2("Target Audience");
bullet("Football scouts and talent analysts");
bullet("Club management and coaching staff");
bullet("Sports data analysts");

// ═══════════════════════════════════════════════════════════
// ██  2. TECHNOLOGY STACK
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("2. Technology Stack");

heading2("Core Framework");
tableRow(["Technology", "Details"], true);
tableRow(["React", "v19 — UI library"]);
tableRow(["TypeScript", "v5.7 — Type-safe JavaScript"]);
tableRow(["Vite", "v6 — Build tool & dev server"]);
tableRow(["React Router DOM", "v7 — Client-side routing"]);

doc.moveDown(0.4);

heading2("Styling & UI");
tableRow(["Technology", "Details"], true);
tableRow(["Tailwind CSS", "v3.4 — Utility-first CSS"]);
tableRow(["shadcn/ui", "Radix-based UI component library"]);
tableRow(["Recharts", "v2.15 — Chart library"]);
tableRow(["Lucide React", "Icon library"]);
tableRow(["tailwindcss-animate", "Animation utilities"]);
tableRow(["class-variance-authority", "Component variant management"]);

doc.moveDown(0.4);

heading2("State & Forms");
tableRow(["Technology", "Details"], true);
tableRow(["React Context", "Global state management"]);
tableRow(["React Hook Form", "Form handling"]);
tableRow(["Zod", "Schema validation"]);

doc.moveDown(0.4);

heading2("Additional Libraries");
tableRow(["Library", "Purpose"], true);
tableRow(["next-themes", "Theme switching (dark/light)"]);
tableRow(["sonner", "Toast notifications"]);
tableRow(["date-fns", "Date formatting utilities"]);
tableRow(["vaul", "Drawer component"]);
tableRow(["cmdk", "Command palette"]);

// ═══════════════════════════════════════════════════════════
// ██  3. PROJECT STRUCTURE
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("3. Project Structure");

body("The project follows a standard Vite + React structure with aliases configured via tsconfig and vite.config.ts.");

doc.moveDown(0.2);

code(
  `ScoutPro/
├── public/                  # Static assets
├── src/
│   ├── main.tsx             # Entry point
│   ├── App.tsx              # Root component with routing
│   ├── globals.css          # Global styles & design tokens
│   ├── components/
│   │   ├── app-provider.tsx # Context provider (global state)
│   │   ├── navbar.tsx       # Navigation bar
│   │   ├── footer.tsx       # Footer
│   │   ├── hero-section.tsx # Landing hero block
│   │   ├── features-section.tsx
│   │   ├── top-players-section.tsx
│   │   ├── player-card.tsx  # Player card component
│   │   ├── player-profile.tsx
│   │   ├── players-content.tsx
│   │   ├── compare-content.tsx
│   │   ├── admin-content.tsx
│   │   ├── stat-bar.tsx     # Stat progress bar
│   │   ├── stat-radar.tsx   # Radar/spider chart
│   │   └── theme-provider.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PlayersPage.tsx
│   │   ├── PlayerProfilePage.tsx
│   │   ├── ComparePage.tsx
│   │   └── AdminPage.tsx
│   └── lib/
│       ├── i18n.ts          # Translations (RU, EN, KY)
│       ├── players-data.ts  # Player interface & default data
│       ├── store.ts         # Context type definitions
│       └── utils.ts         # Utility functions (cn)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json`
);

// ═══════════════════════════════════════════════════════════
// ██  4. ARCHITECTURE & STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("4. Architecture & State Management");

body(
  "ScoutPro uses React Context API for centralized state management. The AppProvider component wraps the entire application and exposes state and actions through the useAppContext hook."
);

heading2("AppState Interface");
code(
  `interface AppState {
  locale: Locale             // "ru" | "en" | "ky"
  translations: Translations // Active translation strings
  customTranslations: Record<string, Record<string, string>>
  players: Player[]          // List of all players
  compareList: string[]      // IDs of players to compare (max 2)
  isAdminAuthenticated: boolean
}`
);

heading2("Available Actions");
tableRow(["Action", "Description"], true);
tableRow(["setLocale(locale)", "Switch interface language"]);
tableRow(["setPlayers(players)", "Replace the full player list"]);
tableRow(["addPlayer(player)", "Add a new player"]);
tableRow(["updatePlayer(id, data)", "Update an existing player"]);
tableRow(["deletePlayer(id)", "Remove a player"]);
tableRow(["toggleCompare(id)", "Add/remove player from comparison"]);
tableRow(["clearCompare()", "Clear comparison list"]);
tableRow(["updateTranslation(...)", "Override a translation string"]);
tableRow(["setAdminAuth(bool)", "Set admin authentication state"]);

doc.moveDown(0.4);

heading2("Data Flow");
body(
  "1. AppProvider initializes state with default players and Russian locale.\n" +
    "2. Components consume state via useAppContext() hook.\n" +
    "3. Actions dispatch setState updates immutably.\n" +
    "4. All callbacks are memoized with useCallback for performance.\n" +
    "5. Context value is memoized with useMemo to prevent unnecessary re-renders."
);

// ═══════════════════════════════════════════════════════════
// ██  5. PAGES & ROUTING
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("5. Pages & Routing");

body("Routing is handled by React Router DOM v7. All routes are defined in App.tsx.");

doc.moveDown(0.3);

tableRow(["Route", "Page", "Description"], true);
tableRow(["/", "HomePage", "Landing page with hero, features, top players"]);
tableRow(["/players", "PlayersPage", "Player database with search/filter/sort"]);
tableRow(["/players/:id", "PlayerProfilePage", "Individual player profile"]);
tableRow(["/compare", "ComparePage", "Side-by-side player comparison"]);
tableRow(["/admin", "AdminPage", "Admin panel (auth-protected)"]);

doc.moveDown(0.5);

heading2("Home Page (/)");
body(
  "The landing page consists of three sections: HeroSection (banner with stats counters: 12,000+ players, 850+ clubs, 120+ countries, 3,200+ scouts), FeaturesSection (platform capabilities overview), and TopPlayersSection (showcase of highest-rated players)."
);

heading2("Players Page (/players)");
body(
  "A searchable and filterable player database. Users can search by name/club/nationality, filter by position (Forward, Midfielder, Defender, Goalkeeper), sort by rating/age/name, and switch between grid and list view modes."
);

heading2("Player Profile (/players/:id)");
body(
  "Detailed player profile with three tabs: Overview (radar chart + season stats + attribute bars), Statistics (detailed technical and physical stats), and History (career history table by season)."
);

heading2("Compare Page (/compare)");
body(
  "Side-by-side comparison tool. Two dropdown selectors with search allow picking players. The comparison shows overall rating, attribute bars, overlaid radar charts, and season statistics table."
);

heading2("Admin Page (/admin)");
body(
  "Password-protected admin panel (default password: admin123). Contains four tabs: Language (switch site locale), Content (edit translation strings), Players Management (CRUD operations on players), and Settings (site title/description)."
);

// ═══════════════════════════════════════════════════════════
// ██  6. COMPONENTS
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("6. Components");

heading2("Layout Components");
tableRow(["Component", "Description"], true);
tableRow(["Navbar", "Sticky header with navigation links and language switcher"]);
tableRow(["Footer", "Site footer with links and copyright"]);
tableRow(["AppProvider", "Context provider wrapping the entire app"]);
tableRow(["ThemeProvider", "Dark/light theme support via next-themes"]);
tableRow(["PageShell", "Layout wrapper for page content"]);

doc.moveDown(0.3);

heading2("Feature Components");
tableRow(["Component", "Description"], true);
tableRow(["HeroSection", "Landing page hero with CTA and stat counters"]);
tableRow(["FeaturesSection", "Platform features grid (4 feature cards)"]);
tableRow(["TopPlayersSection", "Top-rated players showcase"]);
tableRow(["PlayersContent", "Full players list with search, filter, sort"]);
tableRow(["PlayerCard", "Player summary card for grid view"]);
tableRow(["PlayerProfile", "Complete player profile with tabs"]);
tableRow(["CompareContent", "Comparison interface with selectors and charts"]);
tableRow(["AdminContent", "Admin panel with CRUD and settings"]);

doc.moveDown(0.3);

heading2("Visualization Components");
tableRow(["Component", "Description"], true);
tableRow(["StatRadar", "SVG radar/spider chart for 6 attributes"]);
tableRow(["StatBar", "Horizontal progress bar for single stat"]);

// ═══════════════════════════════════════════════════════════
// ██  7. DATA MODEL
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("7. Data Model (Player)");

body("The Player interface defines the complete data structure for each footballer in the system.");

doc.moveDown(0.2);

code(
  `interface Player {
  id: string
  name: string
  age: number
  nationality: string
  nationalityFlag: string    // ISO country code
  club: string
  clubLogo: string           // Club abbreviation code
  position: "forward" | "midfielder" | "defender" | "goalkeeper"
  height: number             // in cm
  weight: number             // in kg
  foot: "Left" | "Right" | "Both"
  contractUntil: string      // Year
  marketValue: string        // e.g. "180M"
  image: string              // URL
  stats: {
    pace: number             // 0-99
    shooting: number
    passing: number
    dribbling: number
    defending: number
    physical: number
  }
  seasonStats: {
    appearances: number
    goals: number
    assists: number
    cleanSheets: number
    rating: number           // e.g. 8.2
  }
  history: {
    season: string           // e.g. "2024/25"
    club: string
    appearances: number
    goals: number
    assists: number
  }[]
}`
);

doc.moveDown(0.3);

heading2("Default Players (12 entries)");
tableRow(["Player", "Club", "Position"], true);
tableRow(["Lamine Yamal", "FC Barcelona", "Forward"]);
tableRow(["Jude Bellingham", "Real Madrid", "Midfielder"]);
tableRow(["Florian Wirtz", "Bayer Leverkusen", "Midfielder"]);
tableRow(["Erling Haaland", "Manchester City", "Forward"]);
tableRow(["Gavi", "FC Barcelona", "Midfielder"]);
tableRow(["William Saliba", "Arsenal", "Defender"]);
tableRow(["Jamal Musiala", "Bayern Munich", "Midfielder"]);
tableRow(["Giorgi Mamardashvili", "Liverpool", "Goalkeeper"]);
tableRow(["Alejandro Garnacho", "Napoli", "Forward"]);
tableRow(["Josko Gvardiol", "Manchester City", "Defender"]);
tableRow(["Bukayo Saka", "Arsenal", "Forward"]);
tableRow(["Pedri", "FC Barcelona", "Midfielder"]);

// ═══════════════════════════════════════════════════════════
// ██  8. I18N
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("8. Internationalization (i18n)");

body(
  "ScoutPro supports three languages out of the box. All UI strings are stored in a single translations object in lib/i18n.ts. The active locale is managed in the global state."
);

doc.moveDown(0.2);

heading2("Supported Locales");
tableRow(["Code", "Language"], true);
tableRow(["ru", "Russian (default)"]);
tableRow(["en", "English"]);
tableRow(["ky", "Kyrgyz"]);

doc.moveDown(0.3);

heading2("Translation Sections");
tableRow(["Section", "Description"], true);
tableRow(["nav", "Navigation labels and search placeholder"]);
tableRow(["hero", "Hero section title, subtitle, CTA, stat labels"]);
tableRow(["features", "Feature cards titles and descriptions"]);
tableRow(["players", "Player list labels, filters, sorting options"]);
tableRow(["profile", "Player profile labels, stat names, tabs"]);
tableRow(["compare", "Comparison page labels"]);
tableRow(["admin", "Admin panel all labels, buttons, form fields"]);
tableRow(["footer", "Footer text, links, copyright"]);

doc.moveDown(0.3);

heading2("Adding a New Language");
body(
  "1. Add the locale code to the Locale type in lib/i18n.ts.\n" +
    '2. Add a new entry to the translations object with all required keys.\n' +
    "3. Add the locale button in Navbar and AdminContent language tab.\n" +
    "4. The language switcher will automatically pick up the new locale."
);

// ═══════════════════════════════════════════════════════════
// ██  9. ADMIN PANEL
// ═══════════════════════════════════════════════════════════

heading1("9. Admin Panel");

body(
  "The admin panel is protected by a simple password authentication (default: admin123). It provides four management tabs."
);

doc.moveDown(0.2);

heading2("Authentication");
body(
  'The admin login form validates the password against a hardcoded value "admin123". On success, isAdminAuthenticated is set to true in the global state. The admin can log out at any time.'
);

heading2("Tabs");
heading3("Language Tab");
body("Allows switching the entire site interface between RU, EN, and KY locales.");

heading3("Content Tab");
body(
  "Provides an inline editor for all translation strings. Admins can select a section (nav, hero, features, etc.) and edit individual text values. Changes apply immediately to the interface."
);

heading3("Players Management Tab");
body(
  "Full CRUD operations on the player database. Add new players with name, age, club, position, nationality, and rating. Edit existing player fields inline. Delete players with confirmation dialog."
);

heading3("Settings Tab");
body("Configure the site title and description.");

// ═══════════════════════════════════════════════════════════
// ██  10. INSTALLATION
// ═══════════════════════════════════════════════════════════

doc.addPage();

heading1("10. Installation & Launch");

heading2("Prerequisites");
bullet("Node.js 18+ installed");
bullet("npm, pnpm, or yarn package manager");

doc.moveDown(0.3);

heading2("Steps");

heading3("1. Clone the repository");
code("git clone https://github.com/enzerro/ScoutPro.git\ncd ScoutPro");

heading3("2. Install dependencies");
code("pnpm install   # or npm install");

heading3("3. Start development server");
code("pnpm dev       # or npm run dev");

body("The application will be available at http://localhost:5173");

doc.moveDown(0.4);

// ═══════════════════════════════════════════════════════════
// ██  11. BUILD & DEPLOY
// ═══════════════════════════════════════════════════════════

heading1("11. Build & Deployment");

heading2("Production Build");
code("pnpm build     # Runs tsc && vite build");

body("Output is generated in the dist/ directory as static files.");

doc.moveDown(0.3);

heading2("Preview Build");
code("pnpm preview   # Serves the dist/ folder locally");

doc.moveDown(0.3);

heading2("Deployment Options");
bullet("Vercel — Deploy directly from the GitHub repository. Vite is auto-detected.");
bullet("Netlify — Set build command to 'pnpm build' and publish directory to 'dist'.");
bullet("Any static hosting — Upload the dist/ folder contents.");

// ═══════════════════════════════════════════════════════════
// ██  12. CONFIGURATION
// ═══════════════════════════════════════════════════════════

doc.moveDown(0.5);

heading1("12. Environment & Configuration");

heading2("Vite Configuration (vite.config.ts)");
body("The Vite config includes the React plugin and sets up a path alias (@) pointing to the src/ directory.");

code(
  `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})`
);

heading2("TypeScript Configuration");
body(
  'TypeScript is configured with strict mode. Path aliases are defined in tsconfig.json, mapping "@/*" to "./src/*". Target is ES2020 with JSX set to react-jsx.'
);

heading2("Tailwind Configuration");
body(
  "Tailwind is configured with the shadcn/ui preset, including custom design tokens for colors (primary, secondary, background, foreground, etc.), border radius, and dark mode support via CSS variables."
);

// ═══════════════════════════════════════════════════════════
// ██  FOOTER ON EVERY PAGE
// ═══════════════════════════════════════════════════════════

const pages = doc.bufferedPageRange();
for (let i = 0; i < pages.count; i++) {
  doc.switchToPage(i);

  // Skip title page footer
  if (i === 0) continue;

  doc
    .fontSize(8)
    .fillColor(C.muted)
    .font("Helvetica")
    .text(`ScoutPro Documentation  |  Page ${i}`, 55, 780, {
      width: 485,
      align: "center",
    });
}

doc.end();

stream.on("finish", () => {
  console.log("PDF generated successfully: public/ScoutPro_Documentation.pdf");
});
