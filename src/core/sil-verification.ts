export type ComponentType = 'A' | 'B';
export type Route = '1H' | '2H';

export interface VerificationInput {
  silTarget: number;
  pfdAchieved: number;
  sff: number;
  hft: number;
  componentType: ComponentType;
  route: Route;
}

export interface VerificationResult {
  silTarget: number;
  pfdAchieved: number;
  pfdTargetMin: number;
  pfdTargetMax: number;
  silFromPfd: number;
  silFromArchitecture: number;
  route: Route;
  componentType: ComponentType;
  pfdCheckPassed: boolean;
  architectureCheckPassed: boolean;
  overallPassed: boolean;
  recommendations: string[];
  hft: number;
  sff: number;
}

export function verifySil(input: VerificationInput): VerificationResult {
  const {
    silTarget,
    pfdAchieved,
    sff,
    hft,
    componentType,
    route,
  } = input;

  // Get PFD range for target SIL
  const { min: pfdTargetMin, max: pfdTargetMax } = getPfdBand(silTarget);

  // Check 1: PFDavg within SIL band
  const silFromPfd = getSilFromPfd(pfdAchieved);
  const pfdCheckPassed = silFromPfd >= silTarget;

  // Check 2: Architectural constraints (IEC 61508 Table 2/3)
  const silFromArchitecture = getArchitecturalSil(sff, hft, componentType);
  const architectureCheckPassed = silFromArchitecture >= silTarget;

  // Overall result
  const overallPassed = pfdCheckPassed && architectureCheckPassed;

  // Generate recommendations
  const recommendations: string[] = [];

  if (!overallPassed) {
    if (!pfdCheckPassed) {
      recommendations.push(
        'PFDavg does not meet SIL target',
        'Consider: shorter proof test interval, higher diagnostic coverage, or more redundant architecture'
      );
    }
    if (!architectureCheckPassed) {
      recommendations.push(
        'Architecture constraints do not meet SIL target',
        'Consider: increase hardware fault tolerance (add redundancy) or improve safe failure fraction'
      );
    }
  } else if (silFromPfd > silTarget) {
    recommendations.push(
      'System exceeds SIL requirements - opportunity to reduce cost (e.g., longer proof test interval)'
    );
  } else {
    recommendations.push('System meets all SIL requirements');
  }

  return {
    silTarget,
    pfdAchieved,
    pfdTargetMin,
    pfdTargetMax,
    silFromPfd,
    silFromArchitecture,
    route,
    componentType,
    pfdCheckPassed,
    architectureCheckPassed,
    overallPassed,
    recommendations,
    hft,
    sff,
  };
}

export function getPfdBand(sil: number): { min: number; max: number } {
  const bands: Record<number, { min: number; max: number }> = {
    0: { min: 1e-1, max: Infinity },
    1: { min: 1e-2, max: 1e-1 },
    2: { min: 1e-3, max: 1e-2 },
    3: { min: 1e-4, max: 1e-3 },
    4: { min: 1e-5, max: 1e-4 },
  };
  return bands[sil] || { min: 0, max: 0 };
}

export function getSilFromPfd(pfd: number): number {
  if (pfd >= 1e-1) return 0;
  if (pfd >= 1e-2) return 1;
  if (pfd >= 1e-3) return 2;
  if (pfd >= 1e-4) return 3;
  return 4;
}

export function getArchitecturalSil(
  sff: number,
  hft: number,
  componentType: ComponentType
): number {
  if (componentType === 'A') {
    return getArchitecturalSilTypeA(sff, hft);
  } else {
    return getArchitecturalSilTypeB(sff, hft);
  }
}

// IEC 61508 Table 2 - Type A components (low demand)
function getArchitecturalSilTypeA(sff: number, hft: number): number {
  if (hft === 0) {
    if (sff < 60) return 1;
    if (sff >= 60 && sff < 90) return 2;
    if (sff >= 90 && sff < 99) return 3;
    if (sff >= 99) return 3;
  } else if (hft === 1) {
    if (sff < 60) return 2;
    if (sff >= 60 && sff < 90) return 3;
    if (sff >= 90 && sff < 99) return 4;
    if (sff >= 99) return 4;
  } else if (hft >= 2) {
    if (sff < 60) return 3;
    if (sff >= 60 && sff < 90) return 4;
    if (sff >= 90 && sff < 99) return 4;
    if (sff >= 99) return 4;
  }
  return 0;
}

// IEC 61508 Table 3 - Type B components (low demand)
function getArchitecturalSilTypeB(sff: number, hft: number): number {
  if (hft === 0) {
    if (sff < 60) return 0; // Not allowed
    if (sff >= 60 && sff < 90) return 1;
    if (sff >= 90 && sff < 99) return 2;
    if (sff >= 99) return 3;
  } else if (hft === 1) {
    if (sff < 60) return 1;
    if (sff >= 60 && sff < 90) return 2;
    if (sff >= 90 && sff < 99) return 3;
    if (sff >= 99) return 4;
  } else if (hft >= 2) {
    if (sff < 60) return 2;
    if (sff >= 60 && sff < 90) return 3;
    if (sff >= 90 && sff < 99) return 4;
    if (sff >= 99) return 4;
  }
  return 0;
}

export function generateRecommendations(
  verification: VerificationResult
): string[] {
  const recommendations: string[] = [];

  if (!verification.overallPassed) {
    if (!verification.pfdCheckPassed) {
      if (verification.silFromPfd < verification.silTarget - 1) {
        recommendations.push(
          'PFDavg significantly below target - major redesign required',
          'Consider: MooN voting with N≥3, or additional protection layers'
        );
      } else {
        recommendations.push(
          'PFDavg slightly below target - small improvements needed',
          'Consider: reduce proof test interval by 30-50%, or improve diagnostics'
        );
      }
    }
    if (!verification.architectureCheckPassed) {
      if (verification.hft === 0) {
        recommendations.push(
          'Hardware fault tolerance is 0 - redundancy required',
          'Consider: 1oo2 or 2oo3 voting architecture'
        );
      } else if (verification.sff < 60) {
        recommendations.push(
          'Safe failure fraction is low - improve diagnostics',
          'Consider: add automatic diagnostic tests to detect dangerous failures'
        );
      } else if (verification.sff < 90 && verification.hft === 1) {
        recommendations.push(
          'Safe failure fraction moderate for SIL 2/3',
          'Consider: improve diagnostics to achieve SFF ≥ 90%'
        );
      }
    }
  }

  return recommendations;
}