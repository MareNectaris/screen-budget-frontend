import './Button.css';
//variant = contained, text
export const Button = ({ children, variant, onClick, style }) => {
  return (
    <button
      className={`button-main button-${variant}`}
      onClick={() => onClick()}
      style={style}
    >
      {children}
    </button>
  );
};
