import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import MenuPage from "./pages/MenuPage.jsx";
import ItemPage from "./pages/ItemPage.jsx";
import CartPage from "./pages/CartPage.jsx";

export default function App() {
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [favourites, setFavourites] = useState([]); // array of item ids

  // Load the menu from the local JSON file in /public
  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${import.meta.env.BASE_URL}menu.json`);
        if (!res.ok) throw new Error(`Server replied ${res.status}`);
        const data = await res.json();
        setMenu(data);
      } catch (err) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  const toggleFavourite = (id) =>
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );

  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route
            path="/"
            element={
              <MenuPage
                menu={menu}
                loading={loading}
                error={error}
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
              />
            }
          />
          <Route
            path="/item/:id"
            element={
              <ItemPage
                menu={menu}
                loading={loading}
                error={error}
                favourites={favourites}
                onToggleFavourite={toggleFavourite}
              />
            }
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="*"
            element={<p className="notice">Page not found. Go back to the menu.</p>}
          />
        </Routes>
      </main>
    </>
  );
}
