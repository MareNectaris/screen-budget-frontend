import './Textbox.css';
export const Textbox = ({ value, onChange, type, onKeyDown }) => {
  return (
    <input
      className="textbox"
      value={value}
      onChange={({ target }) => onChange(target.value)}
      type={type}
      onKeyDown={onKeyDown}
    />
  );
};
