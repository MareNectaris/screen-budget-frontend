import './Textbox.css';
export const Textbox = ({ value, type, onKeyDown, setText, placeholder }) => {
  return (
    <input
      className="textbox"
      value={value}
      onChange={({ target }) => setText(target.value)}
      type={type}
      onKeyDown={onKeyDown}
      placeholder={placeholder ?? placeholder}
    />
  );
};
