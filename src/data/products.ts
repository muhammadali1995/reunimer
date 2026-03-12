import type { Product } from '../types/products';

import poissonsPelagiquesImg from '../assets/images/produits/poissons-pelagiques.png';
import langousteMadagascarImg from '../assets/images/produits/langouste-madagascar.png';
import crabeMadagascarImg from '../assets/images/produits/crabe-madagascar.png';
import seicheBoulogneImg from '../assets/images/produits/seiche-boulogne.png';
import sardineBoulogneImg from '../assets/images/produits/sardine-boulogne.png';
import poulpeMadagascarImg from '../assets/images/produits/poulpe-madagascar.jpg';
import legineTaafImg from '../assets/images/produits/legine-taaf.png';
import poissonsDemerseauxImg from '../assets/images/produits/poissons-demersaux.png';
import produitsTraiteurImg from '../assets/images/produits/produits-traiteur.png';

export const products: Product[] = [
  {
    name: 'Poissons pélagiques',
    origin: "de l'Océan Indien",
    image: poissonsPelagiquesImg,
    alt: "Thon albacore frais tranché — poissons pélagiques de l'Océan Indien",
  },
  {
    name: 'Langouste',
    origin: 'de Madagascar',
    image: langousteMadagascarImg,
    alt: 'Langouste tropicale congelée — langouste de Madagascar',
  },
  {
    name: 'Crabe',
    origin: 'de Madagascar',
    image: crabeMadagascarImg,
    alt: 'Crabe préparé — crabe de Madagascar',
  },
  {
    name: 'Seiche',
    origin: 'de Boulogne-sur-Mer',
    image: seicheBoulogneImg,
    alt: 'Seiche fraîche cuisinée — seiche de Boulogne-sur-Mer',
  },
  {
    name: 'Sardine',
    origin: 'de Boulogne-sur-Mer',
    image: sardineBoulogneImg,
    alt: 'Sardines fraîches — sardine de Boulogne-sur-Mer',
  },
  {
    name: 'Poulpe',
    origin: 'de Madagascar',
    image: poulpeMadagascarImg,
    alt: 'Poulpe (zourite) cuisiné — poulpe de Madagascar',
  },
  {
    name: 'Légine',
    origin: 'des TAAF',
    image: legineTaafImg,
    alt: 'Filet de légine — légine des TAAF',
  },
  {
    name: 'Poissons démersaux',
    origin: 'de Madagascar',
    image: poissonsDemerseauxImg,
    alt: 'Filet de poisson démersal — poissons démersaux de Madagascar',
  },
  {
    name: 'Produits traiteur',
    origin: "de l'Île de la Réunion",
    image: produitsTraiteurImg,
    alt: "Produits traiteur préparés — produits traiteur de l'Île de la Réunion",
  },
];
