import type { ImageMetadata } from 'astro';

export interface HomeCta {
  label: string;
  href: string;
}

export interface FilialeLogoItem {
  src: ImageMetadata;
  alt: string;
  width: number;
  height: number;
}

export interface HomeExpertiseCard {
  title: string;
  description: string;
  image: ImageMetadata;
  color: string;
  href: string;
}

export interface HomeImageItem {
  src: ImageMetadata;
  alt: string;
  widths: number[];
  sizes: string;
}

export interface HomeIntroSection {
  title: string;
  body: string;
  cta: HomeCta;
}

export interface HomeMediaTextSection extends HomeIntroSection {
  image: HomeImageItem;
}

export interface HomeGroupeSectionData extends HomeIntroSection {
  images: HomeImageItem[];
}

export interface HomeSectionHeader {
  title: string;
  cta: HomeCta;
}
