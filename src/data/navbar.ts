import type { NavLink } from '../types/navbar';

export const navLinks: NavLink[] = [
  {
    label: 'Groupe',
    href: '/groupe',
    children: [
      { label: 'Notre Modèle intégré', href: '/groupe/modele-integre' },
      { label: 'Le mot du président', href: '/groupe/mot-du-president' },
      { label: 'Notre raison d\'être', href: '/groupe/raison-detre' },
      { label: 'Notre histoire', href: '/groupe/histoire' },
      { label: 'Nos implantations', href: '/groupe/implantations' },
      { label: 'Nos filiales', href: '/groupe/filiales' },
    ],
  },
  {
    label: 'Expertises',
    href: '/expertises',
    children: [
      { label: 'Pêche', href: '/expertises/peche' },
      { label: 'Production', href: '/expertises/production' },
      { label: 'Distribution', href: '/expertises/distribution' },
      { label: 'Supports', href: '/expertises/supports' },
      { label: 'RH', href: '/expertises/rh' },
    ],
  },
  {
    label: 'Produits',
    href: '/produits',
  },
  {
    label: 'Engagements RSE',
    href: '/engagements',
    children: [
      { label: 'Notre lien à la mer', href: '/engagements#lien-mer' },
      { label: 'Notre lien à la terre', href: '/engagements#lien-terre' },
      { label: 'Notre lien à l\'humain', href: '/engagements#lien-femmes-hommes' },
      { label: 'Notre lien à l\'énergie', href: '/engagements#lien-energie' },
      { label: 'Notre lien à la santé', href: '/engagements#lien-sante' },
      { label: 'Notre lien à la formation', href: '/engagements#lien-formation' },
      { label: 'Notre lien au social', href: '/engagements#lien-social' },
      { label: 'Notre lien aux filières', href: '/engagements#lien-filieres' },
    ],
  },
  {
    label: 'Actualités',
    href: '/actualites',
  },
  {
    label: 'Carrières',
    href: '/carrieres',
  },
];
