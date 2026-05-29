import { db } from './schema';

export const initiatingEvents = [
  { id: 'ie-001', name: 'Pressure vessel rupture (design life)', category: 'Equipment', frequency: 1e-5, source: 'IEC 61511', isCustom: false },
  { id: 'ie-002', name: 'Pipeline leak (full bore)', category: 'Piping', frequency: 1e-4, source: 'CCPS', isCustom: false },
  { id: 'ie-003', name: 'Pipeline leak (small, <10mm)', category: 'Piping', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-004', name: 'Pump seal failure', category: 'Rotating', frequency: 1e-1, source: 'CCPS', isCustom: false },
  { id: 'ie-005', name: 'Compressor surge', category: 'Rotating', frequency: 1e-1, source: 'Vendor', isCustom: false },
  { id: 'ie-006', name: 'Control loop failure (single)', category: 'Instrumentation', frequency: 1e-1, source: 'IEC 61511', isCustom: false },
  { id: 'ie-007', name: 'BPCS loop failure (redundant)', category: 'Instrumentation', frequency: 1e-2, source: 'IEC 61511', isCustom: false },
  { id: 'ie-008', name: 'Loss of instrument air', category: 'Utility', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-009', name: 'Loss of power (normal)', category: 'Utility', frequency: 1e-1, source: 'IEEE', isCustom: false },
  { id: 'ie-010', name: 'Loss of power (with UPS)', category: 'Utility', frequency: 1e-3, source: 'IEEE', isCustom: false },
  { id: 'ie-011', name: 'Loss of cooling water', category: 'Utility', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-012', name: 'Loss of steam', category: 'Utility', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-013', name: 'Human error (routine task, no stress)', category: 'Human', frequency: 1e-2, source: 'Swain', isCustom: false },
  { id: 'ie-014', name: 'Human error (routine task, stress)', category: 'Human', frequency: 1e-1, source: 'Swain', isCustom: false },
  { id: 'ie-015', name: 'Human error (non-routine, high stress)', category: 'Human', frequency: 1e-0, source: 'Swain', isCustom: false },
  { id: 'ie-016', name: 'Pressure regulator failure', category: 'Equipment', frequency: 5e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-017', name: 'Relief valve stuck closed', category: 'Equipment', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-018', name: 'Check valve failure', category: 'Equipment', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-019', name: 'Manual valve left in wrong position', category: 'Human', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-020', name: 'Mis-operation during startup', category: 'Human', frequency: 5e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-021', name: 'Mis-operation during maintenance', category: 'Human', frequency: 5e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-022', name: 'External fire (pool)', category: 'External', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-023', name: 'External fire (jet)', category: 'External', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-024', name: 'Lightning strike', category: 'Natural', frequency: 1e-3, source: 'IEEE', isCustom: false },
  { id: 'ie-025', name: 'Earthquake (seismic zone)', category: 'Natural', frequency: 1e-4, source: 'ASCE', isCustom: false },
  { id: 'ie-026', name: 'Flood', category: 'Natural', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-027', name: 'Reactor runaway (exothermic)', category: 'Process', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-028', name: 'Overfilling (tank/vessel)', category: 'Process', frequency: 1e-1, source: 'CCPS', isCustom: false },
  { id: 'ie-029', name: 'Blocked outlet / outlet valve closed', category: 'Process', frequency: 1e-1, source: 'CCPS', isCustom: false },
  { id: 'ie-030', name: 'Loss of reaction (inhibition)', category: 'Process', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-031', name: 'Contamination / wrong feed', category: 'Process', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-032', name: 'Temperature excursion (furnace)', category: 'Process', frequency: 1e-1, source: 'CCPS', isCustom: false },
  { id: 'ie-033', name: 'Heat exchanger tube rupture', category: 'Equipment', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-034', name: 'Gasket/blind flange leak', category: 'Equipment', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-035', name: 'Tank failure (atmospheric)', category: 'Equipment', frequency: 1e-4, source: 'CCPS', isCustom: false },
  { id: 'ie-036', name: 'Hose failure (loading/unloading)', category: 'Equipment', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-037', name: 'Software error (BPCS)', category: 'Instrumentation', frequency: 1e-3, source: 'IEC 61511', isCustom: false },
  { id: 'ie-038', name: 'Sensor drift (undetected)', category: 'Instrumentation', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-039', name: 'Valve actuator failure', category: 'Instrumentation', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-040', name: 'PLC failure (single)', category: 'Instrumentation', frequency: 5e-2, source: 'Vendor', isCustom: false },
  { id: 'ie-041', name: 'Boiler explosion', category: 'Equipment', frequency: 1e-5, source: 'CCPS', isCustom: false },
  { id: 'ie-042', name: 'Catalyst deactivation (sudden)', category: 'Process', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-043', name: 'Column tray damage', category: 'Equipment', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-044', name: 'Seal pot / liquid seal failure', category: 'Equipment', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-045', name: 'Flare/vent system failure', category: 'Equipment', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-046', name: 'Utility cross-contamination', category: 'Utility', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-047', name: 'Static discharge ignition', category: 'Process', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-048', name: 'Corrosion-induced failure (accelerated)', category: 'Equipment', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-049', name: 'Vibration-induced fatigue failure', category: 'Equipment', frequency: 1e-4, source: 'CCPS', isCustom: false },
  { id: 'ie-050', name: 'Ice/hydrate plugging', category: 'Process', frequency: 1e-3, source: 'CCPS', isCustom: false },
  { id: 'ie-051', name: 'Reverse flow (check valve failure)', category: 'Equipment', frequency: 1e-2, source: 'CCPS', isCustom: false },
  { id: 'ie-052', name: 'Thermal expansion overpressure', category: 'Process', frequency: 1e-1, source: 'CCPS', isCustom: false },
];

export const iplLibrary = [
  { id: 'ipl-001', name: 'SIF/SIS (SIL 1)', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-002', name: 'SIF/SIS (SIL 2)', category: 'active' as const, pfd: 1e-2, credit: 2, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-003', name: 'SIF/SIS (SIL 3)', category: 'active' as const, pfd: 1e-3, credit: 3, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-004', name: 'SIF/SIS (SIL 4)', category: 'active' as const, pfd: 1e-4, credit: 4, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-005', name: 'Relief valve (spring-loaded)', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-006', name: 'Rupture disc', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-007', name: 'Burst disc + relief valve combo', category: 'passive' as const, pfd: 1e-3, credit: 3, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-008', name: 'BPCS loop (basic process control)', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-009', name: 'Alarm + operator response (60s+)', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-010', name: 'Alarm + operator response (20min+)', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-011', name: 'Safety valve + operator response', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-012', name: 'Dike / bund', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-013', name: 'Blast wall / bunker', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-014', name: 'Fireproof insulation', category: 'passive' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-015', name: 'Open vent (no valve)', category: 'passive' as const, pfd: 1e-3, credit: 3, source: 'CCPS', isCustom: false },
  { id: 'ipl-016', name: 'Orifice restriction', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-017', name: 'Inherently safer design (substitution)', category: 'inherent' as const, pfd: 0, credit: 0, source: 'CCPS', isCustom: false },
  { id: 'ipl-018', name: 'Manual valve (well-documented procedure)', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-019', name: 'Emergency shutdown valve (ESDV)', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-020', name: 'Blowdown/vent system', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-021', name: 'Emergency depressurization', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-022', name: 'Fire & gas detection + deluge', category: 'active' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-023', name: 'Gas detection + isolation', category: 'active' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-024', name: 'Hydrostatic test (pre-commission)', category: 'passive' as const, pfd: 1e-3, credit: 3, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-025', name: 'Pressure test (periodic)', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-026', name: 'Visual inspection (routine)', category: 'passive' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-027', name: 'NDT/inspection program', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'IEC 61508', isCustom: false },
  { id: 'ipl-028', name: 'Min flow bypass line', category: 'passive' as const, pfd: 1e-1, credit: 1, source: 'CCPS', isCustom: false },
  { id: 'ipl-029', name: 'Restrictive orifice (permanent)', category: 'passive' as const, pfd: 1e-3, credit: 3, source: 'CCPS', isCustom: false },
  { id: 'ipl-030', name: 'Excess flow valve', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-031', name: 'Secondary containment', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
  { id: 'ipl-032', name: 'Grounding/bonding system', category: 'passive' as const, pfd: 1e-2, credit: 2, source: 'CCPS', isCustom: false },
];

export async function seedDatabase(): Promise<void> {
  await db.open();

  const hasInitiatingEvents = await db.initiatingEvents.count();
  if (hasInitiatingEvents === 0) {
    await db.initiatingEvents.bulkAdd(initiatingEvents);
  }

  const hasIplLibrary = await db.iplLibrary.count();
  if (hasIplLibrary === 0) {
    await db.iplLibrary.bulkAdd(iplLibrary);
  }

  const hasSettings = await db.companySettings.count();
  if (hasSettings === 0) {
    await db.companySettings.add({
      id: 'default',
      companyName: '',
      address: '',
      defaultTolerableFrequency: 1e-5,
      defaultRoute: '1H',
      defaultMissionTime: 20,
      preferences: {
        language: 'en',
        units: 'si',
        theme: 'light',
        numberFormat: 'dot',
        autoSave: true,
        autoSaveInterval: 60,
      },
    });
  }
}