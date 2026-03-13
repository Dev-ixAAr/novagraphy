"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
};

interface CartContextType {
  isOpen: boolean;
  toggleCart: () => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CART_STORAGE_KEY = "novagraphy-cart";

/** Read cart from localStorage (returns [] if empty/invalid/SSR) */
function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    
    // Migrate old cart items that don't have productId field
    return parsed.map((item: any) => {
      if (!item.productId && item.id) {
        // Extract productId from composite ID (productId-color-size)
        const productId = item.id.split('-')[0];
        return { ...item, productId };
      }
      return item;
    });
  } catch {
    return [];
  }
}

/** Write cart to localStorage */
function saveCartToStorage(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Hydrate cart from localStorage on first client mount
  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setHydrated(true);
  }, []);

  // ✅ Persist cart to localStorage whenever it changes (after hydration)
  useEffect(() => {
    if (hydrated) {
      saveCartToStorage(cartItems);
    }
  }, [cartItems, hydrated]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setIsOpen(true); // Open drawer on add
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = useCallback(() => {
    setCartItems([]);
    // Also immediately remove from storage so it's gone on next reload
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ isOpen, toggleCart, cartItems, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};