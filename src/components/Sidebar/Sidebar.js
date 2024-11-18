import "./Sidebar.css"

export const Sidebar = ({children, isOpen}) => {
  return (
    <div className="sidebar-container">
    {isOpen&&
    <div className="sidebar">
      {children}
    </div>
    }
    </div>
  )
}