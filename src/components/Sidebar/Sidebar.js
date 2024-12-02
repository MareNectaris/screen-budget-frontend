import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble';
import { Title } from '../Text/Text';
import './Sidebar.css';
export const Sidebar = ({ children, setIsSidebarOpen }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar flex-col">
        <div
          className="flex-row"
          style={{ padding: '12px', alignItems: 'center' }}
        >
          <Title style={{ flex: 1 }}>Screen Budget</Title>
          <UnfoldLessDoubleIcon
            style={{ cursor: 'pointer' }}
            onClick={() => setIsSidebarOpen(false)}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
