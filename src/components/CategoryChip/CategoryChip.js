import "./CategoryChip.css"
export const CategoryChip = ({color, children}) => {
  return (<div style={{background:`${color}`}} className="category-chip">
    {children}
  </div>)
}