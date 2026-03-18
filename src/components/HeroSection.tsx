import { Link } from "react-router-dom";
import { ArrowRight, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-cream">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="grid min-h-[600px] items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Gift className="h-4 w-4" />
              Premium Gifting Experience
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Find the{" "}
              <span className="text-gradient-gold">Perfect Gift</span> for Every
              Moment
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/shop">
                  Explore Gifts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="xl">
                <Link to="/shop?occasion=all">Shop by Occasion</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-background bg-gradient-gold"
                    />
                  ))}
                </div>
                <span>10k+ Happy Customers</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-primary text-primary"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">4.9/5 Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-lg overflow-hidden rounded-3xl shadow-elegant-lg">
              <img
                src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80"
                alt="Beautifully wrapped gift boxes with ribbon"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 rounded-2xl border border-border bg-card p-4 shadow-elegant md:p-6"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-serif text-lg font-semibold text-foreground">
                    Same Day
                  </p>
                  <p className="text-sm text-muted-foreground">Delivery Available</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
