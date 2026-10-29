import { useState } from "react";
import MenuList from "../components/MenuList.jsx";

export default function MenuPage({ menu, loading, error, favourites, onToggleFavourite }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [onlyFav, setOnlyFav] = useState(false);

  if (loading) return <p className="notice" role="status">Loading today's menu…</p>;
  if (error)
    return (
      <p className="notice notice--error" role="alert">
        Could not load the menu ({error}). Please refresh the page.
      </p>
    );

  const categories = ["All", ...new Set(menu.items.map((i) => i.category))];

  const visible = menu.items.filter((i) => {
    const matchSearch = i.name.toLowerCase().includes(search.trim().toLowerCase());
    const matchCat = category === "All" || i.category === category;
    const matchFav = !onlyFav || favourites.includes(i.id);
    return matchSearch && matchCat && matchFav;
  });

  return (
    <>
      <section className="hero">
        <h1>{menu.date}</h1>
        <p>Pick your food, add it to the cart and pay at the counter.</p>
      </section>

      <section className="filters" aria-label="Filter menu">
        <label className="search">
          <span className="sr-only">Search dishes</span>
          <input
            type="search"
            placeholder="Search dishes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="chips" role="group" aria-label="Category">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              className={`chip ${category === c ? "chip--on" : ""}`}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="check">
          <input type="checkbox" checked={onlyFav} onChange={(e) => setOnlyFav(e.target.checked)} />
          Favourites only
        </label>
      </section>

      <MenuList items={visible} favourites={favourites} onToggleFavourite={onToggleFavourite} />
    </>
  );
}
