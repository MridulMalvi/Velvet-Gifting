import { useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, Gift, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const navigate = useNavigate();
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    giftWrapTotal,
    total,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-serif text-xl">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-secondary p-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">
              Your cart is empty
            </p>
            <p className="text-sm text-muted-foreground">
              Find the perfect gift for someone special
            </p>
            <Button onClick={() => setIsCartOpen(false)} variant="hero">
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="mb-4 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                      <div className="flex flex-1 flex-col">
                        <h4 className="font-medium text-foreground line-clamp-1">
                          {item.product.name}
                        </h4>
                        <p className="text-sm font-semibold text-primary">
                          ${item.product.price.toFixed(2)}
                        </p>

                        {item.hasGiftWrap && (
                          <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                            <Gift className="h-3 w-3" />
                            Gift Wrapped (+$5.00)
                          </div>
                        )}

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2 rounded-lg border border-border">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 transition-colors hover:bg-secondary"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 transition-colors hover:bg-secondary"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {item.isGift && item.giftMessage && (
                      <div className="mt-3 rounded-lg bg-secondary/50 p-3">
                        <p className="text-xs font-medium text-muted-foreground">
                          Gift Message:
                        </p>
                        <p className="mt-1 text-sm italic text-foreground">
                          "{item.giftMessage}"
                        </p>
                        {item.recipientName && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            To: {item.recipientName}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="border-t border-border pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {giftWrapTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gift Wrapping</span>
                    <span className="font-medium">
                      ${giftWrapTotal.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-border pt-2 text-base">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                variant="hero"
                size="lg"
                className="mt-4 w-full"
              >
                Proceed to Checkout
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
