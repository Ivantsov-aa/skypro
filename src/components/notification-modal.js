import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function NotificationModal({
  client_name,
  phone_number,
  delivery_address,
  sum,
  products,
  onClose,
}) {
  const modalRef = useRef();
  useEffect(() => {
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <section className="modal" ref={modalRef}>
      <button className="modal__close-btn" onClick={onClose}>
        <SvgCloseIcon />
      </button>
      <h2>{client_name}, Ваш заказ принят!</h2>
      <p>Контактный номер телефона: {phone_number}</p>
      <p>Адрес доставки: {delivery_address}</p>
      <p>Ваш заказ:</p>
      <ol>
        {products.map((product) => (
          <li key={product.id}>{product.title} x{product.count}</li>
        ))}
      </ol>
      <h3>Сумма заказа: {sum.toLocaleString("ru-RU")} руб.</h3>
      <Link to="/" className="full">
        Вернуться к покупкам
      </Link>
    </section>
  );
}

const SvgCloseIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 4L20 20"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 20L20 4"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
