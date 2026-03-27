# Velvet Gifting - Premium E-Commerce Platform

Velvet Gifting is a high-end, fully functional e-commerce platform built with a modern frontend stack. It features a sophisticated "Zero-Cost Architecture" that leverages local state for cart management and routes final orders directly to business owners via WhatsApp.

## 🚀 Tech Stack

-   **Framework:** [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Routing:** [React Router Dom v6](https://reactrouter.com/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
-   **State Management:** [TanStack Query](https://tanstack.com/query/latest) & React Context API
-   **Animations:** [Framer Motion](https://www.framer.com/motion/) & [Canvas Confetti](https://github.com/catdad/canvas-confetti)
-   **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)

## ✨ Key Features

-   **Modern UI/UX:** Clean, elegant design using Radix UI primitives.
-   **Dynamic Shop:** Advanced filtering by occasion, category, and price range with real-time sorting.
-   **Gifting Personalization:** Built-in options for recipient names, custom gift messages (200-character limit), and premium gift wrapping.
-   **Zero-Cost Checkout:** A multi-step checkout process that collects delivery details and generates a formatted WhatsApp order message.
-   **Order Tracking:** A dedicated tracking interface to visualize gift delivery progress.
-   **Persistent Cart:** Local cart management via `CartProvider` to ensure a seamless shopping experience.

## 🛠️ Project Structure & Routing

The application utilizes a centralized routing system defined in `src/App.tsx`:

| Path | Component | Description |
| :--- | :--- | :--- |
| `/` | `Index` | Home page and landing experience. |
| `/shop` | `Shop` | Product catalog with filtering and search. |
| `/product/:id` | `ProductDetail` | Individual product view with gifting options. |
| `/checkout` | `Checkout` | Delivery details and WhatsApp order routing. |
| `/track` | `TrackOrder` | Real-time order status visualization. |

## ⚙️ Configuration

Brand identity and contact information are managed globally to allow for easy white-labeling.

**File:** `src/config/site.ts`
```typescript
export const siteConfig = {
  name: "Velvet Gifting",
  description: "Premium gifts, elegantly curated for any occasion.",
  contactEmail: "hello@velvetgifting.com",
  whatsappNumber: "1234567890", // Final orders are routed here
  links: {
    instagram: "[https://instagram.com](https://instagram.com)",
    facebook: "[https://facebook.com](https://facebook.com)",
    twitter: "[https://twitter.com](https://twitter.com)",
  },
};
