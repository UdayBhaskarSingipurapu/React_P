import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Product({ id, image, title, price, description }) {
  const { addItem } = useContext(CartContext);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <h3>{title}</h3>
        <p>${price}</p>
        <p>{description}</p>
        <p className="product-actions">
          <button onClick={() => addItem(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
