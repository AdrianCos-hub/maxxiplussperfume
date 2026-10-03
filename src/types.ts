export interface Variant {
  size: '30ml' | '50ml' | '100ml';
  price: number;
  label: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSpecs {
  concentration: string;
  longevity: string;
  sillage: string;
  projection: string;
  occasion: string;
}

export interface PerfumeProduct {
  id: string;
  name: string;
  tagline: string;
  gender: 'Pria' | 'Wanita' | 'Unisex';
  category: string;
  badge: string;
  image: string;
  description: string;
  variants: Variant[];
  notes: FragranceNotes;
  specs: ProductSpecs;
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  cartKey: string;
  id: string;
  name: string;
  size: '30ml' | '50ml' | '100ml';
  price: number;
  image: string;
  category: string;
  quantity: number;
}
