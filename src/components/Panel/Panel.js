import './Panel.css';
export const Panel = ({ children, style, className }) => {
  return (
    <div className={`panel-container ${className}`} style={style}>
      <div className="panel-style-main">{children}</div>
    </div>
  );
};
