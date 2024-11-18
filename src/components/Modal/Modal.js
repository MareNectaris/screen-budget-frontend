import "./Modal.css"

export const Modal = ({children, isOpen, setIsOpen}) => {
  return (
    <div>
    {isOpen && 
    <div className="modal-overlay">
      <div className="modal-dialog">
        {children}
      </div>
    </div>}
    </div>
  )
}