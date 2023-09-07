import { Route, Routes } from "react-router";
import Header from "./components/header";
import Catalog from "./components/catalog";
import ShoppingBasket from "./components/shopping-basket";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreProducts } from "../redux/slices/shoppingBasketSlice";

export default function App() {
  const {products} = useSelector((store) => store.shoppingBasket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length && localStorage.getItem("products")) {
      dispatch(restoreProducts());
    }
  }, []);

  return (
    <div className="container">
      <Header />
      <Routes>
        <Route index element={<Catalog />} />
        <Route path="/basket" element={<ShoppingBasket />} />
      </Routes>
    </div>
  );
}
