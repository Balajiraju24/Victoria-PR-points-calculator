# VicPoints — Victorian Skilled Migration Points Calculator

> **Independent, production-ready Victorian Points Test (VPT) scoring engine and scenario planning web application for Subclass 190 (Skilled Nominated) and Subclass 491 (Skilled Work Regional) visa nomination.**

---

## 1. Overview & Objective

**VicPoints** is a transparent, client-side web application designed to help skilled migrants estimate and plan their Victorian Points Test (VPT) scores for:
- **Skilled Nominated visa (Subclass 190)** — Permanent residency pathway.
- **Skilled Work Regional (Provisional) visa (Subclass 491)** — 5-year provisional regional pathway.

The Victorian Government assesses Registrations of Interest (ROIs) submitted on the *Live in Melbourne* portal using a state-specific 7-factor points test. VicPoints translates the published rules, salary bands, and priority sector criteria into an accessible, real-time calculator and scenario planner.

---

## 2. Authoritative Sources & Rule Verification

All calculation rules, points tables, and boundary interpretations are directly benchmarked against published Victorian State Government and Australian Commonwealth resources:

| Resource | Authority | Official URL |
| :--- | :--- | :--- |
| **Victorian Points Test (VPT) Table** | Live in Melbourne (Victorian Government) | [liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt](https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/vpt) |
| **Victorian Points Test FAQs** | Live in Melbourne (Victorian Government) | [liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/newfaqs](https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/newfaqs) |
| **Annual Earnings Estimation Guide** | Live in Melbourne (Victorian Government) | [liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/earnings-calculator](https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/earnings-calculator) |
| **Registration of Interest (ROI) Guidelines** | Live in Melbourne (Victorian Government) | [liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/registration-of-interest-for-victorian-state-visa-nomination](https://liveinmelbourne.vic.gov.au/migrate/skilled-migration-visas/registration-of-interest-for-victorian-state-visa-nomination) |
| **Federal SkillSelect Points Calculator** | Department of Home Affairs | [immi.homeaffairs.gov.au/.../points-calculator](https://immi.homeaffairs.gov.au/help-support/departmental-forms/online-forms/points-calculator) |

- **Current Rules Version:** `2024.1-VPT`
- **Program Year:** 2024–2025 / 2025–2026
- **Last Verified Date:** October 2024

---

## 3. The Seven Victorian Scoring Factors

The VPT awards points across seven distinct factors, up to a theoretical maximum of **950 points**:

```
Total VPT Points (Max 950) = 
  Age (300) 
  + English Language (200) 
  + Skilled Victorian Earnings (150) 
  + Nominated Work Experience (100) 
  + Educational Qualifications (100) 
  + Occupation Skill Level (50) 
  + Eligible Partner Skills (50)
```

### Factor A: Age (Max 300 points)
- Age 18: 265 pts
- Age 19: 282 pts
- **Ages 20–29:** 300 pts *(Maximum peak)*
- Age 30: 286 pts
- Age 31: 270 pts
- Age 32: 256 pts
- Age 33: 240 pts
- Age 34: 226 pts
- Age 35: 210 pts
- Age 36: 196 pts
- Age 37: 180 pts
- Age 38: 166 pts
- Age 39: 150 pts
- Age 40: 136 pts
- Age 41: 106 pts
- Age 42: 76 pts
- Age 43: 46 pts
- Age 44: 16 pts
- *Ages < 18 or ≥ 45:* Ineligible under statutory Australian skilled migration criteria (0 pts + warning).

### Factor B: English Language Proficiency (Max 200 points)
- **Competent English:** 0 pts *(Mandatory legal threshold: IELTS 6.0 / PTE 50)*
- **Proficient English:** 100 pts *(IELTS 7.0 / PTE 65)*
- **Superior English:** 200 pts *(IELTS 8.0 / PTE 79)*

### Factor C: Skilled Work Experience in Nominated Occupation (Max 100 points)
- 0 years (less than 1 year): 0 pts
- 1 year: 20 pts
- 1–3 years: 40 pts
- 3–5 years: 60 pts
- 6–8 years: 80 pts
- More than 8 years: 100 pts
*Boundary Note:* Overlapping bracket labels on official publications are surfaced transparently to users with conservative baseline mappings and boundary guidance.

### Factor D: Educational Qualifications (Max 100 points)
- Other Recognized Qualification (Diploma / Trade Certificate / Cert IV): 25 pts
- Bachelor's Degree or Honours: 50 pts
- Master's Degree (Coursework or Research): 75 pts
- Doctoral Degree (PhD): 100 pts

### Factor E: Occupation ANZSCO Skill Level (Max 50 points)
- **Skill Level 1:** 50 pts *(Bachelor degree or higher equivalent)*
- **Skill Level 2:** 0 pts *(Associate Degree, Advanced Diploma, Diploma)*
- **Skill Level 3:** 0 pts *(Certificate IV or III with on-the-job training)*
- *Unverified:* Marked as Provisional with verification reminders.

### Factor F: Eligible Partner Skills (Max 50 points)
- Single / No Partner: 0 pts *(Note: Federal SkillSelect awards 10 federal points for being single; VPT awards 0)*
- Partnered (No Claim): 0 pts
- Partnered (Claiming): **50 pts ONLY IF all 3 conditions are satisfied:**
  1. Claims 10 partner skill points in federal SkillSelect EOI.
  2. Partner included in Victorian nomination application.
  3. Partner's nominated occupation is in a Victorian Priority Industry.

### Factor G: Eligible Victorian Skilled Earnings (Max 150 points)
Applicable to onshore candidates currently employed in an eligible skilled role in Victoria:
- Under $80,000 AUD: 0 pts
- $80,000 – $84,999: 8 pts
- $85,000 – $89,999: 16 pts
- $90,000 – $94,999: 24 pts
- $95,000 – $99,999: 32 pts
- $100,000 – $104,999: 39 pts
- $105,000 – $109,999: 47 pts
- $110,000 – $114,999: 55 pts
- $115,000 – $119,999: 63 pts
- $120,000 – $124,999: 71 pts
- $125,000 – $129,999: 79 pts
- $130,000 – $134,999: 87 pts
- $135,000 – $139,999: 95 pts
- $140,000 – $144,999: 103 pts
- $145,000 – $149,999: 111 pts
- $150,000 – $154,999: 118 pts
- $155,000 – $159,999: 126 pts
- $160,000 – $164,999: 134 pts
- $165,000 – $169,999: 142 pts
- $170,000 AUD and above: 150 pts

---

## 4. Key Architectural Features

1. **Pure Scoring Engine (`src/lib/vpt-scoring.ts`):**
   - Pure, deterministic TypeScript functions without UI side-effects.
   - Exact integer arithmetic (no floating-point rounding errors).
   - Invariant: `totalPoints === sum(factors)` strictly validated by automated tests.
   - Comprehensive handling of unanswered vs zero-point selections.
2. **Gross Pay Frequency Converter (`GrossPayConverter.tsx`):**
   - Converts hourly, weekly, fortnightly, or monthly gross earnings to annualized AUD with 1-click apply.
3. **Salary Scenario Planner (`SalaryScenarioPlanner.tsx`):**
   - Real-time comparison table across official $5,000 salary milestones.
   - Interactive slider allowing candidates to explore hypothetical salary adjustments and points deltas.
4. **Verified Priority Occupations Directory (`/occupation-guide`):**
   - Searchable, filterable catalog of verified Victorian priority occupations with ANZSCO codes and skill level badges.
5. **Zero Data Storage & 100% Client-Side Privacy:**
   - No backend, no database, no authentication, no analytics collecting form answers, and no external AI API calls.
6. **Accessibility & Responsive Polish:**
   - WCAG 2.2 AA compliant form controls, visible focus rings, screen-reader status badges, keyboard navigation, and reduced-motion support.
   - Print stylesheet optimized for saving clean score summaries as PDF via browser print.
   - Full dark mode and light mode with persistent local preference.

---

## 5. Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 3
- **Icons:** Lucide React
- **Validation:** Zod
- **Unit Testing:** Vitest 4 + Happy-DOM
- **Component Testing:** React Testing Library + `@testing-library/jest-dom`
- **Deployment:** Vercel

---

## 6. Directory Structure

```
Victoria-PR-points-calculator/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, SEO metadata, Navbar & Footer
│   │   ├── page.tsx                # Homepage / Landing page
│   │   ├── globals.css             # Design tokens, print styles, dark mode
│   │   ├── robots.ts               # Robots.txt generator
│   │   ├── sitemap.ts              # Sitemap.xml generator
│   │   ├── calculator/             # Dedicated VPT Calculator page
│   │   ├── how-it-works/           # Scoring methodology & 7-factor explanation
│   │   ├── occupation-guide/       # ANZSCO tiers & priority sectors directory
│   │   ├── resources/              # Curated official government links
│   │   ├── faq/                    # Comprehensive accordion FAQ
│   │   ├── privacy/                # Privacy policy (Zero data storage)
│   │   └── disclaimer/             # Legal disclaimer & non-affiliation notice
│   ├── components/
│   │   ├── Navbar.tsx              # Responsive navbar with theme toggle
│   │   ├── Footer.tsx              # Footer with legal notes and version badge
│   │   ├── calculator/
│   │   │   ├── VptCalculator.tsx   # Core 2-column calculator & dashboard
│   │   │   ├── GrossPayConverter.tsx # Wage frequency annualized helper
│   │   │   └── SalaryScenarioPlanner.tsx # Real-time salary simulator
│   │   └── __tests__/
│   │       └── VptCalculator.test.tsx # Component interaction tests
│   ├── data/
│   │   └── occupations.ts          # Verified priority occupations dataset
│   └── lib/
│       ├── vpt-scoring.ts          # Core VPT calculation engine & invariants
│       └── __tests__/
│           └── vpt-scoring.test.ts # Comprehensive scoring unit tests
├── vitest.config.mts               # Vitest configuration with happy-dom
├── tailwind.config.ts              # Tailwind design tokens & dark mode class
├── next.config.mjs                 # Security headers and Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Project scripts & dependencies
```

---

## 7. Local Setup & Testing

### Prerequisites
- Node.js `v20.x` or higher
- npm `v10.x` or higher

### Install Dependencies
```bash
npm install
```

### Run Automated Test Suite
```bash
# Run Vitest unit & component test suite (28 tests)
npm test

# Run tests in watch mode
npm run test:watch
```

### Build for Production
```bash
npm run build
```

### Run Local Development Server
```bash
npm run dev
# Open http://localhost:3000 in your browser
```

---

## 8. Deployment Instructions (Vercel)

The application is completely self-contained and ready for Vercel deployment without environment variables or backend configuration:

### Method A: Deploy via GitHub & Vercel Dashboard (Recommended)
1. Initialize or push commits to your GitHub repository:
   ```bash
   git add .
   git commit -m "feat: complete production-ready VicPoints application"
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New** &rarr; **Project**.
4. Import `Balajiraju24/Victoria-PR-points-calculator` from your GitHub account.
5. Keep default settings:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click **Deploy**. Vercel will build and deploy the application to a public `.vercel.app` URL within 1-2 minutes.

### Method B: Deploy via Vercel CLI
```bash
npx vercel
# Follow prompts to link project and deploy
npx vercel --prod
```

---

## 9. Pre-Launch QA Checklist

- [x] **Scoring Accuracy:** Automated tests pass for every published age year (18–44), English level, education tier, experience category, occupation level, partner checklist, and every earnings band.
- [x] **Sum Invariant:** Unit test confirms `totalPoints` strictly equals the sum of the seven factor scores.
- [x] **Boundary Handling:** Under 18 and 45+ trigger non-eligible warnings; experience boundary ambiguities are surfaced.
- [x] **No Fabricated Data:** Clear disclaimer that Victoria does not publish a fixed pass mark; no fake chance gauges or user counts.
- [x] **Zero Tracking:** Client-side execution verified; form answers never submitted to remote servers.
- [x] **Production Build:** `npm run build` completes with exit code 0; all 14 static pages generated cleanly.
- [x] **Responsive Layout:** Form and live sticky summary adapt gracefully between mobile and desktop viewports.
- [x] **Dark Mode & Accessibility:** Fully functional theme switcher; WCAG 2.2 AA compliant focus states.
- [x] **Print & Export:** PDF / Print functionality tested via browser print media queries.
- [x] **SEO & Social:** Open Graph metadata, canonical settings, `sitemap.xml`, and `robots.txt` configured.

---

## 10. Known Program Limitations & Ambiguities

1. **Experience Category Boundary Overlap:** Official Victorian tables list discrete categories such as `"1 year"` (20 pts) and `"1–3 years"` (40 pts), as well as `"3–5 years"` (60 pts) and `"6–8 years"` (80 pts). VicPoints conservatively maps numeric years and prompts users to verify their exact option in the Live in Melbourne ROI dropdown.
2. **Earnings Verification:** Earnings points claims are subject to Victorian case officer verification during nomination assessment. Allowances, bonuses, and superannuation may be excluded depending on contract terms.
3. **No Pass Mark Guarantee:** State nomination invitation rounds are competitive and quota-dependent; high points do not guarantee an invitation.

---

## 11. Legal Non-Affiliation Notice

> VicPoints is an independent informational and planning tool. It is **not** affiliated with, endorsed by, or operated by the Victorian State Government, the Australian Commonwealth Government, or the Department of Home Affairs. Calculated scores are estimates and do not constitute migration, legal, or registered migration-agent advice.
