import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { Calendar } from '../../components/Calendar/Calendar';
import { CategoryChip } from '../../components/CategoryChip/CategoryChip';
import { FAB } from '../../components/FAB/FAB';
import { Modal } from '../../components/Modal/Modal';
import { Navbar } from '../../components/Navbar/Navbar';
import { Panel } from '../../components/Panel/Panel';
import { ScheduleIndividual } from '../../components/ScheduleIndividual/ScheduleIndividual';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Title } from '../../components/Text/Text';
export const TestPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const schedules = [
    { date: '2024-11-26', contents: '1126' },
    { date: '2024-11-27', contents: '1127' },
  ];

  const handleDateSelected = (date) => {
    setSelectedDate(date);
    const obj = schedules.find((o) => {
      const oDate = new Date(o.date);
      return (
        oDate.getFullYear() === date.getFullYear() &&
        oDate.getMonth() === date.getMonth() &&
        oDate.getDate() === date.getDate()
      );
    });
    setSelectedTimeline(obj?.contents);
  };
  return (
    <div className="App">
      {isSidebarOpen && <Sidebar />}
      <div
        className="flex-col"
        style={{ gap: '12px', flexGrow: 1, padding: '12px' }}
      >
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Panel>
          <Title>Panel Test</Title>
          <div>asdf</div>
        </Panel>
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          asdf
        </Button>
        <CategoryChip color={'#09C06E'}>카테고리</CategoryChip>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          asdf
        </Modal>
        <FAB onClick={() => alert('hi')} />
        <div className="flex-row space-between">
          <Panel style={{ width: '48%', height: '616px' }}>
            <Calendar
              schedules={schedules}
              onDateSelected={handleDateSelected}
            />
          </Panel>
          <Panel style={{ width: '50%', height: '616px' }}>
            {selectedTimeline}

            <ScheduleIndividual
              paymentLocation="구글코리아"
              memo="유튜브 프리미엄"
              amount="-12,900원"
              category="구독비"
              paymentMethod="The Platinum"
            />
            <ScheduleIndividual
              paymentLocation="구글코리아"
              memo="유튜브 프리미엄"
              amount="-12,900원"
              category="구독비"
              paymentMethod="The Platinum"
            />
            <ScheduleIndividual
              paymentLocation="구글코리아"
              memo="유튜브 프리미엄"
              amount="-12,900원"
              category="구독비"
              paymentMethod="The Platinum"
            />
            <ScheduleIndividual
              paymentLocation="구글코리아"
              memo="유튜브 프리미엄"
              amount="-12,900원"
              category="구독비"
              paymentMethod="The Platinum"
            />
            <ScheduleIndividual
              paymentLocation="구글코리아"
              memo="유튜브 프리미엄"
              amount="-12,900원"
              category="구독비"
              paymentMethod="The Platinum"
            />
          </Panel>
        </div>
      </div>
    </div>
  );
};
