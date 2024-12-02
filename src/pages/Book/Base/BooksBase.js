import { useState } from 'react';
import { Outlet, useParams } from 'react-router';
import { Navbar } from '../../../components/Navbar/Navbar';
import { Sidebar } from '../../../components/Sidebar/Sidebar';
import {
  SidebarMenuItemPrimary,
  SidebarMenuItemSecondary,
} from '../../../components/Sidebar/SidebarMenuItem';
import { NavbarCurrent, NavbarDirectory } from '../../../components/Text/Text';
export const BooksBase = () => {
  const { bookUuid } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [majorCategory, setMajorCategory] = useState('');
  const [minorCategory, setMinorCategory] = useState('');
  return (
    <div className="App">
      {isSidebarOpen && (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen}>
          <SidebarMenuItemPrimary expandable="true" text="Expandable">
            <SidebarMenuItemSecondary>child</SidebarMenuItemSecondary>
          </SidebarMenuItemPrimary>
        </Sidebar>
      )}
      <div
        className="flex-col"
        style={{ gap: '12px', flexGrow: 1, padding: '12px' }}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <NavbarDirectory>{majorCategory}</NavbarDirectory>
          <NavbarDirectory>/</NavbarDirectory>
          <NavbarCurrent>{minorCategory}</NavbarCurrent>
        </Navbar>

        <Outlet context={{ setMajorCategory, setMinorCategory }} />
      </div>
    </div>
  );
};
