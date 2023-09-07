import Select from "./select";
import goods from "../data/catalog-items.json";
import CatalogCart from "./catalog/catalog-cart";
import { useEffect, useState } from "react";

const getSortedProducts = (array, value) => {
  switch (value) {
    case "cheaper":
      return array.sort((a, b) => a.price - b.price);
    case "expensive":
      return array.sort((a, b) => b.price - a.price);
    default:
      return array;
  }
};

export default function Catalog() {
  const [sortValue, setSortValue] = useState("");

  return (
    <main className="catalog">
      <Select onChange={setSortValue} />
      <section className="catalog__container">
        {getSortedProducts(goods.items, sortValue).map((item, index) => (
          <CatalogCart cart={item} key={index} />
        ))}
      </section>
    </main>
  );
}
