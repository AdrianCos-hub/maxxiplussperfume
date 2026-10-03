/**
 * Maxxipluss Perfume - Data Katalog Produk, Note Fragrance, Kuis, & Discovery Set Options
 */

import { Product, QuizQuestion, DiscoveryScentOption } from '../types';

export const productsData: Product[] = [
  {
    id: "mxp-royale-noir",
    name: "Maxxipluss Royale Noir",
    subtitle: "Aroma Maskulin & Elegan Rempah Kayu",
    gender: "Pria",
    category: "Woody Spicy",
    tag: "Best Seller",
    rating: 4.9,
    reviewCount: 142,
    image: "image/foto1.jpeg",
    description: "Perpaduan rempah kayu manis Painan dengan cedarwood dan black pepper hangat. Memberikan persona pria karismatik, tegas, dan mewah yang tak terlupakan.",
    variants: [
      { size: "30ml", price: 35000, label: "Travel Size (30ml)" },
      { size: "50ml", price: 55000, label: "Daily Essential (50ml)" },
      { size: "100ml", price: 95000, label: "Signature Bottle (100ml)" }
    ],
    fragranceNotes: {
      top: ["Bergamot Sisilia", "Black Pepper", "Kapulaga"],
      heart: ["Kayu Manis Painan", "Biji Pala", "French Lavender"],
      base: ["Atlas Cedarwood", "Indonesian Patchouli", "Warm Amber"]
    },
    specs: {
      longevity: "8 - 12 Jam",
      sillage: "Moderate to Strong",
      projection: "2 - 2.5 Meter",
      concentration: "Eau de Parfum (EDP)",
      occasion: "Kantor Eksekutif, Acara Formal, Kencan Malam"
    },
    reviews: [
      {
        name: "Rian Pratama",
        city: "Padang",
        rating: 5,
        date: "2 hari lalu",
        comment: "Wanginya maskulin banget dan rempahnya kerasa premium, bukan kayak parfum refill murah. Tahan seharian di kantor ber-AC!"
      },
      {
        name: "Fauzan Akbar",
        city: "Jakarta Selatan",
        rating: 5,
        date: "1 minggu lalu",
        comment: "Kesan pertamanya spicy hangat, pas kering berubah jadi woody amber yang kalem. Pacar saya suka banget aromanya."
      }
    ]
  },
  {
    id: "mxp-velvet-blossom",
    name: "Maxxipluss Velvet Blossom",
    subtitle: "Wangi Manis, Fresh & Anggun Memikat",
    gender: "Wanita",
    category: "Floral Sweet",
    tag: "Favorit Wanita",
    rating: 4.8,
    reviewCount: 118,
    image: "image/foto2.jpeg",
    description: "Kombinasi melati putih nusantara, buah pir merah renyah, dan sentuhan bourbon vanilla lembut. Menggambarkan sosok wanita mandiri yang anggun, manis, dan berkelas.",
    variants: [
      { size: "30ml", price: 35000, label: "Travel Size (30ml)" },
      { size: "50ml", price: 55000, label: "Daily Essential (50ml)" },
      { size: "100ml", price: 95000, label: "Signature Bottle (100ml)" }
    ],
    fragranceNotes: {
      top: ["Red Pear", "Jeruk Mandarin", "Pink Pepper"],
      heart: ["Melati Putih", "Pink Peony", "Mawar Damask"],
      base: ["Bourbon Vanilla", "White Musk", "Creamy Sandalwood"]
    },
    specs: {
      longevity: "8 - 10 Jam",
      sillage: "Intimate to Moderate",
      projection: "1.5 - 2 Meter",
      concentration: "Eau de Parfum (EDP)",
      occasion: "Kuliah, Kencan Romantis, Arisan, Casual Hangout"
    },
    reviews: [
      {
        name: "Annisa Larasati",
        city: "Bukittinggi",
        rating: 5,
        date: "3 hari lalu",
        comment: "Aroma vanilla dan bunganya lembut banget, nggak bikin pusing sama sekali. Banyak yang nanya saya pakai parfum apa di kampus!"
      },
      {
        name: "Dinda Maharani",
        city: "Pekanbaru",
        rating: 5,
        date: "2 minggu lalu",
        comment: "Botolnya rapi dan spray-nya halus. Wangi segarnya tahan sampai sore meski kena panas."
      }
    ]
  },
  {
    id: "mxp-grand-heritage",
    name: "Maxxipluss Grand Heritage 24K",
    subtitle: "Konsentrat Extrait de Parfum Tahan 24 Jam",
    gender: "Unisex",
    category: "Warm Amber",
    tag: "Signature 24 Jam",
    rating: 5.0,
    reviewCount: 236,
    image: "image/foto3.jpeg",
    description: "Racikan mahakarya dengan konsentrat minyak wangi tertinggi. Mengangkat cengkeh pesisir selatan, saffron mewah, dan sentuhan oud lembut yang bertahan hingga 24 jam.",
    variants: [
      { size: "30ml", price: 50000, label: "Travel Size (30ml)" },
      { size: "50ml", price: 85000, label: "Daily Essential (50ml)" },
      { size: "100ml", price: 145000, label: "Signature Bottle (100ml)" }
    ],
    fragranceNotes: {
      top: ["Saffron Emas", "Cengkeh Pesisir Selatan", "Grapefruit"],
      heart: ["Smoky Oud Halus", "Mawar Persia", "Kulit Kayu Manis"],
      base: ["Ambergris", "Tonka Bean Brasil", "Haitian Vetiver"]
    },
    specs: {
      longevity: "Hingga 24 Jam",
      sillage: "Enormous (Sangat Semerbak)",
      projection: "3 Meter+",
      concentration: "Extrait de Parfum (Konsentrasi 35%)",
      occasion: "Pesta Mewah, Pernikahan, Acara Malam Bergengsi"
    },
    reviews: [
      {
        name: "Hendra Wijaya",
        city: "Painan",
        rating: 5,
        date: "Kemarin",
        comment: "Kualitas bintang lima tapi harga UMKM Painan. Semprot di kemeja hari Senin, hari Rabu pas mau dicuci masih wangi cengkeh dan saffron-nya!"
      },
      {
        name: "Siti Rahma",
        city: "Padang Panjang",
        rating: 5,
        date: "5 hari lalu",
        comment: "Sillage-nya luar biasa! Begitu masuk ruangan orang-orang langsung menoleh. Benar-benar produk kebanggaan lokal."
      }
    ]
  },
  {
    id: "mxp-coastline-breeze",
    name: "Maxxipluss Coastline Breeze",
    subtitle: "Kesegaran Samudera Pesisir & Citrus Tropis",
    gender: "Unisex",
    category: "Fresh Aquatic",
    tag: "Rilis Terbaru",
    rating: 4.9,
    reviewCount: 94,
    image: "image/foto4.jpeg",
    description: "Terinspirasi hembusan angin laut Mandeh dan Pesisir Selatan. Paduan garam mineral samudera, jeruk purut tropis, daun mint dingin, dan sentuhan driftwood yang membangkitkan energi kesegaran alami.",
    variants: [
      { size: "30ml", price: 35000, label: "Travel Size (30ml)" },
      { size: "50ml", price: 55000, label: "Daily Essential (50ml)" },
      { size: "100ml", price: 95000, label: "Signature Bottle (100ml)" }
    ],
    fragranceNotes: {
      top: ["Jeruk Purut Pesisir", "Sea Salt Mineral", "Daun Mint Dingin"],
      heart: ["Neroli Laut", "Bunga Lotus Biru", "Rosemary Segar"],
      base: ["Driftwood Kayu Apung", "White Amber", "Cedarwood Pesisir"]
    },
    specs: {
      longevity: "8 - 10 Jam",
      sillage: "Fresh & Uplifting (Moderate)",
      projection: "2 Meter",
      concentration: "Eau de Parfum (EDP)",
      occasion: "Olahraga, Liburan Pantai, Kerja Lapangan, Cuaca Panas"
    },
    reviews: [
      {
        name: "Bima Arya",
        city: "Padang",
        rating: 5,
        date: "4 hari lalu",
        comment: "Segar banget wanginya! Seperti habis mandi di resort pantai mewah. Cocok banget buat cuaca panas di Padang."
      },
      {
        name: "Gilang Pratama",
        city: "Medan",
        rating: 5,
        date: "1 minggu lalu",
        comment: "Aroma aquatic-nya unik ada sentuhan citrus lokal yang renyah. Nggak pasaran sama sekali."
      }
    ]
  },
  {
    id: "mxp-sweet-serenade",
    name: "Maxxipluss Sweet Serenade",
    subtitle: "Kelembutan Manis Karamel, Mawar & Madu",
    gender: "Wanita",
    category: "Floral Sweet",
    tag: "Favorit Baru",
    rating: 4.9,
    reviewCount: 108,
    image: "image/foto5.jpeg",
    description: "Kombinasi menggoda caramel praline, madu hutan Sumatera, kelopak mawar merah muda, dan bourbon vanilla. Menghadirkan wangi manis mewah yang lembut, hangat, dan menempel sepanjang hari.",
    variants: [
      { size: "30ml", price: 35000, label: "Travel Size (30ml)" },
      { size: "50ml", price: 55000, label: "Daily Essential (50ml)" },
      { size: "100ml", price: 95000, label: "Signature Bottle (100ml)" }
    ],
    fragranceNotes: {
      top: ["Caramel Praline", "Buah Beri Liar", "Peach Blossom"],
      heart: ["Mawar Merah Muda", "Madu Hutan Sumatera", "Kelopak Melati"],
      base: ["Bourbon Vanilla", "Kasturi Hangat", "Creamy Sandalwood"]
    },
    specs: {
      longevity: "10 - 14 Jam",
      sillage: "Sweet & Seductive (Moderate to Strong)",
      projection: "2 Meter",
      concentration: "Eau de Parfum (EDP)",
      occasion: "Kencan Malam, Pesta Ultah, Hangout Kafe, Daily Sweet"
    },
    reviews: [
      {
        name: "Clarissa Putri",
        city: "Jakarta Barat",
        rating: 5,
        date: "2 hari lalu",
        comment: "Wanginya kayak bakery mewah campur mawar segar! Manisnya pas, nggak eneg sama sekali. Suami saya suka banget."
      },
      {
        name: "Nabila Zahra",
        city: "Bandung",
        rating: 5,
        date: "6 hari lalu",
        comment: "Tahan seharian dari pagi sampai malam! Karamel dan vanillanya juara banget."
      }
    ]
  }
];

export const scentQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "1. Suasana atau aktivitas utama penggunaan parfum?",
    options: [
      { text: "Bekerja di kantor ber-AC, meeting, atau acara formal", preference: "Woody Spicy", icon: "💼" },
      { text: "Aktivitas kasual, nongkrong, kencan, atau santai", preference: "Floral Sweet", icon: "🌸" },
      { text: "Pesta mewah, event malam hari, atau butuh wangi seharian penuh", preference: "Warm Amber", icon: "🌙" }
    ]
  },
  {
    id: 2,
    title: "2. Karakter aroma yang paling membuat Anda percaya diri?",
    options: [
      { text: "Maskulin, rempah hangat, woody, dan berkarakter kuat", gender: "Pria", icon: "🌲" },
      { text: "Manis lembut, floral segar, feminin, dan memikat", gender: "Wanita", icon: "🌺" },
      { text: "Mewah, eksklusif, tahan 24 jam dan cocok untuk siapa saja", gender: "Unisex", icon: "👑" }
    ]
  },
  {
    id: 3,
    title: "3. Berapa lama ketahanan aroma yang Anda harapkan?",
    options: [
      { text: "Standar harian 8-10 Jam sudah cukup nyaman", tier: "standard", icon: "⏱️" },
      { text: "Maksimal hingga 24 Jam dengan jejak aroma kuat", tier: "extreme", icon: "🔥" }
    ]
  }
];

export const DISCOVERY_OPTIONS: DiscoveryScentOption[] = [
  {
    id: "mxp-royale-noir",
    name: "Royale Noir",
    fullName: "Royale Noir (Woody Spicy)",
    color: "#d4af37",
    notes: "Kayu Manis Painan, Black Pepper & Amber"
  },
  {
    id: "mxp-velvet-blossom",
    name: "Velvet Blossom",
    fullName: "Velvet Blossom (Floral Sweet)",
    color: "#e892a0",
    notes: "Melati Putih, Red Pear & Bourbon Vanilla"
  },
  {
    id: "mxp-grand-heritage",
    name: "Grand Heritage 24K",
    fullName: "Grand Heritage 24K (Warm Amber)",
    color: "#dc5000",
    notes: "Saffron, Cengkeh Pesisir & Oud Halus"
  },
  {
    id: "mxp-coastline-breeze",
    name: "Coastline Breeze",
    fullName: "Coastline Breeze (Fresh Aquatic)",
    color: "#38bdf8",
    notes: "Sea Salt, Jeruk Purut & Driftwood"
  },
  {
    id: "mxp-sweet-serenade",
    name: "Sweet Serenade",
    fullName: "Sweet Serenade (Gourmand Sweet)",
    color: "#f472b6",
    notes: "Caramel Praline, Madu Sumatera & Vanilla"
  }
];
