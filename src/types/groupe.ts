// IntegratedModelSection
export interface ExpertiseCard {
  title: string;
  description: string;
  color: string;
  fullWidth?: boolean;
}

// GroupStatisticsSection
export interface GroupStat {
  number: string;
  description: string;
}

// MissionSection
export interface ValueItem {
  title: string;
  text: string;
}

// HistorySection
export interface Milestone {
  year: string;
  description: string;
}

// FilialesSection
export interface Subsidiary {
  name: string;
  label: string;
  logo: string;
}

export interface FilialRegion {
  name: string;
  gridRow: Subsidiary[];
  centeredRow: Subsidiary[];
}

// ImplantationsSection
export interface MapPin {
  name: string;
  desc: string;
  top: string;
  left: string;
}

export interface WorldPin {
  top: string;
  left: string;
  fluxImage?: string;
}

// WorldStatsSection
export interface ContinentStat {
  name: string;
  pct: number;
}

export interface PortfolioItem {
  label: string;
  pct: number;
  color: string;
}
