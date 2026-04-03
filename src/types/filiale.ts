import type { ImageMetadata } from 'astro';

export interface FilialeCta {
  label: string;
  href: string;
}

export interface FilialeHeroData {
  title: string;
  logo: ImageMetadata;
  backgroundImage: ImageMetadata;
}

export interface FilialePresentationData {
  title: string;
  subtitle: string;
  body: string[];
}

export interface FilialeHistoryData {
  title: string;
  body: string[];
}

export interface FilialeStatItem {
  value: string;
  description: string;
}

export interface FilialeKeyFiguresData {
  title: string;
  stats: FilialeStatItem[];
}

export interface FilialeProductionGroup {
  title: string;
  subtitle?: string;
  image: ImageMetadata;
  stats: FilialeStatItem[];
}

export interface FilialeProductionData {
  groups: FilialeProductionGroup[];
}

export interface FilialeProductItem {
  name: string;
  image: ImageMetadata;
}

export interface FilialeProductsData {
  title: string;
  products: FilialeProductItem[];
  cta?: FilialeCta;
}

export interface FilialeContactData {
  title: string;
  phone: string;
  address: string;
}
