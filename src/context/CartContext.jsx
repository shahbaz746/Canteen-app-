import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

// Cart state lives here, so the header, menu cards, item page and cart page
// all read the same data and update together without a reload.
export function CartProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ item, qty }]

  const addItem = (item, qty = 1) =>
    setLines((prev) => {
      const found = prev.find((l) => l.item.id === item.id);
      if (found) {
        return prev.map((l) =>
          l.item.id === item.id ? { ...l, qty: l.qty + qty } : l
        );
      }
      return [...prev, { item, qty }];
    });

  const setQty = (id, qty) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.item.id !== id)
        : prev.map((l) => (l.item.id === id ? { ...l, qty } : l))
    );

  const removeItem = (id) =>
    setLines((prev) => prev.filter((l) => l.item.id !== id));

  const clearCart = () => setLines([]);

  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const total = lines.reduce((sum, l) => sum + l.qty * l.item.price, 0);
  const qtyOf = (id) => lines.find((l) => l.item.id === id)?.qty ?? 0;

  return (
    <CartContext.Provider
      value={{ lines, count, total, qtyOf, addItem, setQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
