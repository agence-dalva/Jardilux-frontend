export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: { url: string; width: number; height: number };
    small?: { url: string; width: number; height: number };
    medium?: { url: string; width: number; height: number };
    large?: { url: string; width: number; height: number };
  };
}

export interface Categorie {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  description?: string;
  icone?: string;
  ordre?: number;
}

export interface Produit {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  description: string;
  descriptionCourte?: string;
  prix: number;
  images?: StrapiImage[];
  categorie?: Categorie;
  estVedette: boolean;
  enStock: boolean;
  dimensions?: string;
  materiaux?: string;
  couleurs?: string;
  tags?: string[];
  publishedAt?: string;
  createdAt?: string;
  nettoyage?: string | null;
  details_technique?: string | null;
  rawMetadata?: Record<string, unknown> | null;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiListResponse<T> extends StrapiResponse<T[]> {}
