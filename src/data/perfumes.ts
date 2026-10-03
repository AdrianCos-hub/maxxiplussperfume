import { PerfumeProduct } from '../types';

export const perfumes: PerfumeProduct[] = [
  {
    id: 'mxp-royale-noir',
    name: 'Royale Noir',
    tagline: 'Aroma Maskulin & Kehangatan Rempah Kayu',
    gender: 'Pria',
    category: 'Woody Spicy',
    badge: 'Koleksi Utama',
    image: '/image/foto1.jpeg',
    description:
      'Perpaduan kayu manis Painan dengan lada hitam segar dan kayu aras (cedarwood) hangat. Menghadirkan persona pria berkarakter tegas, berwibawa di ruang eksekutif, dan tak terlupakan pada pertemuan malam.',
    variants: [
      { size: '30ml', price: 35000, label: '30ml Travel' },
      { size: '50ml', price: 55000, label: '50ml Harian' },
      { size: '100ml', price: 95000, label: '100ml Signature' },
    ],
    notes: {
      top: ['Bergamot Sisilia', 'Black Pepper', 'Kapulaga'],
      heart: ['Kayu Manis Painan', 'Biji Pala', 'Lavender Prancis'],
      base: ['Atlas Cedarwood', 'Nilam Sumatera', 'Amber Hangat'],
    },
    specs: {
      concentration: 'Eau de Parfum (EDP)',
      longevity: '8 - 12 Jam',
      sillage: 'Kuat & Semerbak',
      projection: '2 - 2.5 Meter',
      occasion: 'Pertemuan Eksekutif, Acara Formal, Kencan Malam',
    },
    rating: 4.9,
    reviewsCount: 142,
  },
  {
    id: 'mxp-velvet-blossom',
    name: 'Velvet Blossom',
    tagline: 'Wangi Manis Lembut, Segar & Anggun Memikat',
    gender: 'Wanita',
    category: 'Floral Sweet',
    badge: 'Favorit Wanita',
    image: '/image/foto2.jpeg',
    description:
      'Kombinasi melati putih nusantara yang renyah dengan buah pir merah dan kelembutan bourbon vanilla. Memancarkan aura feminin yang lembut, bercahaya, dan mempesona sepanjang hari.',
    variants: [
      { size: '30ml', price: 35000, label: '30ml Travel' },
      { size: '50ml', price: 55000, label: '50ml Harian' },
      { size: '100ml', price: 95000, label: '100ml Signature' },
    ],
    notes: {
      top: ['Pir Merah', 'Jeruk Mandarin', 'Pink Pepper'],
      heart: ['Melati Putih', 'Pink Peony', 'Mawar Damask'],
      base: ['Bourbon Vanilla', 'White Musk', 'Cendana Krim'],
    },
    specs: {
      concentration: 'Eau de Parfum (EDP)',
      longevity: '8 - 10 Jam',
      sillage: 'Intimate to Moderate',
      projection: '1.5 - 2 Meter',
      occasion: 'Kuliah, Kencan Romantis, Acara Siang, Daily Casual',
    },
    rating: 4.8,
    reviewsCount: 118,
  },
  {
    id: 'mxp-grand-heritage',
    name: 'Grand Heritage 24K',
    tagline: 'Konsentrat Extrait de Parfum Tahan 24 Jam',
    gender: 'Unisex',
    category: 'Warm Amber',
    badge: 'Signature 24 Jam',
    image: '/image/foto3.jpeg',
    description:
      'Mahakarya konsentrat tertinggi kami. Kuncup cengkeh liar pesisir selatan Sumatera disatukan dengan saffron emas, sentuhan gaharu lembut (oud), dan ambergris langka. Bertahan hingga dua puluh empat jam.',
    variants: [
      { size: '30ml', price: 50000, label: '30ml Travel' },
      { size: '50ml', price: 85000, label: '50ml Harian' },
      { size: '100ml', price: 145000, label: '100ml Signature' },
    ],
    notes: {
      top: ['Saffron Emas', 'Cengkeh Pesisir', 'Grapefruit Segar'],
      heart: ['Smoky Oud Halus', 'Mawar Persia', 'Kulit Kayu Manis'],
      base: ['Ambergris', 'Tonka Bean Brasil', 'Haitian Vetiver'],
    },
    specs: {
      concentration: 'Extrait de Parfum (35% Concentrate)',
      longevity: 'Hingga 24 Jam',
      sillage: 'Enormous (Sangat Kuat)',
      projection: '3 Meter+',
      occasion: 'Pesta Mewah, Acara Khusus, Signature Scent',
    },
    rating: 5.0,
    reviewsCount: 236,
  },
];

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};
