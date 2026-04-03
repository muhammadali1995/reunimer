import type {
  ExpertiseCard,
  GroupStat,
  ValueItem,
  Milestone,
  FilialRegion,
  MapPin,
  WorldPin,
  ContinentStat,
  PortfolioItem,
} from '../types/groupe';

// Logo imports for FilialesSection (raw SVG strings for inline rendering)
import reunimerLogo from '../assets/logos/logo-reunimer-distribution.svg?raw';
import rpaLogo from '../assets/logos/logo-rpa.svg?raw';
import reunipecheLogo from '../assets/logos/logo-reunipeche.svg?raw';
import pecheurLogo from '../assets/logos/logo-pecheur.svg?raw';
import copefritoLogo from '../assets/logos/logo-copefrito.svg?raw';
import oceanFarmerLogo from '../assets/logos/logo-ocean-farmer.svg?raw';
import msfLogo from '../assets/logos/logo-msf.svg?raw';
import phfLogo from '../assets/logos/logo-phf.svg?raw';
import stargelLogo from '../assets/logos/logo-stargel.svg?raw';
import norseaLogo from '../assets/logos/logo-norsea.svg?raw';

export const expertiseCards: ExpertiseCard[] = [
  {
    title: 'Pêche',
    description: 'Une force maritime responsable',
    color: 'bg-terre-laterite',
  },
  {
    title: 'Production',
    description: 'Une transformation experte et innovante',
    color: 'bg-lagon-mayotte',
  },
  {
    title: 'Distribution',
    description: 'Un accès direct et maîtrisé aux marchés',
    color: 'bg-sable-corail',
  },
  {
    title: 'Maintenance & logistique',
    description: "La garantie de l'intégrité opérationnelle",
    color: 'bg-brume-alize',
    fullWidth: true,
  },
  {
    title: 'RSE & RH',
    description: 'Un engagement humain et environnemental durable',
    color: 'bg-ecume-poudree',
    fullWidth: true,
  },
];

export const groupStats: GroupStat[] = [
  { number: '111 M€', description: "de chiffre d'affaires consolidé" },
  { number: '+900', description: 'collaborateurs' },
  { number: '16500 T', description: 'tonnes de produit dont 3200 Algues' },
];

export const missionValues: ValueItem[] = [
  {
    title: 'Audace',
    text: "Nous ne suivons pas les marchés, nous les bâtissons. Là où il n'y a rien, nous créons des filières innovantes au service de nos territoires.",
  },
  {
    title: 'Expertise',
    text: "La culture marine est notre ADN. De la mer à l'usine, nous sommes des passionnés exigeants qui apprennent sans cesse pour maîtriser leur art.",
  },
  {
    title: 'Engagement',
    text: 'Assez de paroles, place aux actes. Nous protégeons activement la ressource halieutique et soutenons les communautés locales.',
  },
  {
    title: 'Éthique',
    text: 'La confiance est notre capital. Transparence et respect sont non-négociables : nous disons ce que nous faisons, et nous faisons ce que nous disons.',
  },
];

export const historyMilestones: Milestone[] = [
  {
    year: '1996',
    description:
      'Création de la société Le Martin Pêcheur, initialement dédié à la pêche, la transformation et la distribution à Ste-Marie (Réunion)',
  },
  {
    year: '1998',
    description:
      "Naissance de l'Armement Enez, lançant une flotte de pêche pélagique en partenariat avec Le Martin Pêcheur.",
  },
  {
    year: '2000',
    description:
      'Création de Pêcherie du Sud, renforçant la présence du groupe dans la filière halieutique réunionnaise.',
  },
  {
    year: '2002',
    description:
      'Création de Réunion Pélagique, consolidant les activités de pêche hauturière du groupe.',
  },
  {
    year: '2004',
    description:
      "Structuration des synergies entre pêche, transformation et distribution afin d'accompagner la montée en puissance du groupe sur ses marchés historiques.",
  },
  {
    year: '2006',
    description:
      "Accélération du développement régional du groupe, avec de nouveaux relais opérationnels venant renforcer son modèle intégré dans l'océan Indien.",
  },
];

export const filialeRegions: FilialRegion[] = [
  {
    name: 'À la Réunion',
    gridRow: [
      { name: 'Reunimer Distribution', label: 'Distribution', logo: reunimerLogo },
      { name: 'Réunion Pêche Australe', label: 'Pêche & distribution', logo: rpaLogo },
      { name: 'Réunipêche', label: 'Pêche & distribution', logo: reunipecheLogo },
    ],
    centeredRow: [
      { name: 'Le Pêcheur Créole', label: 'Point de vente', logo: pecheurLogo },
    ],
  },
  {
    name: 'À Madagascar',
    gridRow: [],
    centeredRow: [
      { name: 'Copefrito', label: 'Pêche traditionnelle & transformation', logo: copefritoLogo },
      { name: 'Ocean Farmers', label: 'Algoculture', logo: oceanFarmerLogo },
    ],
  },
  {
    name: 'En France Métropolitaine',
    gridRow: [
      { name: 'MSF', label: 'Distribution', logo: copefritoLogo },
      { name: 'PHF', label: 'Mareyage & distribution', logo: phfLogo, href: '/filiales/phb' },
      { name: 'Stargel Seafoods', label: 'Distribution', logo: stargelLogo },
    ],
    centeredRow: [
      { name: 'Norsea', label: 'Distribution', logo: norseaLogo },
    ],
  },
];

// ImplantationsSection — Regional map pins
export const reunionPins: MapPin[] = [
  { name: 'Le Port', desc: 'Siège social, armement, transformation, distribution', top: '16%', left: '13%' },
  { name: 'Sainte-Marie', desc: 'Magasin Le Pêcheur Créole', top: '8%', left: '47%' },
];

export const madagascarPins: MapPin[] = [
  { name: 'Majunga', desc: 'Usine de première transformation', top: '27%', left: '52%' },
  { name: 'Île Sainte-Marie', desc: 'Usine de première transformation', top: '41%', left: '90%' },
  { name: 'Tuléar', desc: 'Usine de première transformation', top: '88%', left: '6%' },
  { name: 'Fort Dauphin', desc: 'Usine de première transformation', top: '98%', left: '54%' },
];

export const francePins: MapPin[] = [
  { name: 'Boulogne-sur-Mer', desc: 'Mareyage, transformation, distribution', top: '18%', left: '48%' },
  { name: 'Lorient', desc: 'Distribution', top: '35%', left: '18%' },
];

// ImplantationsSection — World map pins (fluxImage shown on hover)
export const worldPins: WorldPin[] = [
  { top: '38%', left: '48.5%', fluxImage: '/images/groupe/flux-france.svg' },
  { top: '73.5%', left: '61.1%', fluxImage: '/images/groupe/flux-madagascar.svg' },
  { top: '74.2%', left: '63.8%', fluxImage: '/images/groupe/flux-reunion.svg' },
];

// WorldStatsSection — Continent distribution
export const continents: ContinentStat[] = [
  { name: 'France métropolitaine', pct: 36 },
  { name: 'La Réunion', pct: 35 },
  { name: 'Europe (Hors France)', pct: 16 },
  { name: 'Asie', pct: 6 },
  { name: 'États-Unis', pct: 4 },
  { name: 'Afrique', pct: 2 },
  { name: 'Océanie', pct: 1 },
];

// WorldStatsSection — Client portfolio donut chart
export const portfolio: PortfolioItem[] = [
  { label: 'Négociants, grossiste et distributeurs', pct: 54, color: 'bleu-abysse' },
  { label: 'Commerce de détail', pct: 18, color: 'lagon-mayotte' },
  { label: 'CHR', pct: 9, color: 'turquoise-ocean' },
  { label: 'Industriels', pct: 7, color: 'ecume-poudree' },
  { label: 'Mareyeurs', pct: 6, color: 'terre-laterite' },
  { label: 'Collectivités', pct: 4, color: 'sable-corail' },
  { label: 'Autres', pct: 2, color: 'nuit-australe' },
];

// WorldStatsSection — Color name to hex mapping for inline styles
export const colorHex: Record<string, string> = {
  'bleu-abysse': '#002C41',
  'lagon-mayotte': '#2D7890',
  'turquoise-ocean': '#0A97A6',
  'ecume-poudree': '#6EAEB5',
  'terre-laterite': '#A34C26',
  'sable-corail': '#AC8652',
  'nuit-australe': '#587682',
};

export const groupSeo = {
  title: 'Le Groupe — Reunimer',
  description:
    "Découvrez le groupe Reunimer : un modèle intégré de l'océan à l'assiette, nos valeurs, notre histoire et nos filiales.",
};
