export interface SitePlanLink {
  text: string;
  href: string;
}

export interface SitePlanColumn {
  title: string;
  href: string | null;
  links: SitePlanLink[];
}

export interface LegalLink {
  text: string;
  href: string;
}

export interface SocialLink {
  href: string;
  label: string;
  icon: ImageMetadata;
}
