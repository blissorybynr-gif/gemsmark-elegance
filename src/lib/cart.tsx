import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  id: string;
  slug: string;
  title: string;
  image: string;
  priceUsd: number;
  quantity: number;
  ringSize?: string;
};

type CartContextValue = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotalUsd: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "gemsmark.cart.v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    return {
      lines,
      add: (line, quantity = 1) =>
        setLines((current) => {
          const existing = current.find((l) => l.id === line.id);
          if (existing) {
            return current.map((l) =>
              l.id === line.id ? { ...l, quantity: l.quantity + quantity, ringSize: line.ringSize ?? l.ringSize } : l,
            );
          }
          return [...current, { ...line, quantity }];
        }),
      remove: (id) => setLines((current) => current.filter((l) => l.id !== id)),
      setQuantity: (id, quantity) =>
        setLines((current) =>
          quantity <= 0
            ? current.filter((l) => l.id !== id)
            : current.map((l) => (l.id === id ? { ...l, quantity } : l)),
        ),
      clear: () => setLines([]),
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotalUsd: lines.reduce((sum, l) => sum + l.priceUsd * l.quantity, 0),
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
