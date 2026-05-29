export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateRiskGraphInput(input: any): ValidationResult {
  const errors: string[] = [];

  const validConsequences = ['C1', 'C2', 'C3', 'C4'];
  const validFrequencies = ['F1', 'F2', 'F3'];
  const validAvoidance = ['P1', 'P2'];
  const validDemandRates = ['W1', 'W2', 'W3'];
  const validModes = ['A', 'B'];

  if (!input.consequence || !validConsequences.includes(input.consequence)) {
    errors.push('Invalid consequence. Must be C1, C2, C3, or C4.');
  }

  if (!input.frequency || !validFrequencies.includes(input.frequency)) {
    errors.push('Invalid frequency. Must be F1, F2, or F3.');
  }

  if (!input.avoidance || !validAvoidance.includes(input.avoidance)) {
    errors.push('Invalid avoidance. Must be P1 or P2.');
  }

  if (!input.demandRate || !validDemandRates.includes(input.demandRate)) {
    errors.push('Invalid demand rate. Must be W1, W2, or W3.');
  }

  if (!input.mode || !validModes.includes(input.mode)) {
    errors.push('Invalid mode. Must be A or B.');
  }

  // Mode A only supports F1/F2
  if (input.mode === 'A' && input.frequency === 'F3') {
    errors.push('Mode A does not support F3 frequency level.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validatePfdInput(input: any): ValidationResult {
  const errors: string[] = [];

  const validArchitectures = ['1oo1', '1oo2', '2oo2', '1oo3', '2oo3', '2oo4', 'MooN'];

  if (!input.architecture || !validArchitectures.includes(input.architecture)) {
    errors.push('Invalid architecture.');
  }

  if (input.architecture === 'MooN') {
    if (!input.m || !input.n) {
      errors.push('M and N must be specified for MooN architecture.');
    }
    if (input.m && input.n && input.m > input.n) {
      errors.push('M cannot be greater than N.');
    }
    if (input.m && input.n && (input.m < 1 || input.n < 1)) {
      errors.push('M and N must be positive integers.');
    }
  }

  if (typeof input.lambdaDU !== 'number' || input.lambdaDU <= 0 || input.lambdaDU > 1e-3) {
    errors.push('λDU must be between 0 and 1e-3 per hour.');
  }

  if (typeof input.lambdaDD !== 'number' || input.lambdaDD < 0 || input.lambdaDD > 1e-3) {
    errors.push('λDD must be between 0 and 1e-3 per hour.');
  }

  if (typeof input.lambdaSU !== 'number' || input.lambdaSU < 0 || input.lambdaSU > 1e-3) {
    errors.push('λSU must be between 0 and 1e-3 per hour.');
  }

  if (typeof input.lambdaSD !== 'number' || input.lambdaSD < 0 || input.lambdaSD > 1e-3) {
    errors.push('λSD must be between 0 and 1e-3 per hour.');
  }

  if (typeof input.betaFactor !== 'number' || input.betaFactor < 0 || input.betaFactor > 1) {
    errors.push('β (beta factor) must be between 0 and 1.');
  }

  if (typeof input.proofTestInterval !== 'number' || input.proofTestInterval < 1) {
    errors.push('Proof test interval must be at least 1 hour.');
  }

  if (typeof input.mttr !== 'number' || input.mttr < 0.1) {
    errors.push('MTTR must be at least 0.1 hours.');
  }

  if (typeof input.missionTime !== 'number' || input.missionTime < 1 || input.missionTime > 50) {
    errors.push('Mission time must be between 1 and 50 years.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateLopaInput(frequency: number, pfd: number): ValidationResult {
  const errors: string[] = [];

  if (typeof frequency !== 'number' || frequency <= 0 || frequency > 1e6) {
    errors.push('Frequency must be positive and reasonable.');
  }

  if (typeof pfd !== 'number' || pfd < 0 || pfd > 1) {
    errors.push('PFD must be between 0 and 1.');
  }

  if (pfd === 0) {
    errors.push('PFD cannot be zero (no protection is perfect).');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateProjectName(name: string): ValidationResult {
  const errors: string[] = [];

  if (!name || name.trim().length === 0) {
    errors.push('Project name cannot be empty.');
  }

  if (name.length > 200) {
    errors.push('Project name cannot exceed 200 characters.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateSff(sff: number): ValidationResult {
  const errors: string[] = [];

  if (typeof sff !== 'number' || sff < 0 || sff > 100) {
    errors.push('Safe Failure Fraction must be between 0 and 100%.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateTolerableFrequency(freq: number): ValidationResult {
  const errors: string[] = [];

  if (typeof freq !== 'number' || freq <= 0 || freq > 1) {
    errors.push('Tolerable frequency must be between 0 and 1 per year.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}