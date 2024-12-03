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
          <SidebarMenuItemPrimary expandable="true" text="개인 가계부">
            <SidebarMenuItemSecondary highlighted>
              대시보드
            </SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>
              타임라인 및 캘린더
            </SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>테이블</SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>금융 일정</SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>통계 보기</SidebarMenuItemSecondary>
            <SidebarMenuItemSecondary>가계부 설정</SidebarMenuItemSecondary>
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
