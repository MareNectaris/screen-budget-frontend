import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useState } from 'react';
import './SidebarMenuItem.css';
export const SidebarMenuItemPrimary = ({
  children,
  expandable,
  type,
  text,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div
      className={`sidebar-menu-item-primary flex-col`}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="flex-row"
        style={{ alignItems: 'center' }}
        onClick={() => {
          if (expandable) {
            setExpanded(!expanded);
          } else {
            onClick();
          }
        }}
      >
        {expandable && expanded ? (
          <ExpandLessIcon />
        ) : expandable && expanded === false ? (
          <ExpandMoreIcon />
        ) : null}
        {type === 'newspaper' ? (
          <NewspaperIcon />
        ) : type === 'profile' ? (
          <AccountBoxIcon />
        ) : type === 'news' ? (
          <NewspaperIcon />
        ) : (
          (type === 'add' ?? <AddIcon />)
        )}
        <div className="flex-1">{text}</div>
      </div>
      <div className="flex-col" style={{ paddingLeft: '8px' }}>
        {expandable && expanded && children && children}
      </div>
    </div>
  );
};

export const SidebarMenuItemSecondary = ({ children, highlighted }) => {
  return (
    <div
      className={`sidebar-menu-item-secondary ${highlighted && 'item-secondary-highlighted'}`}
    >
      {children}
    </div>
  );
};
