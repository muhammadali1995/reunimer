import type {
  FilialeLogoItem,
  HomeExpertiseCard,
  HomeGroupeSectionData,
  HomeMediaTextSection,
  HomeSectionHeader,
} from '../types/home';

// Filiale logos for carousel
import logoMsf from '../assets/logos/logo-msf.svg';
import logoPhf from '../assets/logos/logo-phf.svg';
import logoLdTrading from '../assets/logos/logo-ld-trading.svg';
import logoPecheurCreole from '../assets/logos/logo-pecheur-creole.svg';
import logoReunionPecheAustrale from '../assets/logos/logo-reunion-peche-australe.svg';

// Expertise card images
import groupeImage1 from '../assets/images/home/home-groupe-1.png';
import groupeImage2 from '../assets/images/home/home-groupe-2.png';
import groupeImage3 from '../assets/images/home/home-groupe-3.png';
import expertisePeche from '../assets/images/home/expertise-peche.png';
import expertiseProduction from '../assets/images/home/expertise-production.png';
import expertiseDistribution from '../assets/images/home/expertise-distribution.png';
import expertiseSupports from '../assets/images/home/expertise-supports.png';
import expertiseRh from '../assets/images/home/expertise-rh.png';
import rseSilhouette from '../assets/images/home/home-rse-silhouette.png';
import homeCarriere from '../assets/images/home/home-carriere.png';

export const filialeLogos: FilialeLogoItem[] = [
  { src: logoMsf, alt: 'Madagascar SeaFood', width: 110, height: 64 },
  { src: logoPhf, alt: 'PHF', width: 124, height: 52 },
  { src: logoLdTrading, alt: 'LD Trading', width: 113, height: 73 },
  { src: logoPecheurCreole, alt: 'Le Pêcheur Créole', width: 128, height: 98 },
  { src: logoReunionPecheAustrale, alt: 'Réunion Pêche Australe', width: 123, height: 87 },
];

export const homeGroupeSection: HomeGroupeSectionData = {
  title: "Les trésors d'aujourd'hui, l'héritage de demain.",
  body: "Chez Reunimer, nous croyons que la performance durable naît de l'équilibre entre le respect de la nature...",
  cta: {
    label: 'Découvrez notre groupe',
    href: '/groupe',
  },
  images: [
    {
      src: groupeImage1,
      alt: 'Bateau de pêche Reunimer',
      widths: [280, 400],
      sizes: '(max-width: 1024px) 33vw, 280px',
    },
    {
      src: groupeImage2,
      alt: "Banc de poissons dans l'océan",
      widths: [255, 400],
      sizes: '(max-width: 1024px) 33vw, 260px',
    },
    {
      src: groupeImage3,
      alt: 'Pêcheur Reunimer souriant',
      widths: [270, 400],
      sizes: '(max-width: 1024px) 33vw, 270px',
    },
  ],
};

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

export const homeRseSection: HomeMediaTextSection = {
  title: "Un engagement humain et environnemental porteur d'avenir",
  body: "Chez Reunimer, nous croyons que la performance durable naît de l'équilibre entre le respect de la nature et l'épanouissement des hommes...",
  cta: {
    label: 'Découvrez notre engagement',
    href: '/engagements',
  },
  image: {
    src: rseSilhouette,
    alt: 'Collage en silhouette humaine — équipe Reunimer',
    widths: [400, 600, 900],
    sizes: '(max-width: 1024px) 300px, 494px',
  },
};

export const homeFilialesSection: HomeSectionHeader = {
  title: 'Nos filiales',
  cta: {
    label: 'Découvrez nos filiales',
    href: '/groupe',
  },
};

export const homeActualitesSection: HomeSectionHeader = {
  title: 'Actualités',
  cta: {
    label: 'Découvrez toutes les actus',
    href: '/actualites',
  },
};

export const homeTeamSection: HomeMediaTextSection = {
  title: 'Rejoignez la team Reunimer',
  body: "Chez Reunimer, nous mettons l'humain au centre de la chaîne de valeurs.",
  cta: {
    label: "Découvrez nos offres d'emploi",
    href: '/carrieres',
  },
  image: {
    src: homeCarriere,
    alt: 'Deux collaborateurs Reunimer en tenue professionnelle',
    widths: [400, 643, 900],
    sizes: '(max-width: 1024px) 400px, 643px',
  },
};
