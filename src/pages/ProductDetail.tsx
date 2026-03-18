import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ChevronLeft,
  Gift,
  ShoppingBag,
  Heart,
  Truck,
  Package,
  Minus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { toast } = useToast();

  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [hasGiftWrap, setHasGiftWrap] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock multiple images
  const images = product
    ? [
        product.imageUrl,
        product.imageUrl.replace("w=600", "w=601"),
        product.imageUrl.replace("w=600", "w=602"),
      ]
    : [];

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="container py-16 text-center">
          <h1 className="font-serif text-2xl font-bold">Product not found</h1>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/shop">Back to Shop</Link>
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem(product, {
      quantity,
      isGift,
      giftMessage: isGift ? giftMessage : undefined,
      recipientName: isGift ? recipientName : undefined,
      hasGiftWrap,
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const totalPrice =
    product.price * quantity + (hasGiftWrap ? 5 * quantity : 0);

  return (
    <>
      <Helmet>
        <title>{product.name} | GiftVelvet</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <Navbar />

      <main className="min-h-screen bg-background pb-32 md:pb-16">
        <div className="container py-8">
          {/* Breadcrumb */}
          <Link
            to="/shop"
            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back to Shop
          </Link>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="aspect-square overflow-hidden rounded-2xl border border-border bg-card">
                <motion.img
                  key={selectedImage}
                  src={images[selectedImage]}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`h-20 w-20 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {product.occasionTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 font-serif text-3xl font-bold text-foreground md:text-4xl">
                {product.name}
              </h1>

              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.stockCount > 0
                    ? `${product.stockCount} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <Label className="text-sm font-medium">Quantity</Label>
                <div className="mt-2 flex w-fit items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 transition-colors hover:bg-secondary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 transition-colors hover:bg-secondary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Gift Options */}
              <div className="mt-8 rounded-xl border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gift className="h-5 w-5 text-primary" />
                    <span className="font-medium text-foreground">
                      Is this a gift?
                    </span>
                  </div>
                  <Switch checked={isGift} onCheckedChange={setIsGift} />
                </div>

                {isGift && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <Label htmlFor="recipientName">Recipient Name</Label>
                      <Input
                        id="recipientName"
                        placeholder="Enter recipient's name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="giftMessage">Gift Message</Label>
                      <Textarea
                        id="giftMessage"
                        placeholder="Write a heartfelt message..."
                        value={giftMessage}
                        onChange={(e) =>
                          setGiftMessage(e.target.value.slice(0, 200))
                        }
                        className="mt-2 resize-none"
                        rows={3}
                      />
                      <p className="mt-1 text-right text-xs text-muted-foreground">
                        {giftMessage.length}/200 characters
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="mt-6 flex items-center space-x-3">
                  <Checkbox
                    id="giftWrap"
                    checked={hasGiftWrap}
                    onCheckedChange={(checked) =>
                      setHasGiftWrap(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="giftWrap"
                    className="flex items-center gap-2 text-sm"
                  >
                    <Package className="h-4 w-4 text-primary" />
                    Add Premium Gift Wrap (+$5.00)
                  </Label>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stockCount === 0}
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart — ${totalPrice.toFixed(2)}
                </Button>
                <Button variant="outline" size="xl">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="mt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-primary" />
                  Same-day delivery available
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  Premium packaging included
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile sticky bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/95 p-4 backdrop-blur-lg md:hidden">
          <Button
            variant="hero"
            size="lg"
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stockCount === 0}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart — ${totalPrice.toFixed(2)}
          </Button>
        </div>
      </main>

      <Footer />
      <CartDrawer />
    </>
  );
}
