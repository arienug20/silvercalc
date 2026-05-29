import Dexie, { Table } from 'dexie';

// ====== Tables ======

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived';
  tags: string[];
  plantName?: string;
  unitName?: string;
  equipmentTag?: string;
  scenarioDescription?: string;
  preparedBy?: string;
  reviewedBy?: string;
  approvedBy?: string;
}

export interface RiskGraphScenario {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  consequence: 'C1' | 'C2' | 'C3' | 'C4';
  consequenceDescription?: string;
  frequency: 'F1' | 'F2' | 'F3';
  frequencyMode: 'A' | 'B';
  avoidance: 'P1' | 'P2';
  avoidanceDescription?: string;
  demandRate: 'W1' | 'W2' | 'W3';
  demandRateValue?: number;
  silTarget: number;
  riskGraphPath: string;
  notes?: string;
}

export interface LopaScenario {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  initiatingEventId?: string;
  initiatingEventName: string;
  initiatingEventFrequency: number;
  initiatingEventNotes?: string;
  tolerableFrequency: number;
  consequenceSeverity: 'minor' | 'serious' | 'extensive' | 'catastrophic';
  consequenceDescription?: string;
  mitigatedFrequency: number;
  requiredPfd: number;
  silTarget: number;
  iplCount: number;
  notes?: string;
}

export interface LopaIpl {
  id: string;
  scenarioId: string;
  order: number;
  iplId?: string;
  name: string;
  category: 'active' | 'passive' | 'inherent';
  pfd: number;
  credit: number;
  isSif: boolean;
  silClaimed?: number;
  independenceNotes?: string;
  isIndependent: boolean;
}

export interface PfdScenario {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  architecture: '1oo1' | '1oo2' | '2oo2' | '1oo3' | '2oo3' | '2oo4' | 'MooN';
  m?: number;
  n?: number;
  lambdaDU: number;
  lambdaDD: number;
  lambdaSU: number;
  lambdaSD: number;
  betaFactor: number;
  proofTestInterval: number;
  mttr: number;
  missionTime: number;
  diagnosticCoverage?: number;
  componentType: 'A' | 'B';
  pfdAvg: number;
  sff: number;
  hft: number;
  lambdaD: number;
  lambdaS: number;
  silAchieved: number;
  silArchitectural: number;
  notes?: string;
}

export interface SilVerification {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  riskGraphScenarioId?: string;
  lopaScenarioId?: string;
  pfdScenarioId: string;
  silTarget: number;
  pfdTargetMin: number;
  pfdTargetMax: number;
  pfdAchieved: number;
  silFromPfd: number;
  silFromArchitecture: number;
  route: '1H' | '2H';
  pfdCheckPassed: boolean;
  architectureCheckPassed: boolean;
  overallPassed: boolean;
  recommendations: string[];
  notes?: string;
}

export interface InitiatingEvent {
  id: string;
  name: string;
  category: string;
  frequency: number;
  lowerBound?: number;
  upperBound?: number;
  source: string;
  isCustom: boolean;
  projectId?: string;
}

export interface IplLibrary {
  id: string;
  name: string;
  category: 'active' | 'passive' | 'inherent';
  pfd: number;
  credit: number;
  source: string;
  isCustom: boolean;
  projectId?: string;
}

export interface Report {
  id: string;
  projectId: string;
  name: string;
  createdAt: Date;
  config: {
    includeSections: Record<string, boolean>;
    draft: boolean;
    includeLogo: boolean;
  };
  revisionNumber: number;
  revisionDescription?: string;
  author?: string;
  pdfBlobId?: string;
}

export interface CompanySettings {
  id: string;
  companyName: string;
  logoBlob?: Blob;
  address?: string;
  defaultTolerableFrequency: number;
  defaultRoute: '1H' | '2H';
  defaultMissionTime: number;
  preferences: {
    language: 'en' | 'id';
    units: 'si' | 'imperial';
    theme: 'light' | 'dark' | 'system';
    numberFormat: 'dot' | 'comma';
    autoSave: boolean;
    autoSaveInterval: number;
  };
}

export interface ProjectVersion {
  id: string;
  projectId: string;
  versionNumber: number;
  createdAt: Date;
  snapshot: {
    riskGraphScenarios: RiskGraphScenario[];
    lopaScenarios: LopaScenario[];
    lopaIpls: Record<string, LopaIpl[]>;
    pfdScenarios: PfdScenario[];
    verifications: SilVerification[];
  };
  changeDescription?: string;
}

// ====== Dexie Database ======

class SilvercalcDB extends Dexie {
  projects!: Table<Project>;
  riskGraphScenarios!: Table<RiskGraphScenario>;
  lopaScenarios!: Table<LopaScenario>;
  lopaIpls!: Table<LopaIpl>;
  pfdScenarios!: Table<PfdScenario>;
  silVerifications!: Table<SilVerification>;
  initiatingEvents!: Table<InitiatingEvent>;
  iplLibrary!: Table<IplLibrary>;
  reports!: Table<Report>;
  companySettings!: Table<CompanySettings>;
  projectVersions!: Table<ProjectVersion>;

  constructor() {
    super('silvercalc');

    this.version(1).stores({
      projects: 'id, name, createdAt, updatedAt, status, *tags',
      riskGraphScenarios: 'id, projectId, name, version, silTarget, createdAt',
      lopaScenarios: 'id, projectId, name, version, silTarget, createdAt',
      lopaIpls: 'id, scenarioId, order, category',
      pfdScenarios: 'id, projectId, name, version, architecture, silAchieved, createdAt',
      silVerifications: 'id, projectId, name, pfdScenarioId, overallPassed, createdAt',
      initiatingEvents: 'id, category, isCustom, projectId',
      iplLibrary: 'id, category, isCustom, projectId',
      reports: 'id, projectId, createdAt, revisionNumber',
      companySettings: 'id',
      projectVersions: 'id, projectId, versionNumber, createdAt',
    });
  }
}

export const db = new SilvercalcDB();