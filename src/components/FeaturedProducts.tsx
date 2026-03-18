import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import { products } from "@/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section className="bg-secondary/30 py-16 md:py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Trending <span className="text-gradient-gold">Gifts</span>
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Our most loved gifts, hand-picked by our team of gifting experts.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/shop">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="mt-8 -mx-6 overflow-x-auto px-6 pb-4 md:mx-0 md:overflow-visible md:px-0">
          <div className="flex gap-6 md:grid md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-72 flex-shrink-0 md:w-auto"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
