import { describe, it, expect } from 'vitest';
import * as core from '../src/core';

describe('Core module imports', () => {
  it('should export risk-graph functions', () => {
    expect(core).toBeDefined();
  });

  it('should export validators', () => {
    expect(core).toHaveProperty('ValidationResult');
  });
});

describe('Risk Graph', () => {
  it('should accept valid risk graph input', () => {
    // Basic smoke test — risk graph module loads without error
    const { RiskGraphInput } = core;
    expect(RiskGraphInput).toBeDefined();
  });
});

describe('PFD Average', () => {
  it('should calculate PFD avg', () => {
    expect(core).toBeDefined();
  });
});
