// Risk Graph Decision Tree (IEC 61511-3 Annex A, Figure A.2)
// C: Consequence, F: Frequency/Exposure, P: Avoidance, W: Demand Rate

export interface RiskGraphInput {
  consequence: 'C1' | 'C2' | 'C3' | 'C4';
  frequency: 'F1' | 'F2' | 'F3';
  avoidance: 'P1' | 'P2';
  demandRate: 'W1' | 'W2' | 'W3';
  mode: 'A' | 'B';
}

export type RiskGraphOutput =
  | { silTarget: 1 | 2 | 3 | 4; description: string; riskPath: string }
  | { silTarget: 'none'; description: string; riskPath: string }
  | { silTarget: 'intolerable'; description: string; riskPath: string };

function getRiskGraphPath(consequence: string, frequency: string, avoidance: string, demandRate: string): string {
  return `${consequence}-${frequency}-${avoidance}-${demandRate}`;
}

export function calculateRiskGraph(input: RiskGraphInput): RiskGraphOutput {
  const { consequence, frequency, avoidance, demandRate, mode } = input;

  // Mode A: only F1/F2 (collapse F3 to F2)
  const effFrequency = mode === 'A' && frequency === 'F3' ? 'F2' : frequency;

  const riskPath = getRiskGraphPath(consequence, effFrequency, avoidance, demandRate);

  // C1 always → no SIL required
  if (consequence === 'C1') {
    return {
      silTarget: 'none',
      description: 'No SIL required - Minor consequence',
      riskPath,
    };
  }

  // C2 path
  if (consequence === 'C2') {
    if (effFrequency === 'F1') {
      if (avoidance === 'P1') {
        if (demandRate === 'W1') {
          return { silTarget: 'none', description: 'No SIL required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 1, description: 'SIL 1 required', riskPath };
        } else {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        }
      } else {
        // P2
        if (demandRate === 'W1') {
          return { silTarget: 1, description: 'SIL 1 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        }
      }
    } else if (effFrequency === 'F2') {
      if (avoidance === 'P1') {
        if (demandRate === 'W1') {
          return { silTarget: 1, description: 'SIL 1 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        }
      } else {
        // P2
        if (demandRate === 'W1') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        }
      }
    }
  }

  // C3 path
  if (consequence === 'C3') {
    if (effFrequency === 'F1') {
      if (avoidance === 'P1') {
        if (demandRate === 'W1') {
          return { silTarget: 1, description: 'SIL 1 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        }
      } else {
        // P2
        if (demandRate === 'W1') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        }
      }
    } else if (effFrequency === 'F2') {
      if (avoidance === 'P1') {
        if (demandRate === 'W1') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        }
      } else {
        // P2
        if (demandRate === 'W1') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        } else {
          return { silTarget: 'intolerable', description: 'Risk intolerable even with SIL 4 - redesign required', riskPath };
        }
      }
    }
  }

  // C4 path
  if (consequence === 'C4') {
    if (effFrequency === 'F1') {
      if (avoidance === 'P1') {
        if (demandRate === 'W1') {
          return { silTarget: 2, description: 'SIL 2 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        }
      } else {
        // P2
        if (demandRate === 'W1') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        } else {
          return { silTarget: 'intolerable', description: 'Risk intolerable even with SIL 4 - redesign required', riskPath };
        }
      }
    } else if (effFrequency === 'F2') {
      if (avoidance === 'P1') {
        if (demandRate === 'W1') {
          return { silTarget: 3, description: 'SIL 3 required', riskPath };
        } else if (demandRate === 'W2') {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        } else {
          return { silTarget: 'intolerable', description: 'Risk intolerable even with SIL 4 - redesign required', riskPath };
        }
      } else {
        // P2
        if (demandRate === 'W1') {
          return { silTarget: 4, description: 'SIL 4 required', riskPath };
        } else {
          return { silTarget: 'intolerable', description: 'Risk intolerable even with SIL 4 - redesign required', riskPath };
        }
      }
    }
  }

  // Fallback (shouldn't reach here with valid input)
  return {
    silTarget: 'none',
    description: 'Invalid input combination',
    riskPath,
  };
}

export function getConsequenceLabel(level: 'C1' | 'C2' | 'C3' | 'C4'): string {
  const labels: Record<string, string> = {
    C1: 'Minor - Minor injury',
    C2: 'Serious - Serious injury (0.01-0.1 fatality)',
    C3: 'Extensive - 1-10 fatalities',
    C4: 'Catastrophic - >10 fatalities',
  };
  return labels[level] || level;
}

export function getFrequencyLabel(level: 'F1' | 'F2' | 'F3'): string {
  const labels: Record<string, string> = {
    F1: 'Rare - <10% time in hazardous zone',
    F2: 'Frequent - 10-100% time in hazardous zone',
    F3: 'Continuous - Routine operation in hazardous zone',
  };
  return labels[level] || level;
}

export function getAvoidanceLabel(level: 'P1' | 'P2'): string {
  const labels: Record<string, string> = {
    P1: 'Possible - Operator can avoid (>1hr or warning)',
    P2: 'Not possible - Too fast or remote operation',
  };
  return labels[level] || level;
}

export function getDemandRateLabel(level: 'W1' | 'W2' | 'W3'): string {
  const labels: Record<string, string> = {
    W1: 'Very low - <0.1/year',
    W2: 'Low - 0.1-1/year',
    W3: 'High - >1/year',
  };
  return labels[level] || level;
}