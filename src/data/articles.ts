import type { Article, ArticleDetail } from '../types/articles';

import articlePlaceholder from '../assets/images/actus/article-4.jpg';
import actuChefMarx from '../assets/images/actus/actu-chef-thierry-marx.png';
import actuLeaderMag from '../assets/images/actus/actu-leader-magazine.png';
import actuLangouste from '../assets/images/actus/actu-langouste-st-valentin.png';
import actuEngagement from '../assets/images/actus/actu-engagement-durable.png';

export const articles: Article[] = [
  // Featured large
  {
    slug: 'visite-chef-thierry-marx',
    tag: 'EVENTS',
    tagColor: 'turquoise-ocean',
    date: '11 FÉV. 2026',
    title: 'Visite du Chef Thierry Marx',
    image: actuChefMarx,
    imageAlt: 'Visite du Chef Thierry Marx chez Reunimer',
    featured: 'large',
  },
  // Featured small
  {
    slug: 'reunimer-couverture-leader-magazine',
    tag: 'GROUPE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Reunimer en couverture du Leader Magazine',
    image: actuLeaderMag,
    imageAlt: 'Reunimer en couverture du Leader Magazine',
    featured: 'small',
  },
  {
    slug: 'langouste-saint-valentin',
    tag: 'PRODUITS',
    tagColor: 'sable-corail',
    date: '11 FÉV. 2026',
    title: 'La langouste pour la St-Valentin',
    image: actuLangouste,
    imageAlt: 'La langouste pour la St-Valentin',
    featured: 'small',
  },
  {
    slug: 'engagement-durable',
    tag: 'GROUPE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    image: actuEngagement,
    imageAlt: 'Un engagement durable',
    featured: 'small',
  },
  // Grid articles
  {
    slug: 'engagement-durable-groupe',
    tag: 'GROUPE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    description: "L'audace (nous ouvrons la voie). Nous ne sommes pas les marchés, nous les bâtissons. Là où il n'y a rien, … En savoir plus \u00BB",
    image: articlePlaceholder,
    imageAlt: 'Un engagement durable',
  },
  {
    slug: 'engagement-durable-filiere',
    tag: 'FILIÈRE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    description: "L'audace (nous ouvrons la voie). Nous ne sommes pas les marchés, nous les bâtissons. Là où il n'y a rien, … En savoir plus \u00BB",
    image: articlePlaceholder,
    imageAlt: 'Un engagement durable',
  },
  {
    slug: 'engagement-durable-groupe-2',
    tag: 'GROUPE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    description: "L'audace (nous ouvrons la voie). Nous ne sommes pas les marchés, nous les bâtissons. Là où il n'y a rien, … En savoir plus \u00BB",
    image: articlePlaceholder,
    imageAlt: 'Un engagement durable',
  },
  {
    slug: 'engagement-durable-groupe-3',
    tag: 'GROUPE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    description: "L'audace (nous ouvrons la voie). Nous ne sommes pas les marchés, nous les bâtissons. Là où il n'y a rien, … En savoir plus \u00BB",
    image: articlePlaceholder,
    imageAlt: 'Un engagement durable',
  },
  {
    slug: 'engagement-durable-filiere-2',
    tag: 'FILIÈRE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    description: "L'audace (nous ouvrons la voie). Nous ne sommes pas les marchés, nous les bâtissons. Là où il n'y a rien, … En savoir plus \u00BB",
    image: articlePlaceholder,
    imageAlt: 'Un engagement durable',
  },
  {
    slug: 'engagement-durable-groupe-4',
    tag: 'GROUPE',
    tagColor: 'bleu-abysse',
    date: '11 FÉV. 2026',
    title: 'Un engagement durable',
    description: "L'audace (nous ouvrons la voie). Nous ne sommes pas les marchés, nous les bâtissons. Là où il n'y a rien, … En savoir plus \u00BB",
    image: articlePlaceholder,
    imageAlt: 'Un engagement durable',
  },
];

/** Detail data for articles that have a detail page. */
export const articleDetails: Record<string, ArticleDetail> = {
  'visite-chef-thierry-marx': {
    gallery: [
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — vue d\'ensemble' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — détail' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — cuisine' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — équipe' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — produits' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — atelier' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — dégustation' },
      { image: articlePlaceholder, alt: 'Visite du Chef Thierry Marx — finale' },
    ],
    body: [
      'Ipsunda ime non cumquat emperchil etus etur, voluptatem et alit, tem dem excero id quo temposte sim hilicius, aut pa doluptatior reictatur sae volorecus et expeliquid quam la dem fuga. Ipsunda ime non cumquat emperchil etus etur, voluptatem et alit, tem dem excero id quo temposte sim hilicius, aut pa doluptatior reictatur sae volorecus et expeliquid quam la dem fuga. Ipsunda ime non cumquat emperchil etus etur, voluptatem et alit, tem dem excero id quo temposte sim hilicius, aut pa doluptatior reictatur sae volorecus et expeliquid quam la dem fuga.',
      'Ipsunda ime non cumquat emperchil etus etur, voluptatem et alit, tem dem excero id quo temposte sim hilicius, aut pa doluptatior reictatur sae volorecus et expeliquid quam la dem fuga. Ipsunda ime non cumquat emperchil etus etur, voluptatem et alit, tem dem excero id quo temposte sim hilicius, aut pa doluptatior reictatur sae volorecus et expeliquid quam la dem fuga. Ipsunda ime non cumquat emperchil etus etur, voluptatem et alit, tem dem excero id quo temposte sim hilicius, aut pa doluptatior reictatur sae volorecus et expeliquid quam la dem fuga.',
    ],
  },
};

export function getArticleHref(slug: string): string {
  return `/actualites/${slug}`;
}

export const featuredLargeArticle = articles.find((a) => a.featured === 'large')!;
export const featuredSmallArticles = articles.filter((a) => a.featured === 'small');
export const gridArticles = articles.filter((a) => !a.featured);
