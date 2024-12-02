import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
export const Navbar = ({ children, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div className="navbar">
      {!isSidebarOpen && (
        <MenuIcon
          style={{ cursor: 'pointer', paddingRight: '16px' }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <div className="flex-row" style={{ gap: '8px' }}>
        {children}
      </div>
    </div>
  );
};
