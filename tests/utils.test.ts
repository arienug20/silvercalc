import { describe, it, expect } from 'vitest';
import * as formatters from '../src/utils/formatters';
import * as constants from '../src/utils/constants';

describe('Utils module imports', () => {
  it('should import formatters', () => {
    expect(formatters).toBeDefined();
  });

  it('should import constants', () => {
    expect(constants).toBeDefined();
  });
});
