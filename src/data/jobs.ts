import type { JobListing } from '../types/careers';

export type { JobListing };

export const jobListings: JobListing[] = [
  {
    title: 'Lieutenant de Pêche (H/F) – Flotte Océan Indien',
    bgColor: 'bg-terre-laterite',
    missionText:
      "Sous l'autorité du Capitaine, vous participez à la conduite du navire et aux opérations de pêche durable. Vous êtes le garant de la sécurité à bord et de l'application des protocoles de protection de la biodiversité (notamment les gestes de secours aux tortues marines en partenariat avec Kelonia).",
    benefitTitle: 'Pourquoi nous rejoindre\u00a0?',
    benefitText:
      'Une carrière de haut niveau sur des navires modernes sans quitter La Réunion.',
    extraTitle: 'Transmission\u00a0:',
    extraText:
      "Intégrez une équipe où l'expérience des anciens rencontre l'innovation technologique.",
    defaultExpanded: true,
  },
  {
    title:
      'Technicien de Maintenance Industrielle (H/F) – Site de Transformation',
    bgColor: 'bg-nuit-australe',
    missionText:
      "Au sein de notre site de transformation agroalimentaire, vous assurez la maintenance préventive et curative des équipements de production. Vous diagnostiquez les pannes, intervenez sur les lignes de conditionnement et contribuez à l'amélioration continue des installations.",
    benefitTitle: 'Pourquoi nous rejoindre\u00a0?',
    benefitText:
      'Un environnement technique moderne au c\u0153ur de la filière halieutique réunionnaise.',
    extraTitle: 'Évolution\u00a0:',
    extraText:
      "Des perspectives d'évolution vers des postes de responsable maintenance ou ingénierie process.",
  },
  {
    title: 'Chargé(e) de Qualité et Développement Durable (H/F) – RSE',
    bgColor: 'bg-ecume-poudree',
    missionText:
      "Vous pilotez la démarche qualité et les engagements RSE du groupe. Vous réalisez les audits internes, suivez les certifications (MSC, ISO) et coordonnez les actions de développement durable en lien avec notre politique environnementale.",
    benefitTitle: 'Pourquoi nous rejoindre\u00a0?',
    benefitText:
      'Un rôle stratégique au c\u0153ur de la transformation durable du groupe.',
    extraTitle: 'Impact\u00a0:',
    extraText:
      'Contribuez directement à la protection de la biodiversité marine et au développement des filières locales.',
  },
];
