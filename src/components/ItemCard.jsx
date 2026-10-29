import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function ItemCard({ item, isFavourite, onToggleFavourite }) {
  const { addItem, qtyOf } = useCart();
  const inCart = qtyOf(item.id);

  return (
    <article className="card">
      <div className="card__art" aria-hidden="true">
        {item.emoji}
      </div>
      <button
        type="button"
        className={`fav ${isFavourite ? "fav--on" : ""}`}
        onClick={() => onToggleFavourite(item.id)}
        aria-pressed={isFavourite}
        aria-label={isFavourite ? `Remove ${item.name} from favourites` : `Add ${item.name} to favourites`}
      >
        {isFavourite ? "♥" : "♡"}
      </button>
      <div className="card__body">
        <p className="card__cat">{item.category}</p>
        <h3 className="card__title">
          <Link to={`/item/${item.id}`}>{item.name}</Link>
        </h3>
        <p className="card__desc">{item.description}</p>
        <div className="card__foot">
          <span className="price">Rs {item.price}</span>
          <button type="button" className="btn" onClick={() => addItem(item)}>
            {inCart ? `Add another (${inCart})` : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}
