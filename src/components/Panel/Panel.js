import './Panel.css';
export const Panel = ({ children, style }) => {
  return (
    <div className="panel-container" style={style}>
      <div className="panel-style-main">{children}</div>
    </div>
  );
};
