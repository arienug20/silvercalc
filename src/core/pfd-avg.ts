export type Architecture = '1oo1' | '1oo2' | '2oo2' | '1oo3' | '2oo3' | '2oo4' | 'MooN';

export interface PfdInput {
  architecture: Architecture;
  m?: number;
  n?: number;
  lambdaDU: number;  // Dangerous undetected (per hour)
  lambdaDD: number;  // Dangerous detected (per hour)
  lambdaSU: number;  // Safe undetected (per hour)
  lambdaSD: number;  // Safe detected (per hour)
  betaFactor: number;  // Common cause (0-1)
  proofTestInterval: number;  // hours
  mttr: number;  // Mean time to restoration (hours)
  missionTime: number;  // years
  diagnosticCoverage?: number;  // % (optional override)
}

export interface PfdResult {
  architecture: Architecture;
  pfdAvg: number;
  sff: number;
  hft: number;
  lambdaD: number;
  lambdaS: number;
  diagnosticCoverage: number;
  silAchieved: number;
  silDescription: string;
}

export function calculatePfdAvg(input: PfdInput): PfdResult {
  const {
    architecture,
    lambdaDU,
    lambdaDD,
    lambdaSU,
    lambdaSD,
    betaFactor,
    proofTestInterval,
  } = input;

  // Calculate derived values
  const lambdaD = lambdaDU + lambdaDD;  // Total dangerous
  const lambdaS = lambdaSU + lambdaSD;  // Total safe
  // const lambda = lambdaD + lambdaS;     // Total failure rate

  // Calculate diagnostic coverage (if not provided)
  const diagnosticCoverage = input.diagnosticCoverage ?? (lambdaDD / lambdaD) * 100;

  // Calculate safe failure fraction
  const sff = ((lambdaDD + lambdaS) / (lambdaD + lambdaS)) * 100;

  // Calculate hardware fault tolerance
  const hft = calculateHft(architecture, input.m, input.n);

  // Calculate PFDavg based on architecture
  const pfdAvg = calculatePfdForArchitecture(
    architecture,
    lambdaDU,
    betaFactor,
    proofTestInterval,
    input.m,
    input.n
  );

  // Determine SIL achieved from PFDavg
  const silAchieved = determineSilFromPfd(pfdAvg);

  const silDescription = getSilDescription(silAchieved);

  return {
    architecture,
    pfdAvg,
    sff,
    hft,
    lambdaD,
    lambdaS,
    diagnosticCoverage,
    silAchieved,
    silDescription,
  };
}

function calculatePfdForArchitecture(
  architecture: Architecture,
  lambdaDU: number,
  beta: number,
  ti: number,
  m?: number,
  n?: number
): number {
  const lambdaDU_cc = beta * lambdaDU;  // Common cause dangerous undetected
  const lambdaDU_ind = (1 - beta) * lambdaDU;  // Independent dangerous undetected

  switch (architecture) {
    case '1oo1':
      // PFDavg = λDU × TI / 2
      return lambdaDU * ti / 2;

    case '1oo2':
      // Any 1 of 2 needed: PFDavg ≈ [(1-β)λDU]² × TI² / 3
      return Math.pow(lambdaDU_ind, 2) * Math.pow(ti, 2) / 3;

    case '2oo2':
      // Both needed: PFDavg ≈ 2 × (1-β)λDU × TI / 2 + βλDU × TI / 2
      return 2 * lambdaDU_ind * ti / 2 + lambdaDU_cc * ti / 2;

    case '1oo3':
      // Any 1 of 3 needed: PFDavg ≈ [(1-β)λDU]³ × TI³ / 4
      return Math.pow(lambdaDU_ind, 3) * Math.pow(ti, 3) / 4;

    case '2oo3':
      // 2 of 3 needed: PFDavg ≈ 3 × [(1-β)λDU]² × TI² / 2 + βλDU × TI / 2
      return 3 * Math.pow(lambdaDU_ind, 2) * Math.pow(ti, 2) / 2 + lambdaDU_cc * ti / 2;

    case '2oo4':
      // 2 of 4 needed: PFDavg ≈ 6 × [(1-β)λDU]² × TI² + βλDU × TI / 2
      return 6 * Math.pow(lambdaDU_ind, 2) * Math.pow(ti, 2) + lambdaDU_cc * ti / 2;

    case 'MooN':
      if (m === undefined || n === undefined) {
        throw new Error('M and N must be specified for MooN architecture');
      }
      // General formula: sum of combinations
      // This is a simplified approximation
      const k = m;  // minimum working
      const combinations = binomialCoefficient(n, k);
      return combinations * Math.pow(lambdaDU_ind, n - k + 1) * Math.pow(ti, n - k + 1) / (n - k + 2);

    default:
      throw new Error(`Unknown architecture: ${architecture}`);
  }
}

function calculateHft(architecture: Architecture, m?: number, n?: number): number {
  switch (architecture) {
    case '1oo1':
      return 0;
    case '1oo2':
    case '2oo3':
      return 1;
    case '2oo2':
      return 0;
    case '1oo3':
      return 2;
    case '2oo4':
      return 2;
    case 'MooN':
      if (m === undefined || n === undefined) {
        return 0;
      }
      return n - m;
    default:
      return 0;
  }
}

function binomialCoefficient(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;

  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return result;
}

function determineSilFromPfd(pfd: number): number {
  if (pfd >= 1e-1) return 0;  // No SIL
  if (pfd >= 1e-2) return 1;  // SIL 1
  if (pfd >= 1e-3) return 2;  // SIL 2
  if (pfd >= 1e-4) return 3;  // SIL 3
  return 4;                   // SIL 4 (or 4+)
}

function getSilDescription(sil: number): string {
  const descriptions: Record<number, string> = {
    0: 'No SIL - PFDavg >= 10⁻¹',
    1: 'SIL 1 - PFDavg: 10⁻² to 10⁻¹',
    2: 'SIL 2 - PFDavg: 10⁻³ to 10⁻²',
    3: 'SIL 3 - PFDavg: 10⁻⁴ to 10⁻³',
    4: 'SIL 4 - PFDavg: 10⁻⁵ to 10⁻⁴',
  };
  return descriptions[sil] || 'Unknown';
}

export function optimizeProofTestInterval(
  targetPfd: number,
  architecture: Architecture,
  lambdaDU: number,
  betaFactor: number,
  maxTi: number = 87600 // 10 years max
): { optimalTi: number; achievedPfd: number } {
  // Binary search for maximum TI that still meets target
  let low = 1;
  let high = maxTi;
  let optimalTi = 0;
  let achievedPfd = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const result = calculatePfdAvg({
      architecture,
      lambdaDU,
      lambdaDD: 0,
      lambdaSU: 0,
      lambdaSD: 0,
      betaFactor,
      proofTestInterval: mid,
      mttr: 8,
      missionTime: 20,
    });

    if (result.pfdAvg <= targetPfd) {
      optimalTi = mid;
      achievedPfd = result.pfdAvg;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return { optimalTi, achievedPfd };
}

export function generatePfdTimeProfile(
  architecture: Architecture,
  lambdaDU: number,
  betaFactor: number,
  proofTestInterval: number,
  missionTime: number
): { time: number; pfd: number }[] {
  const points: { time: number; pfd: number }[] = [];
  const hours = missionTime * 8760;

  for (let t = 0; t <= hours; t += proofTestInterval / 10) {
    const cycleTime = t % proofTestInterval;
    const result = calculatePfdForArchitecture(architecture, lambdaDU, betaFactor, cycleTime);
    points.push({ time: t, pfd: result });
  }

  return points;
}