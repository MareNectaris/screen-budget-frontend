import './Textbox.css';
export const Textbox = ({ value, onChange }) => {
  return (
    <input
      className="textbox"
      value={value}
      onChange={({ target }) => onChange(target.value)}
    />
  );
};
