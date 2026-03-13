import type { FilialeLogoItem, HomeExpertiseCard } from '../types/home';

// Filiale logos for carousel
import logoMsf from '../assets/logos/logo-msf.svg';
import logoPhf from '../assets/logos/logo-phf.svg';
import logoLdTrading from '../assets/logos/logo-ld-trading.svg';
import logoPecheurCreole from '../assets/logos/logo-pecheur-creole.svg';
import logoReunionPecheAustrale from '../assets/logos/logo-reunion-peche-australe.svg';

// Expertise card images
import expertisePeche from '../assets/images/home/expertise-peche.png';
import expertiseProduction from '../assets/images/home/expertise-production.png';
import expertiseDistribution from '../assets/images/home/expertise-distribution.png';
import expertiseSupports from '../assets/images/home/expertise-supports.png';
import expertiseRh from '../assets/images/home/expertise-rh.png';

export const filialeLogos: FilialeLogoItem[] = [
  { src: logoMsf, alt: 'Madagascar SeaFood', width: 110, height: 64 },
  { src: logoPhf, alt: 'PHF', width: 124, height: 52 },
  { src: logoLdTrading, alt: 'LD Trading', width: 113, height: 73 },
  { src: logoPecheurCreole, alt: 'Le Pêcheur Créole', width: 128, height: 98 },
  { src: logoReunionPecheAustrale, alt: 'Réunion Pêche Australe', width: 123, height: 87 },
];

export const homeExpertiseCards: HomeExpertiseCard[] = [
  {
    title: 'Pêche',
    description: "Une force maritime responsable pour l'excellence à la source.",
    image: expertisePeche,
    color: 'bg-terre-laterite',
    href: '/expertises',
  },
  {
    title: 'Production',
    description: 'Valoriser chaque ressource sans compromis.',
    image: expertiseProduction,
    color: 'bg-lagon-mayotte',
    href: '/expertises',
  },
  {
    title: 'Distribution',
    description: 'Un engagement de proximité et de performance.',
    image: expertiseDistribution,
    color: 'bg-sable-corail',
    href: '/expertises',
  },
  {
    title: 'Supports',
    description: "La force invisible au service de l'excellence.",
    image: expertiseSupports,
    color: 'bg-nuit-australe',
    href: '/expertises',
  },
  {
    title: 'RH',
    description: "Un engagement humain porteur d'avenir",
    image: expertiseRh,
    color: 'bg-ecume-poudree',
    href: '/expertises',
  },
];
