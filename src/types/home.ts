import type { ImageMetadata } from 'astro';

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
