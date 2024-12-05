import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Calendar } from '../../../../components/Calendar/Calendar';
import { Panel } from '../../../../components/Panel/Panel';
import { authState } from '../../../../store/Auth';

export const TimelineAndCalendar = () => {
  const { bookUuid } = useParams();
  const getKSTDate = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = kstDate.getUTCMonth() + 1;
    const d = kstDate.getUTCDate();
    return [y, m, d];
  };
  const [selectedYear, setSelectedYear] = useState(getKSTDate(new Date())[0]);
  const [selectedMonth, setSelectedMonth] = useState(getKSTDate(new Date())[1]);
  const [transactionsOnSelectedMonth, setTransactionsOnSelectedMonth] =
    useState([]);
  const auth = useRecoilValue(authState);
  const config = {
    headers: { Authorization: `${auth}` },
  };
  const perMonthPost = async (yearAndMonth) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/month`,
      yearAndMonth,
      config
    );
    return response.data;
  };
  const perMonthMutation = useMutation({
    mutationFn: (ym) => perMonthPost(ym),
    onSuccess: (data) => {
      if (data?.data) {
        const validTransactions = data.data.dailyTransactions
          .map((item, idx) => (item.transactions.length > 0 ? item : null))
          .filter((idx) => idx !== null);
        setTransactionsOnSelectedMonth(validTransactions);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
  useEffect(() => {
    perMonthMutation.mutate({
      year: selectedYear,
      month: selectedMonth,
    });
  }, [selectedYear, selectedMonth]);
  return (
    <div
      className="flex-col flex-1"
      style={{ gap: '12px', maxHeight: '100%', width: '100%' }}
    >
      <div className="flex-row flex-1" style={{ minHeight: 0, width: '100%' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '16px',
            height: '100%',
            width: '100%',
          }}
        >
          <Panel style={{ minHeight: '70%', maxHeight: '80%' }}>
            <Calendar
              schedules={transactionsOnSelectedMonth}
              selectedMonthOnly={selectedMonth}
              setSelectedMonthOnly={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              selectedYear={selectedYear}
            />
          </Panel>
        </div>
      </div>
    </div>
  );
};
