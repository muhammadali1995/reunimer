import type {
  FilialeHeroData,
  FilialePresentationData,
  FilialeHistoryData,
  FilialeKeyFiguresData,
  FilialeProductionGroup,
  FilialeProductItem,
  FilialeContactData,
} from '../types/filiale';

// Main images
import heroBg from '../assets/images/filiales/phb/hero-bg.png';
import logoPhb from '../assets/images/filiales/phb/logo-phb.png';
import productionAutoImg from '../assets/images/filiales/phb/production-auto.png';
import productionManuelleImg from '../assets/images/filiales/phb/production-manuelle.png';

// Product images
import dosLieuxNoirs from '../assets/images/filiales/phb/produits/dos-lieux-noirs.png';
import filetsGrondins from '../assets/images/filiales/phb/produits/filets-grondins.png';
import coquillesStJacques from '../assets/images/filiales/phb/produits/coquilles-saint-jacques.png';
import filetsMerlans from '../assets/images/filiales/phb/produits/filets-merlans.png';
import filetsEglefins from '../assets/images/filiales/phb/produits/filets-eglefins.png';
import filetsMaquereaux from '../assets/images/filiales/phb/produits/filets-maquereaux.png';
import filetsLieuxNoirs from '../assets/images/filiales/phb/produits/filets-lieux-noirs.png';
import filetsHarengs from '../assets/images/filiales/phb/produits/filets-harengs.png';
import filetsCabillauds from '../assets/images/filiales/phb/produits/filets-cabillauds.png';
import ailesRaiePelees from '../assets/images/filiales/phb/produits/ailes-raie-pelees.png';
import roussettesPelees from '../assets/images/filiales/phb/produits/roussettes-pelees.png';
import filetsSardines from '../assets/images/filiales/phb/produits/filets-sardines.png';
import encornets from '../assets/images/filiales/phb/produits/encornets.png';
import seiches from '../assets/images/filiales/phb/produits/seiches.png';
import sardines from '../assets/images/filiales/phb/produits/sardines.png';
import soles from '../assets/images/filiales/phb/produits/soles.png';
import dosDemoiselles from '../assets/images/filiales/phb/produits/dos-demoiselles.png';
import filetsHarengsFumes from '../assets/images/filiales/phb/produits/filets-harengs-fumes.png';
import maquereaxPoivres from '../assets/images/filiales/phb/produits/maquereaux-poivres.png';
import haddocksPoches from '../assets/images/filiales/phb/produits/haddocks-poches.png';
import noixStJacques from '../assets/images/filiales/phb/produits/noix-saint-jacques.png';

export const phbHero: FilialeHeroData = {
  title: 'PHF',
  logo: logoPhb,
  backgroundImage: heroBg,
};

export const phbPresentation: FilialePresentationData = {
  title: 'Présentation',
  subtitle: 'Spécialisée dans la vente, l\'élaboration et le conditionnement de produits de la mer pêchés dans la Manche et la Mer du Nord, PHF (Pêcheries des Hautes-de-France) est aujourd\'hui l\'un des principaux acteurs du port de Boulogne sur Mer.',
  body: [
    'Notre activité est essentiellement orientée vers la GMS et l\'entreprise compte 40 collaborateurs + du personnel intérimaire dont le nombre varie en fonction des apports.',
  ],
};

export const phbHistory: FilialeHistoryData = {
  title: 'Historique',
  body: [
    'En 2003, Stéphane Level et Yannig Gomel (salariés de PHF) s\'associent pour créer GLI (Gomel Level Investissements), holding qui fera l\'acquisition dans la foulée de la totalité des parts de PHF.',
    'Depuis octobre 2025, PHF a intégré pleinement le groupe Reunimer.',
  ],
};

export const phbKeyFigures: FilialeKeyFiguresData = {
  title: 'Chiffres-clés',
  stats: [
    { value: '15 700 000€', description: 'de CA en 2025' },
    { value: '3200', description: 'tonnes de produits finis' },
    { value: '60%', description: 'de nos apports proviennent de la criée de Boulogne-sur-Mer' },
    { value: '8', description: 'bateaux dont nous collectons directement la pêche' },
  ],
};

export const phbProductionIntro = {
  title: 'Production',
  body: [
    'Cette dernière décennie nous avons travaillé sur la <strong class="font-bold">mécanisation</strong> et la réinvention de notre outil de production dans le but d\'obtenir une plus grande productivité. Notre atelier de production se veut <strong class="font-bold">moderne, mécanisé</strong> et répond aux <strong class="font-bold">normes sanitaires et environnementales.</strong>',
    'Nous oeuvrons également dans l\'<strong class="font-bold">amélioration des conditions de travail</strong> de nos collaborateurs. Nous <strong class="font-bold">investissons</strong> sans cesse pour être le plus <strong class="font-bold">performant</strong> possible et pour <strong class="font-bold">optimiser la qualité de travail</strong> de nos opérateurs.',
  ],
};

export const phbProductionAuto: FilialeProductionGroup = {
  title: 'Production automatisée',
  subtitle: 'Nous disposons de machines nous permettant l\'automatisation des tâches suivantes :',
  image: productionAutoImg,
  stats: [
    { value: '900 KG', description: 'Découpe de sardine et maquereau — de produit fini par heure' },
    { value: '1,2 T', description: 'Découpe de lieu noir, cabillaud, églefin et merlan — de produit fini par heure' },
    { value: '800 KG', description: 'Écorchage d\'ailes de raie — de produit fini par heure' },
    { value: '720', description: 'Emballage — caisses par heure' },
  ],
};

export const phbProductionManuelle: FilialeProductionGroup = {
  title: 'Production manuelle',
  subtitle: 'Nos 20 artisans experts effectuent les tâches suivantes :',
  image: productionManuelleImg,
  stats: [
    { value: '500 KG', description: 'Filetage et écorchage — de filets de grondin par jour' },
    { value: '800 KG', description: 'd\'émissoles pelées par jour' },
    { value: '400 KG', description: 'de roussettes pelées par jour' },
    { value: '1500 KG', description: 'de raies entières découpées par jour' },
    { value: '600 KG', description: 'Décorticage de coquilles Saint-Jacques — de noix de Saint-Jacques par jour' },
  ],
};

export const phbProducts: FilialeProductItem[] = [
  { name: 'Filets de sardines', image: filetsSardines },
  { name: 'Dos de lieux noirs', image: dosLieuxNoirs },
  { name: 'Filets de grondins', image: filetsGrondins },
  { name: 'Coquilles Saint-Jacques', image: coquillesStJacques },
  { name: 'Filets de merlans', image: filetsMerlans },
  { name: 'Filets d\'églefins', image: filetsEglefins },
  { name: 'Filets de maquereaux', image: filetsMaquereaux },
  { name: 'Filets de lieux noirs', image: filetsLieuxNoirs },
  { name: 'Filets de harengs', image: filetsHarengs },
  { name: 'Filets de cabillauds', image: filetsCabillauds },
  { name: 'Ailes de raie pelées', image: ailesRaiePelees },
  { name: 'Roussettes pelées', image: roussettesPelees },
  { name: 'Encornets', image: encornets },
  { name: 'Seiches', image: seiches },
  { name: 'Sardines', image: sardines },
  { name: 'Soles', image: soles },
  { name: 'Dos de demoiselles', image: dosDemoiselles },
  { name: 'Filets de harengs fumés', image: filetsHarengsFumes },
  { name: 'Maquereaux poivrés', image: maquereaxPoivres },
  { name: 'Haddocks pochés', image: haddocksPoches },
  { name: 'Noix de Saint-Jacques', image: noixStJacques },
];

export const phbContact: FilialeContactData = {
  title: 'Contactez-nous',
  phone: '03 21 99 55 00',
  address: 'Zone Industrielle Capécure, Rue Louis Blériot, 62200 Boulogne-sur-Mer',
};
