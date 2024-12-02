import './Sidebar.css';

export const Sidebar = ({ children }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">{children}</div>
    </div>
  );
};
