import ItemCard from "./ItemCard.jsx";

export default function MenuList({ items, favourites, onToggleFavourite }) {
  if (items.length === 0) {
    return <p className="notice">No dishes match your search. Try another word or category.</p>;
  }
  return (
    <ul className="grid">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            item={item}
            isFavourite={favourites.includes(item.id)}
            onToggleFavourite={onToggleFavourite}
          />
        </li>
      ))}
    </ul>
  );
}
