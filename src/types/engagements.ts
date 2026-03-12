export interface EngagementStat {
  value: string;
  label: string;
}

export interface EngagementPartner {
  logo: ImageMetadata;
  alt: string;
  description?: string;
}

export interface EngagementSectionData {
  title: string;
  bodyText: string;
  image: ImageMetadata;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  bgColor?: 'white' | 'gris-clair';
  id: string;
  showButton?: boolean;
  partner?: EngagementPartner;
}

export interface EngagementSplitSectionData {
  id: string;
  title: string;
  image: ImageMetadata;
  imageAlt: string;
}

export interface EngagementSeoData {
  title: string;
  description: string;
}

export interface EngagementHeroData {
  image: ImageMetadata;
  imageAlt: string;
  title: string;
  description: string;
}

export interface EngagementIntroLabels {
  left: string;
  right: string;
}

export interface EngagementIntroReportData {
  image: ImageMetadata;
  imageAlt: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface EngagementEnergyData extends EngagementSplitSectionData {
  paragraphs: [string, string];
}

export interface EngagementHealthData extends EngagementSplitSectionData {
  paragraphs: [string, string];
}

export interface EngagementHumanData extends EngagementSplitSectionData {
  logo: ImageMetadata;
  logoAlt: string;
  description: string;
  statsTitle: string;
  stats: EngagementStat[];
}

export interface EngagementSocialData extends EngagementSplitSectionData {
  subtitle: string;
  bodyText: string;
  logo: ImageMetadata;
  logoAlt: string;
  statsTitle: string;
  stats: EngagementStat[];
}

export interface EngagementFilierePartner {
  logo: ImageMetadata;
  alt: string;
}

export interface EngagementFilieresData {
  id: string;
  title: string;
  paragraphs: [string, string];
  partners: [EngagementFilierePartner, EngagementFilierePartner];
  medal: ImageMetadata;
  medalAlt: string;
  medalDescription: string;
}
