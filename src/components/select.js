const options = [
  {
    name: "Порядок: сперва новые",
    value: "newest",
  },
  {
    name: "Порядок: сперва старые",
    value: "older",
  },
  {
    name: "Порядок: сперва дешевле",
    value: "cheaper",
  },
  {
    name: "Порядок: сперва дороже",
    value: "expensive",
  },
];

export default function Select({ onChange }) {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options.map((option, index) => (
        <option value={option.value} key={index}>{option.name}</option>
      ))}
    </select>
  );
}
