import "./Panel.css"
export const Panel = ({children}) => {
  return (
    <div className="panel-container">
      <div className="panel-style-main">
        {children}
      </div>
    </div>
  )
}