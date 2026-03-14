import type {
  BrandRow,
  DistributionCard,
  ExpertiseHeroTab,
  ExpertiseQuota,
  ExpertiseStatGroup,
  ExpertiseStatItem,
  RhDonut,
} from '../types/expertises';
import heroImage from '../assets/images/expertise/hero-figma.png';
import fishingBackground from '../assets/images/expertise/carte-peche.png';
import distributionMagazineCover from '../assets/images/expertise/magazine-cover.png';
import distributionSupplyImage from '../assets/images/expertise/distri-approvisionnement.png';
import distributionExpertiseImage from '../assets/images/expertise/distri-expertise.png';
import distributionServiceImage from '../assets/images/expertise/distri-service.png';
import fishIllustration from '../assets/images/expertise/fish-illustration.png';
import madagascarImage from '../assets/images/expertise/peche-madagascar.png';
import tunaSingleImage from '../assets/images/expertise/thon-seul.png';
import boulogneImage from '../assets/images/produits/sardine-boulogne.png';
import rhBackground from '../assets/images/expertise/rh-background.png';
import supportBackground from '../assets/images/expertise/support-bg.png';
import transformationPrimaryImage from '../assets/images/expertise/transformation-1.png';
import transformationSecondaryImage from '../assets/images/expertise/transformation-2.png';
import smokeImage from '../assets/images/expertise/smoke.png';
import pecheurCreoleLogo from '../assets/logos/le-pecheur-creole.png';
import seafoodKorailLogo from '../assets/images/brands/seafood-korail.png';
import redPremierLogo from '../assets/images/brands/red-premier.jpg';

export const expertisesHeroImage = heroImage;
export const expertisesFishingBackground = fishingBackground;
export const expertisesFishIllustration = fishIllustration;
export const expertisesMadagascarImage = madagascarImage;
export const expertisesBoulogneImage = boulogneImage;
export const expertisesTunaImage = tunaSingleImage;
export const expertisesTransformationPrimaryImage = transformationPrimaryImage;
export const expertisesTransformationSecondaryImage = transformationSecondaryImage;
export const expertisesSmokeImage = smokeImage;
export const expertisesDistributionMagazineCover = distributionMagazineCover;
export const expertisesSupportBackground = supportBackground;
export const expertisesRhBackground = rhBackground;

export const expertisesHeroTabs: ExpertiseHeroTab[] = [
  { label: 'pêche', className: 'bg-terre-laterite md:h-[47px] md:w-[243px] md:pt-[15px]' },
  { label: 'transformation', className: 'bg-lagon-mayotte md:h-[29px] md:w-[247px] md:pt-[7px]' },
  { label: 'distribution', className: 'bg-sable-corail md:h-[29px] md:w-[242px] md:pt-[7px]' },
  { label: 'Logistique', className: 'bg-brume-alize md:h-[29px] md:w-[233px] md:pt-[7px]' },
  { label: 'RH', className: 'bg-ecume-poudree md:h-[29px] md:w-[233px] md:pt-[7px]' },
];

export const fishingFleetStats: ExpertiseStatGroup[] = [
  { location: 'À la Réunion', items: [{ value: '17', label: 'longliners de 13 et 25 m' }, { value: '1', label: 'palangrier de 68 m' }] },
];

export const fishingCatchStats: ExpertiseStatItem[] = [
  { value: '130', label: 'marins pêcheurs' },
  { value: '1800', label: 'tonnes de poissons pélagiques pêchés' },
];

export const madagascarStats: ExpertiseStatItem[] = [
  { value: 'XX', label: 'Nombre de collecteurs' },
  { value: '86', label: 'bateaux / pirogues de pêche artisanale' },
  { value: '5400', label: "km de littoral d'activité" },
];

export const boulogneStats: ExpertiseStatItem[] = [
  { value: '23', label: "années d'expertise dans le mareyage" },
  { value: '8', label: 'bateaux ou barques de pêche artisanale' },
  { value: 'XX', label: 'tonnes de produits de la mer achetés' },
];

export const fishingQuotas: ExpertiseQuota[] = [
  { year: '2024/25', total: '5542 T', top: '9%', bottom: '91%', dash: '51 514' },
  { year: '2025/26', total: '4780 T', top: '11%', bottom: '89%', dash: '62 503' },
];

export const certificationLeftColumn = ['Espadon (2016)', 'Légine (2025)', 'Thon Germon (2026)'];
export const certificationRightColumn = ['Légine (2022)', 'Grenadier (2025)'];

export const productionStats: ExpertiseStatGroup[] = [
  { location: 'À la Réunion', items: [{ value: '1800', label: 'tonnes de produits traités' }, { value: 'XX', label: 'tonnes de produits transformés' }, { value: '40', label: 'Professionnels en production et qualité' }] },
  { location: 'À Madagascar', items: [{ value: 'XX', label: 'tonnes de produits traités' }, { value: 'XX', label: 'tonnes de produits transformés' }, { value: 'XX', label: 'emplois en usine' }] },
  { location: 'À Boulogne-sur-Mer', items: [{ value: 'XX', label: 'tonnes de produits traités' }, { value: 'XX', label: 'tonnes de produits transformés' }, { value: '40', label: 'emplois en usine' }] },
];

export const supportStats: ExpertiseStatGroup[] = [
  { location: 'À la Réunion', items: [{ value: '25', label: 'Emplois en logistique et maintenance' }, { value: '32', label: 'véhicules' }, { value: '1300', label: 'emplacements palettes' }] },
  { location: 'À Madagascar', items: [{ value: 'XX', label: 'Emplois en logistique et maintenance' }, { value: 'XX', label: 'véhicules' }, { value: 'XX', label: 'emplacements palettes' }] },
];

export const distributionCards: DistributionCard[] = [
  { title: 'Approvisionnement', description: 'Une origine garantie et une traçabilité totale.', image: distributionSupplyImage, alt: "Conteneur logistique pour l'approvisionnement", imageClass: 'object-[center_18%]' },
  { title: 'Expertise', description: 'Un conseil métier pour chaque typologie de client.', image: distributionExpertiseImage, alt: 'Équipe Reunimer en échange métier', imageClass: 'object-[center_20%]' },
  { title: 'Service', description: 'Une réactivité logistique et commerciale exemplaire.', image: distributionServiceImage, alt: 'Équipe logistique et service Reunimer', imageClass: 'object-[center_28%]' },
];

export const brandRows: BrandRow[] = [
  { name: 'Le Pêcheur Créole', logo: pecheurCreoleLogo, logoAlt: 'Logo Le Pêcheur Créole', body: 'Une marque pensée pour le quotidien réunionnais, avec des produits de la mer accessibles, identifiables et adaptés aux habitudes de consommation locales.' },
  { name: 'SeaFood Korail', logo: seafoodKorailLogo, logoAlt: 'Logo SeaFood Korail', body: 'Une signature tournée vers les marchés professionnels et export, portée par la régularité d’approvisionnement, la traçabilité et la qualité de préparation.' },
  { name: 'Red Premier', logo: redPremierLogo, logoAlt: 'Logo Red Premier', body: 'Une gamme à forte valeur ajoutée qui traduit le savoir-faire industriel de Reunimer dans des références premium, prêtes à convaincre les circuits exigeants.' },
];

export const rhDonuts: RhDonut[] = [
  { lines: ['Proportion', 'Hommes/femmes'], leftValue: 'X%', rightValue: 'X%', centerTop: 'top-[66px] md:top-[72px]' },
  { lines: ['Proportion', '- de 30 ans', '/+ de 30 ans'], leftValue: 'X%', rightValue: 'X%', centerTop: 'top-[58px] md:top-[60px]' },
];
