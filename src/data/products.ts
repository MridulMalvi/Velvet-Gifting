export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  occasionTags: string[];
  imageUrl: string;
  stockCount: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Personalized Leather Wallet",
    description: "Handcrafted genuine leather wallet with custom monogram engraving. A timeless accessory for the discerning gentleman.",
    price: 89.00,
    category: "Personalized",
    occasionTags: ["Birthday", "Anniversary", "Corporate"],
    imageUrl: "/images/products/wallet.png",
    stockCount: 24,
    featured: true
  },
  {
    id: "2",
    name: "Gourmet Chocolate Collection",
    description: "An exquisite assortment of 24 artisan chocolates from master chocolatiers. Each piece is a work of edible art.",
    price: 65.00,
    category: "Food & Treats",
    occasionTags: ["Birthday", "Anniversary", "Just Because"],
    imageUrl: "/images/products/chocolate.png",
    stockCount: 50,
    featured: true
  },
  {
    id: "3",
    name: "Crystal Vase Collection",
    description: "Elegant hand-blown crystal vase with delicate etched patterns. Perfect for showcasing fresh blooms in any setting.",
    price: 145.00,
    category: "Home Decor",
    occasionTags: ["Wedding", "Anniversary", "Corporate"],
    imageUrl: "/images/products/vase.png",
    stockCount: 15,
    featured: true
  },
  {
    id: "4",
    name: "Luxury Scented Candle Set",
    description: "Set of three hand-poured soy candles in warm vanilla, fresh lavender, and rich sandalwood. 45-hour burn time each.",
    price: 78.00,
    category: "Home Decor",
    occasionTags: ["Birthday", "Just Because", "Corporate"],
    imageUrl: "/images/products/candles.png",
    stockCount: 38,
    featured: false
  },
  {
    id: "5",
    name: "Premium Flower Bouquet",
    description: "Stunning arrangement of seasonal roses, peonies, and eucalyptus. Hand-tied by expert florists for maximum impact.",
    price: 120.00,
    category: "Flowers",
    occasionTags: ["Birthday", "Anniversary", "Wedding", "Just Because"],
    imageUrl: "/images/products/flowers.png",
    stockCount: 20,
    featured: true
  },
  {
    id: "6",
    name: "Artisan Tea Gift Box",
    description: "Curated selection of 6 premium loose-leaf teas from around the world, presented in a beautiful wooden chest.",
    price: 55.00,
    category: "Food & Treats",
    occasionTags: ["Birthday", "Corporate", "Just Because"],
    imageUrl: "/images/products/tea.png",
    stockCount: 42,
    featured: false
  },
  {
    id: "7",
    name: "Designer Silk Scarf",
    description: "Luxurious 100% mulberry silk scarf with hand-rolled edges. Features an exclusive botanical print design.",
    price: 135.00,
    category: "Fashion",
    occasionTags: ["Birthday", "Anniversary", "Wedding"],
    imageUrl: "/images/products/scarf.png",
    stockCount: 18,
    featured: true
  },
  {
    id: "8",
    name: "Celebration Cake Delight",
    description: "Three-tier artisanal cake with Belgian chocolate ganache and fresh berries. Serves 12-15 guests.",
    price: 95.00,
    category: "Cakes",
    occasionTags: ["Birthday", "Anniversary", "Wedding"],
    imageUrl: "/images/products/cake.png",
    stockCount: 8,
    featured: true
  }
];

export const occasions = [
  { id: "birthday", name: "Birthday", icon: "cake", color: "from-pink-400 to-rose-500" },
  { id: "anniversary", name: "Anniversary", icon: "heart", color: "from-red-400 to-pink-500" },
  { id: "wedding", name: "Wedding", icon: "gem", color: "from-amber-400 to-yellow-500" },
  { id: "corporate", name: "Corporate", icon: "briefcase", color: "from-blue-400 to-indigo-500" },
  { id: "just-because", name: "Just Because", icon: "sparkles", color: "from-purple-400 to-violet-500" }
];

export const categories = ["Flowers", "Cakes", "Personalized", "Food & Treats", "Home Decor", "Fashion"];
