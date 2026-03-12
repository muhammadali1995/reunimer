import heroImage from '../assets/images/engagements/hero-engagements.png';
import rapportRseBg from '../assets/images/engagements/rapport-rse-bg.png';
import lienMerImg from '../assets/images/engagements/lien-mer.png';
import logoKelonia from '../assets/images/engagements/logo-kelonia.png';
import lienTerreImg from '../assets/images/engagements/lien-terre.png';
import logoBondy from '../assets/images/engagements/logo-bondy.png';
import lienFemmesHommesImg from '../assets/images/engagements/lien-femmes-hommes.png';
import logoTogether from '../assets/images/engagements/logo-together.png';
import lienEnergieImg from '../assets/images/engagements/lien-energie.png';
import lienSanteImg from '../assets/images/engagements/lien-sante.png';
import lienFormationImg from '../assets/images/engagements/lien-formation.png';
import lienSocialImg from '../assets/images/engagements/lien-social.png';
import logoOceanFarmers from '../assets/images/engagements/logo-ocean-farmers.png';
import logoAripa from '../assets/images/engagements/logo-aripa.png';
import logoAdir from '../assets/images/engagements/logo-adir.png';
import medailleEcovadis from '../assets/images/engagements/medaille-ecovadis.png';
import type {
  EngagementEnergyData,
  EngagementFilieresData,
  EngagementHealthData,
  EngagementHeroData,
  EngagementHumanData,
  EngagementIntroLabels,
  EngagementIntroReportData,
  EngagementSectionData,
  EngagementSeoData,
  EngagementSocialData,
} from '../types/engagements';

export const engagementsSeo: EngagementSeoData = {
  title: 'Engagements RSE — Reunimer',
  description:
    'Découvrez les engagements RSE de Reunimer : biodiversité marine, reforestation, inclusion sociale, transition énergétique et développement des filières locales.',
};

export const engagementsHero: EngagementHeroData = {
  image: heroImage,
  imageAlt:
    "Un enfant souriant dans l'océan Indien — engagement humain et environnemental de Reunimer",
  title: "Un engagement humain et environnemental porteur d'avenir",
  description:
    "Chez Reunimer, nous croyons que la performance durable naît de l'équilibre entre le respect de la nature et l'épanouissement des hommes. Notre stratégie RSE n'est pas une option, mais le socle de notre vision : un modèle d'ancrage territorial où chaque action génère un impact positif et mesurable.",
};

export const introLabels: EngagementIntroLabels = {
  left: 'LOGO ONG',
  right: 'ONG concernées ?',
};

export const introReport: EngagementIntroReportData = {
  image: rapportRseBg,
  imageAlt:
    "Rapport RSE de Reunimer posé sur un ponton en bois au bord de l'océan",
  title: 'Explorez nos Engagements',
  description:
    "Parce que la transparence est aussi essentielle que la fraîcheur de nos produits, nous vous invitons à découvrir l'envers du décor. Notre Rapport RSE détaille nos actions concrètes pour une pêche durable, la protection de la biodiversité réunionnaise et le développement de notre économie locale. Plongez dans nos engagements pour comprendre comment nous transformons, jour après jour, les défis de l'océan en opportunités pour le territoire.",
  buttonLabel: 'Télécharger le rapport RSE',
  buttonHref: '#',
};

export const merSection: EngagementSectionData = {
  title: 'Notre lien à la Mer',
  bodyText:
    "En partenariat avec Kelonia, le groupe Reunimer forme ses marins aux gestes de secours pour les tortues marines. De l'application de protocoles de réanimation au décrochage sécurisé, ces compétences permettent de minimiser l'impact de la pêche et de transformer les équipages en véritables sentinelles de la biodiversité dans l'océan Indien.",
  image: lienMerImg,
  imageAlt:
    "Tortue marine dans l'océan Indien — partenariat Reunimer et Kelonia",
  imagePosition: 'left',
  bgColor: 'gris-clair',
  id: 'lien-mer',
  partner: {
    logo: logoKelonia,
    alt: "Logo Kelonia — l'observatoire des tortues marines",
    description:
      "Kélonia est à la fois un aquarium, musée, et un centre de recherche, d'intervention et de soins consacré aux tortues marines.",
  },
};

export const terreSection: EngagementSectionData = {
  title: 'Notre lien à la Terre',
  bodyText:
    "Engagé pour la préservation de son environnement régional, le groupe Reunimer soutient l'association malgache Bôndy via un don dédié à la reforestation et au développement de l'agroforesterie. Ce partenariat concret permet de restaurer les écosystèmes de la Grande Île tout en accompagnant les communautés locales vers des modèles économiques durables, affirmant ainsi la responsabilité sociétale de Reunimer au cœur de l'océan Indien.",
  image: lienTerreImg,
  imageAlt: 'Reforestation à Madagascar — partenariat Reunimer et Bôndy',
  imagePosition: 'right',
  bgColor: 'white',
  id: 'lien-terre',
  partner: {
    logo: logoBondy,
    alt: 'Logo Bôndy — association de reforestation à Madagascar',
    description:
      'Avec les entreprises engagées, Bôndy mobilise tous les acteurs pour recréer une croissance inclusive et durable à Madagascar, en activant des circuits agricoles et économiques, vertueux, régénératifs et rentables pour tous.',
  },
};

export const femmesHommesSection: EngagementHumanData = {
  id: 'lien-femmes-hommes',
  title: 'Notre lien aux femmes et aux hommes',
  image: lienFemmesHommesImg,
  imageAlt:
    'Inclusion et égalité — engagement de Reunimer envers ses collaborateurs',
  logo: logoTogether,
  logoAlt: 'Logo Together — cellule de prévention des discriminations',
  description:
    "Together est une cellule spécialisée dans la prise en charge de situations de discrimination, de violences sexistes et sexuelles et de harcèlement moral fondé sur un critère de discrimination. Elle est gérée par une équipe de deux psychologues et une actrice de la prévention.",
  statsTitle: "L'impact socio-économique de Reunimer à Madagascar",
  stats: [
    { value: 'XX', label: 'personnes impactées' },
    { value: 'XX', label: 'km de Littoral' },
    { value: 'XX', label: 'pêcheurs partenaires' },
    { value: 'XX', label: '% de femmes' },
    { value: 'XX', label: 'emplois indirects soutenus dans la filière' },
  ],
};

export const energieSection: EngagementEnergyData = {
  id: 'lien-energie',
  title: "Notre lien à l'énergie",
  image: lienEnergieImg,
  imageAlt:
    'Panneaux photovoltaïques sur les sites de stockage Reunimer — transition énergétique',
  paragraphs: [
    "Conscient de l'empreinte énergétique liée à la chaîne du froid et à la navigation, le groupe Reunimer place la transition écologique au centre de sa stratégie. En investissant dans des infrastructures performantes, comme l'installation de panneaux photovoltaïques sur ses sites de stockage et l'optimisation de la consommation de ses navires.",
    "Le groupe réduit activement son bilan carbone. Cette quête d'efficacité énergétique permet de concilier impératifs industriels et respect de l'écosystème fragile de La Réunion.",
  ],
};

export const santeSection: EngagementHealthData = {
  id: 'lien-sante',
  title: 'Notre lien à la santé',
  image: lienSanteImg,
  imageAlt:
    'Produits de la mer frais — engagement santé et bien manger de Reunimer',
  paragraphs: [
    "Convaincu que la santé commence par l'alimentation, le groupe Reunimer valorise le « bien manger » à travers des produits de la mer d'une fraîcheur exemplaire. En privilégiant les circuits courts et une pêche responsable dans l'océan Indien, le groupe offre aux consommateurs une source de protéines nobles et d'acides gras essentiels, indispensables à un équilibre nutritionnel durable.",
    "Pour Reunimer, promouvoir une consommation saine et transparente aujourd'hui, c'est investir directement dans la vitalité des générations futures.",
  ],
};

export const formationSection: EngagementSectionData = {
  title: 'Notre lien à la formation',
  bodyText:
    "Le Partenariat avec l'EAMP. Pour pérenniser l'excellence de ses métiers, le groupe Reunimer collabore étroitement avec l'École d'Apprentissage Maritime de La Réunion (EAMP). Ce partenariat stratégique vise à former les futurs experts de la mer, qu'il s'agisse de navigation, de mécanique navale ou de techniques de pêche, en alignant les cursus pédagogiques sur les réalités du terrain. En offrant des terrains de stage et des perspectives d'embauche concrètes, Reunimer s'assure un vivier de compétences locales hautement qualifiées, tout en soutenant activement l'insertion professionnelle de la jeunesse réunionnaise.",
  image: lienFormationImg,
  imageAlt: "Formation maritime à La Réunion avec l'EAMP et Reunimer",
  imagePosition: 'right',
  bgColor: 'white',
  id: 'lien-formation',
  showButton: false,
};

export const socialSection: EngagementSocialData = {
  id: 'lien-social',
  title: 'Notre lien au social',
  image: lienSocialImg,
  imageAlt:
    "Algoculture à Madagascar — engagement social et économie bleue de Reunimer",
  subtitle: "Une économie bleue pour l'avenir de notre ressource.",
  bodyText:
    "Ocean Farmers : L'innovation sociale au service des écosystèmes. Pionnier de l'algoculture tropicale à Madagascar depuis 2010, Reunimer a bâti un modèle villageois unique, contractuel et équitable. À travers 55 villages, nous créons des emplois durables, majoritairement occupés par des femmes, tout en régénérant les milieux côtiers. Cette diversification responsable réduit la pression sur les ressources halieutiques et incarne notre engagement pour un développement solidaire.",
  logo: logoOceanFarmers,
  logoAlt: 'Logo Ocean Farmers',
  statsTitle: "L'impact social de l'algoculture à Madagascar",
  stats: [
    { value: '55', label: 'villages engagés dans la filière' },
    { value: '2000', label: 'familles' },
    { value: '300', label: "km de littoral d'activité" },
    { value: '1800', label: 'tonnes de poissons pélagiques pêchés' },
  ],
};

export const filieresSection: EngagementFilieresData = {
  id: 'lien-filieres',
  title: 'Notre lien aux filières',
  paragraphs: [
    "Membre de l'ADIR, Reunimer s'engage pour l'excellence industrielle de La Réunion. En structurant la filière pêche et en défendant la production locale, le groupe renforce la souveraineté alimentaire de l'île et valorise le savoir-faire réunionnais au cœur de l'océan Indien.",
    "Également membre de l'ARIPA, Reunimer s'engage pour une filière pêche et aquaculture structurée à La Réunion. Cette synergie interprofessionnelle assure la traçabilité des produits, la stabilité du marché et une gestion durable des ressources au service d'une économie bleue locale et performante.",
  ],
  partners: [
    { logo: logoAdir, alt: 'Logo ADIR' },
    { logo: logoAripa, alt: 'Logo ARIPA' },
  ],
  medal: medailleEcovadis,
  medalAlt: 'Médaille EcoVadis bronze Top 35% janvier 2025',
  medalDescription:
    "EcoVadis est une entreprise SaaS qui propose une gamme de solutions RSE conçues pour vous aider à gérer, à mesurer et à améliorer votre performance RSE dans l'ensemble de la chaîne de valeur.",
};
