import { useState } from 'react';
import { useParams } from 'react-router';
import { Navbar } from '../../../../components/Navbar/Navbar';
import { Panel } from '../../../../components/Panel/Panel';
import { Sidebar } from '../../../../components/Sidebar/Sidebar';
import {
  SidebarMenuItemPrimary,
  SidebarMenuItemSecondary,
} from '../../../../components/Sidebar/SidebarMenuItem';
import {
  NavbarCurrent,
  NavbarDirectory,
  Title,
} from '../../../../components/Text/Text';
export const Dashboard = () => {
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
        <div className="flex-row">
          <Panel style={{ flex: 1 }}>
            <Title>브리핑</Title>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                gridGap: '16px',
              }}
            >
              <div>이번 달 지출</div>
              <div>qwer</div>
            </div>
          </Panel>
        </div>
        <div className="flex-1">
          <div
            style={{
              height: '100%',
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              gridGap: '16px',
            }}
          >
            <Panel style={{ flex: 1 }}>
              <Title>타임라인</Title>
            </Panel>
            <Panel>
              <Title>경제 뉴스</Title>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};
