import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-elegant">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Overlay actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-charcoal/60 to-transparent p-4"
          >
            <Button
              variant="hero"
              size="sm"
              className="w-full"
              onClick={handleQuickAdd}
            >
              <Plus className="mr-1 h-4 w-4" />
              Quick Add
            </Button>
          </motion.div>

          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="absolute right-3 top-3 rounded-full bg-background/80 p-2 backdrop-blur-sm transition-colors hover:bg-background"
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isWishlisted
                  ? "fill-destructive text-destructive"
                  : "text-muted-foreground"
              }`}
            />
          </button>

          {/* Tags */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-2">
            {product.featured && (
              <span className="rounded-full bg-gradient-gold px-3 py-1 text-xs font-semibold text-primary-foreground">
                Trending
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex flex-wrap gap-1">
            {product.occasionTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="mt-2 font-serif text-lg font-semibold text-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
