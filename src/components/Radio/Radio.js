import './Radio.css';
export const Radio = ({ name, value, children, checked, handleChange }) => {
  const handleRadioChange = (e) => {
    const { value } = e.currentTarget;
    handleChange(value);
  };
  return (
    <div>
      <label className="radio">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={handleRadioChange}
        />
        <span>{children}</span>
      </label>
    </div>
  );
};
