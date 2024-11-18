import "./Button.css"
//variant = contained, text
export const Button = ({children, variant, onClick}) => {
  return (
    <button className={`button-main button-${variant}`} onClick={() => onClick()}>
      {children}
    </button>
  )
}