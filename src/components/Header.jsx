import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { count } = useCart();
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="brand">
          Campus Canteen
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end className="nav-link">
            Menu
          </NavLink>
          <NavLink to="/cart" className="nav-link nav-link--cart">
            Cart
            <span className="badge" aria-label={`${count} items in cart`}>
              {count}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
