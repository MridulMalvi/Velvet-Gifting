import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Filter, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { products, categories, occasions } from "@/data/products";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const occasionParam = searchParams.get("occasion");
  const filterParam = searchParams.get("filter");
  const sortParam = searchParams.get("sort") || "popular";

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by occasion
    if (occasionParam && occasionParam !== "all") {
      result = result.filter((p) =>
        p.occasionTags.some(
          (tag) => tag.toLowerCase().replace(" ", "-") === occasionParam
        )
      );
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by price
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Filter featured
    if (filterParam === "featured") {
      result = result.filter((p) => p.featured);
    }

    // Sort
    switch (sortParam) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.reverse();
        break;
      case "popular":
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [occasionParam, filterParam, sortParam, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 200]);
    setSearchParams({});
  };

  const activeFiltersCount =
    (selectedCategory ? 1 : 0) +
    (occasionParam && occasionParam !== "all" ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 200 ? 1 : 0);

  const currentOccasion = occasions.find((o) => o.id === occasionParam);

  return (
    <>
      <Helmet>
        <title>
          {currentOccasion
            ? `${currentOccasion.name} Gifts`
            : "Shop All Gifts"}{" "}
          | GiftVelvet
        </title>
        <meta
          name="description"
          content="Browse our curated collection of premium gifts. Filter by occasion, category, and price to find the perfect present."
        />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pb-16">
        {/* Header */}
        <div className="border-b border-border bg-secondary/30">
          <div className="container py-8 md:py-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-3xl font-bold text-foreground md:text-4xl"
            >
              {currentOccasion ? (
                <>
                  <span className="text-gradient-gold">
                    {currentOccasion.name}
                  </span>{" "}
                  Gifts
                </>
              ) : filterParam === "featured" ? (
                <>
                  <span className="text-gradient-gold">Best</span> Sellers
                </>
              ) : (
                <>
                  All <span className="text-gradient-gold">Gifts</span>
                </>
              )}
            </motion.h1>
            <p className="mt-2 text-muted-foreground">
              {filteredProducts.length} products available
            </p>
          </div>
        </div>

        <div className="container py-8">
          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-foreground text-xs text-primary">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="mr-1 h-4 w-4" />
                  Clear all
                </Button>
              )}
            </div>

            <Select
              value={sortParam}
              onValueChange={(value) =>
                setSearchParams((prev) => {
                  prev.set("sort", value);
                  return prev;
                })
              }
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popular</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-8 flex gap-8">
            {/* Sidebar Filters */}
            <AnimatePresence>
              {(showFilters || window.innerWidth >= 1024) && (
                <motion.aside
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`${
                    showFilters
                      ? "fixed inset-0 z-50 bg-background p-6 lg:relative lg:inset-auto lg:z-auto lg:bg-transparent lg:p-0"
                      : "hidden lg:block"
                  } w-full lg:w-64 lg:flex-shrink-0`}
                >
                  <div className="flex items-center justify-between lg:hidden">
                    <h2 className="font-serif text-xl font-semibold">Filters</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="mt-6 space-y-8 lg:mt-0">
                    {/* Price Range */}
                    <div>
                      <h3 className="font-medium text-foreground">
                        Price Range
                      </h3>
                      <div className="mt-4">
                        <Slider
                          value={priceRange}
                          onValueChange={(value) =>
                            setPriceRange(value as [number, number])
                          }
                          min={0}
                          max={200}
                          step={10}
                          className="mt-2"
                        />
                        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}+</span>
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <h3 className="font-medium text-foreground">Category</h3>
                      <div className="mt-4 space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() =>
                              setSelectedCategory(
                                selectedCategory === category ? null : category
                              )
                            }
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              selectedCategory === category
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Occasions */}
                    <div>
                      <h3 className="font-medium text-foreground">Occasion</h3>
                      <div className="mt-4 space-y-2">
                        {occasions.map((occasion) => (
                          <button
                            key={occasion.id}
                            onClick={() =>
                              setSearchParams((prev) => {
                                if (occasionParam === occasion.id) {
                                  prev.delete("occasion");
                                } else {
                                  prev.set("occasion", occasion.id);
                                }
                                return prev;
                              })
                            }
                            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                              occasionParam === occasion.id
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                          >
                            {occasion.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 lg:hidden">
                    <Button
                      variant="hero"
                      className="w-full"
                      onClick={() => setShowFilters(false)}
                    >
                      Show {filteredProducts.length} Products
                    </Button>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <p className="text-lg font-medium text-foreground">
                    No products found
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    Try adjusting your filters
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={clearFilters}
                  >
                    Clear filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
