/**
 * Maxxipluss Perfume - Interface TypeScript untuk Produk, Variasi, Note, dan State Keranjang
 */

export interface ProductVariant {
  size: string;
  price: number;
  label: string;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductSpecs {
  longevity: string;
  sillage: string;
  projection: string;
  concentration: string;
  occasion: string;
}

export interface ProductReview {
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  gender: 'Pria' | 'Wanita' | 'Unisex';
  category: string;
  tag?: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  variants: ProductVariant[];
  fragranceNotes: FragranceNotes;
  specs: ProductSpecs;
  reviews: ProductReview[];
}

export interface CartItem {
  itemKey: string;
  id: string;
  name: string;
  size: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface CustomerCheckoutInfo {
  name: string;
  phone: string;
  address: string;
  courier: string;
  notes?: string;
}

export interface DiscoveryScentOption {
  id: string;
  name: string;
  fullName: string;
  color: string;
  notes: string;
}

export interface QuizQuestionOption {
  text: string;
  preference?: string;
  gender?: 'Pria' | 'Wanita' | 'Unisex';
  tier?: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  title: string;
  options: QuizQuestionOption[];
}
