import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../../redux/slices/shoppingBasketSlice";

export default function BasketPopUp() {
  const { products } = useSelector((store) => store.shoppingBasket);
  const dispatch = useDispatch();

  return (
    <section className="basket-popup">
      {products.map((product) => (
        <div className="basket-popup__product" key={product.id}>
          <div className="preview">
            <img src={product.preview} alt="skypro" />
          </div>
          <div className="description">
            <h2 className="title">
              {product.title}
              {product.count > 1 ? ` (x ${product.count})` : ""}
            </h2>
            <p className="text">{product.text}</p>
            <p className="price">
              {product.price.toLocaleString("ru-RU")} руб.
            </p>
            <div className="controls-group">
              <button>Избранное</button>
              <button onClick={() => dispatch(removeFromCart(product))}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
