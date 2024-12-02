import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';
import { useParams } from 'react-router';
import { Line } from '../../../../components/Line/Line';
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
          <Panel className="flex-1">
            <Title>브리핑</Title>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto',
                gridGap: '16px',
                paddingTop: '12px',
              }}
            >
              <div className="flex-col" style={{ gap: '8px' }}>
                <div className="flex-row flex-center pointer">
                  <div className="regular text-24px flex-1">이번 달 지출</div>
                  <div className="flex-row flex-center">
                    <div className="bold text-36px">100,000원</div>
                    <NavigateNextIcon />
                  </div>
                </div>
                <Line />
                <div className="flex-row flex-center pointer">
                  <div className="regular text-24px flex-1">오늘의 지출</div>
                  <div className="flex-row flex-center">
                    <div className="bold text-32px">100,000원</div>
                    <NavigateNextIcon />
                  </div>
                </div>
                <Line />
                <div className="flex-row flex-center pointer">
                  <div className="regular text-24px flex-1">
                    오늘의 금융 일정
                  </div>
                  <div className="flex-row flex-center">
                    <div className="bold text-32px">2건</div>
                    <NavigateNextIcon />
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <div className="flex-row flex-center pointer">
                  <div className="regular text-24px flex-1">이번 달 지출</div>
                  <div className="flex-row flex-center">
                    <div className="bold text-36px">100,000원</div>
                    <NavigateNextIcon />
                  </div>
                </div>
              </div>
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
            <Panel>
              <div className="flex-row flex-center pointer">
                <Title className="flex-1">타임라인</Title>
                <NavigateNextIcon />
              </div>
            </Panel>
            <Panel>
              <div className="flex-row flex-center pointer">
                <Title className="flex-1">경제 뉴스</Title>
                <NavigateNextIcon />
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
};
