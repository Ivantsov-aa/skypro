import { useState } from "react";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import TouchEffect from "../touch-effect";
import { clearBasket } from "../../../redux/slices/shoppingBasketSlice";

const formFields = [
  {
    id: "client_name",
    type: "text",
    placeholder: "Имя Фамилия",
  },
  {
    id: "phone_number",
    type: "tel",
    placeholder: "+7 904 000 80 80",
    mask: "+7 000 000 00 00",
  },
  {
    id: "delivery_address",
    type: "text",
    placeholder: "Адрес доставки",
  },
];

export default function CallbackForm({ onSubmit }) {
  const [formValues, setFormValues] = useState({
    client_name: "",
    phone_number: "",
    delivery_address: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const { products } = useSelector((store) => store.shoppingBasket);
  const sum = products
    .map((product) => product.price * product.count)
    .reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formValues.phone_number.replace(/ /gi, "").length !== 12) {
      setFormErrors({
        phone_number: "* номер введён некорректно",
      });
      return;
    }

    onSubmit({ ...formValues, sum: sum, products: products });
    document.querySelector(".shopping-basket").classList.add("disabled");
    document.body.style.overflow = "hidden";
    setFormValues({
      client_name: "",
      phone_number: "",
      delivery_address: "",
    });

    dispatch(clearBasket());
  };

  return (
    <form className="callback-form" onSubmit={handleSubmit}>
      <h2 className="title">Оформление заказа</h2>
      <div className="inputs">
        {formFields.map((field) => (
          <label key={field.id}>
            {field.type === "tel" ? (
              <IMaskInput
                mask={field.mask}
                placeholder={field.placeholder}
                value={formValues[field.id] || ""}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    [field.id]: e.target.value,
                  });

                  setFormErrors({
                    phone_number: "",
                  });
                }}
                required
              />
            ) : (
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={formValues[field.id]}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [field.id]: e.target.value,
                  })
                }
                required
              />
            )}
            {formErrors[field.id] && (
              <p className="error">{formErrors[field.id]}</p>
            )}
          </label>
        ))}
      </div>
      <p className="summary">
        Итого: <span>{sum.toLocaleString("ru-RU") || 0} руб.</span>
      </p>
      <button disabled={!products.length} className="outline">
        Оформить заказ
        <TouchEffect />
      </button>
    </form>
  );
}
