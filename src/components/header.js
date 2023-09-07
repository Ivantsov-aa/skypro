import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BasketPopUp from "./catalog/basket-popup";

const navItems = [
  {
    name: "Каталог",
    path: "/",
  },
  {
    name: "Корзина",
    path: "/basket",
  },
];

export default function Header() {
  const [showBasket, setShowBasket] = useState(false);
  const { products } = useSelector((store) => store.shoppingBasket);
  const productsCount = products
    .map((product) => product.count)
    .reduce((a, b) => a + b, 0);

  return (
    <header>
      <div className="logo">
        <Link to="/">Интерьер.</Link>
      </div>
      <nav>
        <ul>
          {navItems.map((item, index) => (
            <li
              onMouseEnter={() =>
                index === 1 &&
                setTimeout(() => {
                  setShowBasket(true);
                }, 200)
              }
              onMouseLeave={() => index === 1 && setShowBasket(false)}
              key={index}
            >
              {index === 1 && productsCount ? (
                <p className="cart-counter">{productsCount}</p>
              ) : (
                ""
              )}
              <Link to={item.path}>
                <span>{item.name}</span>
                {index === 0 ? <SvgCatalogIcon /> : <SvgBasketIcon />}
              </Link>
              {index === 1 && showBasket && products.length ? (
                <BasketPopUp />
              ) : (
                ""
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

const SvgCatalogIcon = () => {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="5" height="5" fill="white" />
      <rect y="7" width="5" height="5" fill="white" />
      <rect y="14" width="5" height="5" fill="white" />
      <rect x="7" y="7" width="5" height="5" fill="white" />
      <rect x="7" y="14" width="5" height="5" fill="white" />
      <rect x="7" width="5" height="5" fill="white" />
      <rect x="14" y="7" width="5" height="5" fill="white" />
      <rect x="14" y="14" width="5" height="5" fill="white" />
      <rect x="14" width="5" height="5" fill="white" />
    </svg>
  );
};

const SvgBasketIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9752 21C15.5315 21 15.5737 20.4014 15.9671 20.0049C16.3606 19.6083 16.9591 19.5706 16.9591 19.0097C16.9591 18.4489 16.3606 17.416 15.9671 17.0194C15.5737 16.6228 15.5315 17.0194 14.9752 17.0194C14.4188 17.0194 13.3846 16.6228 12.9912 17.0194C12.5978 17.416 12.9912 18.4489 12.9912 19.0097C12.9912 19.5706 12.5978 19.6083 12.9912 20.0049C13.3846 20.4014 14.4188 21 14.9752 21ZM7.03933 21C7.59571 21 8.62986 20.4014 9.02328 20.0049C9.4167 19.6083 9.02328 19.5706 9.02328 19.0097C9.02328 18.4489 9.4167 17.416 9.02328 17.0194C8.62986 16.6228 7.59571 17.0194 7.03933 17.0194C6.48294 17.0194 6.44077 16.6228 6.04735 17.0194C5.65392 17.416 5.05537 18.4489 5.05537 19.0097C5.05537 19.5706 5.65392 19.6083 6.04735 20.0049C6.44077 20.4014 6.48294 21 7.03933 21ZM20.927 6.07276C21.1889 6.06425 21.7368 6.26249 21.919 6.07276C22.1012 5.88303 21.919 5.3417 21.919 5.07761C21.919 4.81352 22.1012 4.27219 21.919 4.08246C21.7368 3.89274 21.1889 4.09098 20.927 4.08246H19.935C18.9889 4.08246 18.1567 5.1423 17.9511 6.07276L15.9671 12.0437C15.7615 12.9741 15.9213 13.0388 14.9752 13.0388H7.03933L5.05537 7.06791H14.9752C15.2345 7.05598 15.7878 7.25716 15.9671 7.06791C16.1465 6.87866 15.9671 6.3345 15.9671 6.07276C15.9671 5.81102 16.1465 5.26686 15.9671 5.07761C15.7878 4.88836 15.2345 5.08954 14.9752 5.07761H5.05537C4.74873 5.07752 4.33899 4.94211 4.06339 5.07761C3.78779 5.21312 3.26011 5.82913 3.07141 6.07276C2.88271 6.3164 3.13497 6.76553 3.07141 7.06791C3.00785 7.3703 2.99694 7.76321 3.07141 8.06306L5.05537 14.034C5.16441 14.474 4.70071 14.75 5.05537 15.0291C5.41003 15.3083 6.58936 15.0292 7.03933 15.0291H14.9752C15.8932 15.0292 16.243 14.613 16.9591 14.034C17.6752 13.4549 17.752 12.947 17.9511 12.0437L19.935 6.07276H20.927Z"
        fill="white"
      />
    </svg>
  );
};
