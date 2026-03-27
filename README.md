# 🎁 Velvet Gifting

**Premium online gifting platform** — elegantly curated gifts for every occasion.

Built with **React 18**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**. Designed as a zero-cost, serverless e-commerce experience with WhatsApp-based checkout.

---

## ✨ Features

### 🛍️ Shopping Experience
- **Product Catalog** — Browse 8 curated gift categories (Flowers, Cakes, Personalized, Food & Treats, Home Decor, Fashion)
- **Occasion Filtering** — Filter by Birthday, Anniversary, Wedding, Corporate, or Just Because
- **Product Search** — Real-time search modal with instant results
- **Product Detail Pages** — Multi-image gallery, quantity selector, and wishlist toggle

### 🎀 Gift Options
- **Gift Toggle** — Mark any order as a gift with a personalized message (200 char limit)
- **Recipient Name** — Add the recipient's name directly on the product page
- **Premium Gift Wrap** — Optional gift wrapping add-on ($5.00 per item)

### 🛒 Cart & Checkout
- **Persistent Cart** — Cart state saved to `localStorage` and restored across sessions
- **Slide-out Cart Drawer** — Quick access cart with quantity controls and item removal
- **Multi-step Checkout** — 3-step wizard: Delivery Details → Delivery Date → Confirm Order
- **WhatsApp Ordering** — Order summary auto-formatted and sent via WhatsApp deep link
- **Confetti Celebration** — Canvas confetti animation on successful order placement

### 🎨 Design & UX
- **Elegant Serif Typography** — Playfair Display headings + Inter body text
- **Gold Gradient Accents** — Premium gradient CTAs and decorative elements
- **Smooth Animations** — Framer Motion page transitions, hover effects, and micro-interactions
- **Fully Responsive** — Mobile-first layout with sticky mobile cart bar
- **SEO Optimized** — `react-helmet-async` for per-page meta tags, titles, and keywords

---

## 🛠️ Tech Stack

| Layer          | Technology                                          |
|----------------|-----------------------------------------------------|
| Framework      | [React 18](https://react.dev) + TypeScript          |
| Build Tool     | [Vite 5](https://vitejs.dev)                        |
| Styling        | [Tailwind CSS 3](https://tailwindcss.com)           |
| UI Components  | [shadcn/ui](https://ui.shadcn.com) (49 components)  |
| Animations     | [Framer Motion](https://www.framer.com/motion/)     |
| Routing        | [React Router 6](https://reactrouter.com)           |
| State          | React Context + `localStorage`                      |
| Icons          | [Lucide React](https://lucide.dev)                  |
| SEO            | [react-helmet-async](https://github.com/staylor/react-helmet-async) |
| Deployment     | [Vercel](https://vercel.com) (zero-config)          |

---

## 📁 Project Structure

```
velvet-gifting/
├── public/
│   └── images/products/       # Product images (8 items)
├── src/
│   ├── components/
│   │   ├── ui/                # 49 shadcn/ui primitives
│   │   ├── Navbar.tsx         # Header with search, cart badge, mobile menu
│   │   ├── HeroSection.tsx    # Landing hero with CTA and trust indicators
│   │   ├── OccasionGrid.tsx   # Shop-by-occasion cards
│   │   ├── FeaturedProducts.tsx # Trending products carousel
│   │   ├── ProductCard.tsx    # Product grid card with quick-add
│   │   ├── CartDrawer.tsx     # Slide-out cart sidebar
│   │   ├── SearchModal.tsx    # Real-time product search overlay
│   │   ├── ValueProps.tsx     # Trust & value proposition section
│   │   └── Footer.tsx         # Site footer with links & socials
│   ├── config/
│   │   └── site.ts            # Brand config (name, WhatsApp number, socials)
│   ├── context/
│   │   └── CartContext.tsx     # Cart state with localStorage persistence
│   ├── data/
│   │   └── products.ts        # Product catalog, occasions, and categories
│   ├── pages/
│   │   ├── Index.tsx           # Landing page
│   │   ├── Shop.tsx            # Product grid with filters & sort
│   │   ├── ProductDetail.tsx   # Single product view with gift options
│   │   ├── Checkout.tsx        # Multi-step checkout → WhatsApp
│   │   ├── TrackOrder.tsx      # Order tracking page
│   │   └── NotFound.tsx        # 404 page
│   ├── App.tsx                 # Root app with providers & routes
│   ├── index.css               # Global styles & CSS variables
│   └── main.tsx                # Entry point
├── vercel.json                 # Vercel SPA rewrite rules
├── tailwind.config.ts          # Extended Tailwind theme (colors, fonts, shadows)
├── vite.config.ts              # Vite config with path aliases
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **bun**

### Installation

```bash
# Clone the repository
git clone https://github.com/MridulMalvi/Velvet-Gifting.git
cd velvet-gifting

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:8080** (or the next available port).

### Build for Production

```bash
npm run build
npm run preview
```

---

## ⚙️ Configuration

All brand details are centralized in `src/config/site.ts`:

```ts
export const siteConfig = {
  name: "Velvet Gifting",
  description: "Premium gifts, elegantly curated for any occasion.",
  contactEmail: "hello@velvetgifting.com",
  whatsappNumber: "1234567890",  // ← Replace with your WhatsApp number
  links: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
  },
};
```

### Theming

Colors and design tokens are defined as CSS variables in `src/index.css`. The Tailwind config in `tailwind.config.ts` extends these with custom gradients, shadows, and font families.

### Adding Products

Edit `src/data/products.ts` to add/modify products. Each product follows this interface:

```ts
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;          // "Flowers" | "Cakes" | "Personalized" | etc.
  occasionTags: string[];    // ["Birthday", "Anniversary", ...]
  imageUrl: string;          // Path relative to /public
  stockCount: number;
  featured?: boolean;        // Show in "Trending" section
}
```

Place product images in `public/images/products/` and reference them as `/images/products/filename.png`.

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — no config needed
4. The included `vercel.json` handles SPA client-side routing

### Other Platforms

Any static hosting (Netlify, Cloudflare Pages, GitHub Pages) works. Just ensure all routes redirect to `index.html` for client-side routing.

---

## 📄 License

This project is private and not licensed for public distribution.
