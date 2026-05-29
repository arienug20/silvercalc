export interface LopaIpl {
  id: string;
  name: string;
  category: 'active' | 'passive' | 'inherent';
  pfd: number;
  credit: number;
  isSif: boolean;
  silClaimed?: number;
  independenceNotes?: string;
  isIndependent: boolean;
}

export interface LopaResult {
  initiatingEventFrequency: number;
  tolerableFrequency: number;
  mitigatedFrequency: number;
  requiredPfd: number;
  silTarget: number;
  ipls: LopaIpl[];
  overallPfd: number;
  totalCredit: number;
}

export function calculateLopa(
  initiatingEventFrequency: number,
  tolerableFrequency: number,
  ipls: LopaIpl[]
): LopaResult {
  // Calculate mitigated frequency: f_init × ∏(PFD_ipl)
  let mitigatedFrequency = initiatingEventFrequency;
  let totalPfd = 1;

  for (const ipl of ipls) {
    if (ipl.isIndependent) {
      mitigatedFrequency *= ipl.pfd;
      totalPfd *= ipl.pfd;
    }
  }

  // Calculate required PFD if mitigation is insufficient
  let requiredPfd = 1;
  if (mitigatedFrequency > tolerableFrequency) {
    requiredPfd = tolerableFrequency / mitigatedFrequency;
  }

  // Determine SIL target based on required PFD
  const silTarget = determineSilFromPfd(requiredPfd);

  // Calculate total credit (-log10(PFD))
  const totalCredit = ipls.reduce((sum, ipl) => sum + ipl.credit, 0);

  return {
    initiatingEventFrequency,
    tolerableFrequency,
    mitigatedFrequency,
    requiredPfd,
    silTarget,
    ipls,
    overallPfd: totalPfd,
    totalCredit,
  };
}

export function determineSilFromPfd(pfd: number): number {
  if (pfd < 1e-5) return 4; // SIL 4+
  if (pfd >= 1e-1) return 0;  // No SIL
  if (pfd >= 1e-2) return 1;  // SIL 1
  if (pfd >= 1e-3) return 2;  // SIL 2
  if (pfd >= 1e-4) return 3;  // SIL 3
  return 4;                   // SIL 4
}

export function getPfdForSil(sil: number): { min: number; max: number } {
  const bands: Record<number, { min: number; max: number }> = {
    1: { min: 1e-2, max: 1e-1 },
    2: { min: 1e-3, max: 1e-2 },
    3: { min: 1e-4, max: 1e-3 },
    4: { min: 1e-5, max: 1e-4 },
  };
  return bands[sil] || { min: 0, max: 0 };
}

export function calculateCredit(pfd: number): number {
  return -Math.log10(pfd);
}

export function sensitivityAnalysis(
  initiatingEventFrequency: number,
  tolerableFrequency: number,
  ipls: LopaIpl[]
): { index: number; silWithout: number; frequencyWithout: number }[] {
  const results: { index: number; silWithout: number; frequencyWithout: number }[] = [];

  for (let i = 0; i < ipls.length; i++) {
    const iplsWithout = ipls.filter((_, idx) => idx !== i);
    const result = calculateLopa(initiatingEventFrequency, tolerableFrequency, iplsWithout);
    results.push({
      index: i,
      silWithout: result.silTarget,
      frequencyWithout: result.mitigatedFrequency,
    });
  }

  return results;
}