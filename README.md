# SILverCalc — SIL Calculator

SIL (Safety Integrity Level) Calculator for safety engineers based on IEC 61508, IEC 61511, and ISA 84 standards. A comprehensive web-based tool for SIL assessment, LOPA, PFDavg calculations, and SIL verification.

## Features

### 🎯 Risk Graph Method (IEC 61511-3 Annex A)
- 4-step wizard for consequence, frequency, avoidance, and demand rate assessment
- Interactive risk graph visualization
- Support for Mode A (2-level) and Mode B (3-level) frequency
- Auto-calculation of SIL target

### 📊 LOPA Method (IEC 61511-3 Annex F)
- Spreadsheet-like worksheet interface
- Built-in initiating event library (50+ events)
- Built-in IPL library (30+ protection layers)
- Sensitivity analysis with tornado charts
- Automatic SIL determination

### 🧮 PFDavg Calculator (IEC 61508-6)
- Support for all common architectures: 1oo1, 1oo2, 2oo2, 1oo3, 2oo3, 2oo4, MooN
- Real-time PFDavg calculation
- Safe failure fraction (SFF) and diagnostic coverage
- Proof test interval optimization
- PFDavg vs time plotting

### ✅ SIL Verification
- IEC 61508 Table 2/3 compliance check
- Route 1H (SFF-based) and Route 2H (reliability-based) verification
- Traffic light system for PASS/WARNING/FAIL
- Automatic recommendations

### 📄 Report Generation
- Multi-page PDF reports
- SIL certificate generation
- Company branding support
- Draft mode for review

## Tech Stack

- **Framework**: React 19 + Vite 8
- **Language**: TypeScript (strict mode)
- **State Management**: Zustand
- **Routing**: React Router 7
- **Styling**: TailwindCSS 4
- **Database**: Dexie.js (IndexedDB)
- **Charts**: Recharts
- **PDF Generation**: pdfmake
- **Math**: mathjs
- **Testing**: Vitest + React Testing Library + Playwright

## Getting Started

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arienug20/silvercalc.git
cd silvercalc
```

2. Install dependencies:
```bash
npm install
```

3. Seed the database (optional - auto-seeds on first run):
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run test` — Run tests in watch mode
- `npm run test:run` — Run tests once
- `npm run test:coverage` — Run tests with coverage
- `npm run test:e2e` — Run Playwright E2E tests
- `npm run lint` — Run ESLint
- `npm run lint:fix` — Fix linting issues
- `npm run format` — Format code with Prettier
- `npm run typecheck` — Run TypeScript type checking

## Project Structure

```
silvercalc/
├── src/
│   ├── core/           # Core algorithms
│   ├── data/           # Reference data
│   ├── db/             # IndexedDB schema & seed
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand state management
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main app with routing
├── tests/
│   ├── core/           # Unit tests for algorithms
│   ├── integration/    # Integration tests
│   └── e2e/            # End-to-end tests
└── public/             # Static assets
```

## Standards Compliance

- **IEC 61508**: Functional safety of electrical/electronic/programmable electronic safety-related systems
- **IEC 61511**: Functional safety - Safety instrumented systems for the process industry sector
- **ISA 84**: Application of Safety Instrumented Systems (SIS) for the Process Industry

## Roadmap

- [ ] Risk Graph wizard implementation
- [ ] LOPA worksheet with library support
- [ ] PFDavg calculator with all architectures
- [ ] SIL verification dashboard
- [ ] PDF report generation
- [ ] Project management (save/load/version history)
- [ ] Multi-language support (English + Bahasa Indonesia)
- [ ] Dark mode
- [ ] Offline support (PWA)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- IEC 61508 and IEC 61511 standards for SIL methodology
- CCPS (Center for Chemical Process Safety) for initiating event data
- The open-source community for React, Vite, and other tools

## Support

For questions or issues, please open an issue on GitHub.

---

**Built with ❤️ for safety engineers worldwide**