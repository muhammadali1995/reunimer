import type { SitePlanColumn, LegalLink, SocialLink } from '../types/footer';

import socialIcon from '../assets/icons/social-icon.svg';
import linkedinIcon from '../assets/icons/linkedin.svg';

export const sitePlan: SitePlanColumn[] = [
  {
    title: 'Groupe',
    href: null,
    links: [
      { text: 'Un modèle intégré',   href: '/groupe/modele-integre' },
      { text: "Notre raison d'être", href: '/groupe/raison-detre' },
      { text: 'Notre histoire',      href: '/groupe/histoire' },
      { text: 'Nos filiales',        href: '/groupe/filiales' },
      { text: 'Nos implantations',   href: '/groupe/implantations' },
    ],
  },
  {
    title: 'Expertises',
    href: null,
    links: [
      { text: 'Pêche',          href: '/expertises/peche' },
      { text: 'Transformation', href: '/expertises/transformation' },
      { text: 'Distribution',   href: '/expertises/distribution' },
      { text: 'Logistique',     href: '/expertises/logistique' },
      { text: 'RSE & RH',       href: '/expertises/rse-rh' },
    ],
  },
  { title: 'Produits',        href: '/produits',       links: [] },
  {
    title: 'Engagements RSE',
    href: null,
    links: [
      { text: 'Notre lien à la Mer',       href: '/engagements#lien-mer' },
      { text: 'Notre lien à la Terre',     href: '/engagements#lien-terre' },
      { text: "Notre lien à l'Humain",     href: '/engagements#lien-femmes-hommes' },
      { text: "Notre lien à l'Énergie",    href: '/engagements#lien-energie' },
      { text: 'Notre lien à la Santé',     href: '/engagements#lien-sante' },
      { text: 'Notre lien à la Formation', href: '/engagements#lien-formation' },
      { text: 'Notre lien au Social',      href: '/engagements#lien-social' },
      { text: 'Notre lien aux Filières',   href: '/engagements#lien-filieres' },
    ],
  },
  { title: 'Actualités', href: '/actualites', links: [] },
  { title: 'Carrières',  href: '/carrieres',  links: [] },
];

export const legalLinks: LegalLink[] = [
  { text: 'Mentions légales',          href: '#' },
  { text: 'Politique de confidentialité', href: '#' },
  { text: 'Gestion des cookies',       href: '#' },
  { text: 'CGV',                       href: '#' },
];

export const socialLinks: SocialLink[] = [
  { href: '#', label: 'YouTube',  icon: socialIcon },
  { href: '#', label: 'LinkedIn', icon: linkedinIcon },
];
