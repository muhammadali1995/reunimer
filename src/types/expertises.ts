import type { ImageMetadata } from 'astro';

export interface ExpertiseStatItem {
  value: string;
  label: string;
}

export interface ExpertiseStatGroup {
  location: string;
  items: ExpertiseStatItem[];
}

export interface ExpertiseQuota {
  year: string;
  total: string;
  top: string;
  bottom: string;
  dash: string;
}

export interface ExpertiseHeroTab {
  label: string;
  className: string;
}

export interface DistributionCard {
  title: string;
  description: string;
  image: ImageMetadata;
  alt: string;
  imageClass?: string;
}

export interface BrandRow {
  name: string;
  logo: ImageMetadata;
  logoAlt: string;
  body: string;
}

export interface RhDonut {
  lines: string[];
  leftValue: string;
  rightValue: string;
  centerTop: string;
}
