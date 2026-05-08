export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  edition?: string;
  type: "watches" | "glasses";
};

export const watches: Product[] = [
  {
    id: "aureate-pulse",
    name: "Aureate Pulse",
    category: "Dress Watch",
    price: 1299,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&auto=format&fit=crop",
    description: "A refined dress watch with a minimalist dial and signature gold accents — built for elevated everyday wear.",
    edition: "Featured",
    type: "watches",
  },
  {
    id: "emporio-armani",
    name: "Emporio Armani",
    category: "Chronograph Wristwatch",
    price: 3499,
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&auto=format&fit=crop",
    description: "Italian-inspired chronograph with a sleek metallic case and precision movement.",
    edition: "Featured",
    type: "watches",
  },
  {
    id: "tomi-t108",
    name: "TOMI T-108",
    category: "Sport Watch",
    price: 6999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop",
    description: "Bold sport silhouette with rugged casing and luminous indices for clarity at any hour.",
    type: "watches",
  },
  {
    id: "timas-tc326",
    name: "TIMAS TC-326",
    category: "Premium Wristwatch",
    price: 8000,
    image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&auto=format&fit=crop",
    description: "Premium build with multi-function dial — engineered for connoisseurs of fine timekeeping.",
    edition: "Signature piece",
    type: "watches",
  },
  {
    id: "noir-monarch-41",
    name: "Noir Monarch 41",
    category: "Classic Watch",
    price: 1499,
    image: "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=800&auto=format&fit=crop",
    description: "Timeless 41mm classic with a deep noir dial — understated and unmistakable.",
    type: "watches",
  },
];

export const glasses: Product[] = [
  {
    id: "rayban-aviator",
    name: "Ray-Ban Aviator",
    category: "Sunglasses",
    price: 8499,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop",
    description: "The iconic teardrop silhouette — a true signature piece edition for the modern wearer.",
    edition: "Signature piece",
    type: "glasses",
  },
  {
    id: "parada",
    name: "Parada",
    category: "Sunglasses",
    price: 7000,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&auto=format&fit=crop",
    description: "Sculpted Italian frames that bring quiet confidence to any look.",
    type: "glasses",
  },
  {
    id: "gucci",
    name: "Gucci",
    category: "Sunglasses",
    price: 8000,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop",
    description: "Luxury house design with bold lens geometry and unmistakable presence.",
    edition: "Featured",
    type: "glasses",
  },
  {
    id: "chopard",
    name: "Chopard",
    category: "Sunglasses",
    price: 7500,
    image: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&auto=format&fit=crop",
    description: "Refined frames with subtle metallic accents — couture for the eyes.",
    type: "glasses",
  },
  {
    id: "noir-arc",
    name: "Noir Arc",
    category: "Eyewear",
    price: 349,
    image: "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=800&auto=format&fit=crop",
    description: "Sleek arched silhouette with matte black finish.",
    type: "glasses",
  },
  {
    id: "luna-edge",
    name: "Luna Edge",
    category: "Eyewear",
    price: 429,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&auto=format&fit=crop",
    description: "Modern edge-cut frames designed for everyday sophistication.",
    type: "glasses",
  },
];

export const allProducts: Product[] = [...watches, ...glasses];

export const findProduct = (id: string) => allProducts.find((p) => p.id === id);

export const formatPrice = (n: number) => `Rs.${n.toLocaleString("en-PK")}`;

export const WHATSAPP_NUMBER = "923344739333";
export const WHATSAPP_DISPLAY = "+92 3344739333";
export const SUPPORT_EMAIL = "abubakarmoeenusmani@gmail.com";

export const whatsappOrderLink = (product: Product) => {
  const msg = `Hi! I want to order ${product.name} from Usmania Vision Co. Price: ${formatPrice(product.price)}. Please confirm availability.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
};
