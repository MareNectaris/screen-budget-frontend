import './Textbox.css';
export const Textbox = ({
  value,
  type,
  onKeyDown,
  setText,
  placeholder,
  className,
  style,
}) => {
  return (
    <input
      className={`textbox ${className}`}
      style={style}
      value={value}
      onChange={({ target }) => setText(target.value)}
      type={type}
      onKeyDown={onKeyDown}
      placeholder={placeholder ?? placeholder}
    />
  );
};
