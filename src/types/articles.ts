export interface Article {
  slug: string;
  tag: string;
  tagColor: 'bleu-abysse' | 'turquoise-ocean' | 'sable-corail';
  date: string;
  title: string;
  description?: string;
  image: ImageMetadata;
  imageAlt: string;
  featured?: 'large' | 'small';
}

export interface GalleryImage {
  image: ImageMetadata;
  alt: string;
}

export interface ArticleDetail {
  gallery: [GalleryImage, GalleryImage, GalleryImage];
  body: string[];
}
