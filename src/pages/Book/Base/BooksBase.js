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
          <NavbarDirectory>개인 가계부</NavbarDirectory>
          <NavbarDirectory>/</NavbarDirectory>
          <NavbarCurrent>대시보드</NavbarCurrent>
        </Navbar>

        <Outlet />
      </div>
    </div>
  );
};
