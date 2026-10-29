import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Cart() {
  const { lines, total, count, setQty, removeItem, clearCart } = useCart();

  if (lines.length === 0) {
    return (
      <div className="notice">
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">Browse the menu</Link>
      </div>
    );
  }

  return (
    <section className="cart" aria-labelledby="cart-title">
      <ul className="cart__lines">
        {lines.map(({ item, qty }) => (
          <li key={item.id} className="cart__line">
            <span className="cart__emoji" aria-hidden="true">{item.emoji}</span>
            <div className="cart__info">
              <Link to={`/item/${item.id}`}>{item.name}</Link>
              <span className="muted">Rs {item.price} each</span>
            </div>
            <div className="qty" role="group" aria-label={`Quantity of ${item.name}`}>
              <button type="button" onClick={() => setQty(item.id, qty - 1)} aria-label="Decrease quantity">−</button>
              <span aria-live="polite">{qty}</span>
              <button type="button" onClick={() => setQty(item.id, qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <strong className="cart__sub">Rs {item.price * qty}</strong>
            <button type="button" className="link-btn" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart__summary">
        <p>{count} {count === 1 ? "item" : "items"}</p>
        <p className="cart__total">Total <strong>Rs {total}</strong></p>
        <div className="cart__actions">
          <button type="button" className="btn btn--ghost" onClick={clearCart}>Clear cart</button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              alert(`Order placed! Total: Rs ${total}`);
              clearCart();
            }}
          >
            Place order
          </button>
        </div>
      </div>
    </section>
  );
}
