import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  isGift: boolean;
  giftMessage?: string;
  recipientName?: string;
  hasGiftWrap: boolean;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, options?: Partial<Omit<CartItem, "product">>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  giftWrapTotal: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const GIFT_WRAP_PRICE = 5.00;
const CART_STORAGE_KEY = "velvet-gifting-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load cart from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to local storage:", error);
    }
  }, [items]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback((product: Product, options?: Partial<Omit<CartItem, "product">>) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += options?.quantity || 1;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity: options?.quantity || 1,
          isGift: options?.isGift || false,
          giftMessage: options?.giftMessage,
          recipientName: options?.recipientName,
          hasGiftWrap: options?.hasGiftWrap || false,
        },
      ];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const giftWrapTotal = items.reduce(
    (sum, item) => sum + (item.hasGiftWrap ? GIFT_WRAP_PRICE * item.quantity : 0),
    0
  );

  const total = subtotal + giftWrapTotal;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        giftWrapTotal,
        total,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
