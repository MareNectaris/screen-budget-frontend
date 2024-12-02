import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble';
import { Title } from '../Text/Text';
import './Sidebar.css';
export const Sidebar = ({ children, setIsSidebarOpen }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar flex-col" style={{ padding: '12px' }}>
        <div className="flex-row" style={{ alignItems: 'center' }}>
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
