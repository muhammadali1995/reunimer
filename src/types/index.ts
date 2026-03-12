// Page / Layout
export interface PageProps {
  title?: string;
  description?: string;
  ogImage?: string;
}

// Button
export type ButtonVariant = 'outline-dark' | 'outline-light' | 'primary' | 'pill-primary' | 'pill-light';

export interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  type?: 'button' | 'submit';
  class?: string;
  hideArrow?: boolean;
}

// SectionHeading
export type HeadingAlign = 'left' | 'center';

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: HeadingAlign;
  light?: boolean;
  class?: string;
}

// ExpertiseCard
export type ExpertiseColor = 'terre-laterite' | 'lagon-mayotte' | 'sable-corail' | 'nuit-australe' | 'ecume-poudree';

export interface ExpertiseCardProps {
  title: string;
  description: string;
  href: string;
  image?: ImageMetadata;
  imageAlt?: string;
  color?: ExpertiseColor;
  class?: string;
}

// EngagementSection
export interface EngagementSectionProps {
  title: string;
  bodyText: string;
  imageSrc: ImageMetadata;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  bgColor?: 'white' | 'gris-clair';
  id?: string;
  buttonHref?: string;
  class?: string;
}

// Shared UI types
export type TagColor = 'bleu-abysse' | 'turquoise-ocean' | 'sable-corail';
export type ArticleLayout = 'vertical' | 'horizontal';
export type ArticleSize = 'sm' | 'lg';
