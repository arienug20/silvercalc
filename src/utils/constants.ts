export const SIL_BANDS = [
  { sil: 4, min: 1e-5, max: 1e-4, color: 'bg-purple-100 text-purple-800', label: 'SIL 4' },
  { sil: 3, min: 1e-4, max: 1e-3, color: 'bg-red-100 text-red-800', label: 'SIL 3' },
  { sil: 2, min: 1e-3, max: 1e-2, color: 'bg-orange-100 text-orange-800', label: 'SIL 2' },
  { sil: 1, min: 1e-2, max: 1e-1, color: 'bg-yellow-100 text-yellow-800', label: 'SIL 1' },
  { sil: 0, min: 1e-1, max: Infinity, color: 'bg-gray-100 text-gray-800', label: 'No SIL' },
];

export const ROUTES = [
  { path: '/dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { path: '/risk-graph', label: 'Risk Graph', icon: 'Network' },
  { path: '/lopa', label: 'LOPA', icon: 'Table' },
  { path: '/pfd', label: 'PFD Calculator', icon: 'Calculator' },
  { path: '/verification', label: 'Verification', icon: 'CheckCircle' },
  { path: '/report', label: 'Report', icon: 'FileText' },
  { path: '/settings', label: 'Settings', icon: 'Settings' },
];

export const DEFAULT_PROOF_TEST_INTERVAL = 8760; // 1 year in hours
export const DEFAULT_MTTR = 8; // 8 hours
export const DEFAULT_MISSION_TIME = 20; // 20 years
export const DEFAULT_BETA = 0.1; // 10% common cause

export const CONSEQUENCE_DESCRIPTIONS = {
  C1: 'Minor injury - First aid treatment only, no lost time',
  C2: 'Serious injury - Requires hospitalization, possible fatality',
  C3: 'Extensive - 1-10 fatalities, major damage',
  C4: 'Catastrophic - >10 fatalities, catastrophic damage',
};

export const FREQUENCY_DESCRIPTIONS = {
  F1: 'Rare - Workers spend less than 10% of time in hazard zone',
  F2: 'Frequent - Workers spend 10-100% of time in hazard zone',
  F3: 'Continuous - Workers continuously present in hazard zone',
};

export const AVOIDANCE_DESCRIPTIONS = {
  P1: 'Possible - Operators can identify and avoid hazard, >1 hour warning time',
  P2: 'Not possible - Hazard occurs too quickly or operators are remote',
};

export const DEMAND_RATE_DESCRIPTIONS = {
  W1: 'Very low - Less than once every 10 years',
  W2: 'Low - Once every 1-10 years',
  W3: 'High - More than once per year',
};