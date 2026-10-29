import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ItemPage({ menu, loading, error, favourites, onToggleFavourite }) {
  const { id } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (loading) return <p className="notice" role="status">Loading dish…</p>;
  if (error) return <p className="notice notice--error" role="alert">Could not load the menu ({error}).</p>;

  const item = menu.items.find((i) => String(i.id) === id);
  if (!item)
    return (
      <div className="notice">
        <p>We couldn't find that dish.</p>
        <Link to="/" className="btn">Back to menu</Link>
      </div>
    );

  const isFav = favourites.includes(item.id);

  const handleAdd = () => {
    addItem(item, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="detail">
      <Link to="/" className="back">← Back to menu</Link>
      <div className="detail__layout">
        <div className="detail__art" aria-hidden="true">{item.emoji}</div>
        <div className="detail__info">
          <p className="card__cat">{item.category}</p>
          <h1>{item.name}</h1>
          <p className="detail__desc">{item.description}</p>
          <dl className="facts">
            <div><dt>Price</dt><dd>Rs {item.price}</dd></div>
            <div><dt>Calories</dt><dd>{item.calories} kcal</dd></div>
            <div><dt>Ready in</dt><dd>{item.prepTime}</dd></div>
          </dl>
          {item.tags.length > 0 && (
            <ul className="tags">
              {item.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          )}
          <div className="detail__actions">
            <div className="qty" role="group" aria-label="Quantity">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button type="button" className="btn" onClick={handleAdd}>
              Add to cart · Rs {item.price * qty}
            </button>
            <button
              type="button"
              className={`btn btn--ghost ${isFav ? "btn--fav" : ""}`}
              aria-pressed={isFav}
              onClick={() => onToggleFavourite(item.id)}
            >
              {isFav ? "♥ Favourite" : "♡ Favourite"}
            </button>
          </div>
          <p className="added" role="status">{added ? "Added to your cart." : ""}</p>
        </div>
      </div>
    </article>
  );
}
