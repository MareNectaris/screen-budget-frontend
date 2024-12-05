import { useMutation } from '@tanstack/react-query';
import { floorAndFormatNumber } from '@toss/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Calendar } from '../../../../components/Calendar/Calendar';
import { Line } from '../../../../components/Line/Line';
import { Panel } from '../../../../components/Panel/Panel';
import { ScheduleIndividual } from '../../../../components/ScheduleIndividual/ScheduleIndividual';
import { TextboxLabel, Title } from '../../../../components/Text/Text';
import { authState } from '../../../../store/Auth';
export const TimelineAndCalendar = () => {
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  const [bookName, setBookName] = useState('');

  const { bookUuid } = useParams();
  const getKSTDate = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = kstDate.getUTCMonth() + 1;
    const d = kstDate.getUTCDate();
    return [y, m, d];
  };
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedYear, setSelectedYear] = useState(getKSTDate(new Date())[0]);
  const [selectedMonth, setSelectedMonth] = useState(getKSTDate(new Date())[1]);
  const [transactionsOnSelectedMonth, setTransactionsOnSelectedMonth] =
    useState([]);
  const [transactionsOnSelectedDate, setTransactionsOnSelectedDate] = useState(
    []
  );
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
  const perDatePost = async (dateYYYYMMDD) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/date`,
      dateYYYYMMDD,
      config
    );
    return response.data;
  };
  const perDateMutation = useMutation({
    mutationFn: (yyyymmdd) => perDatePost(yyyymmdd),
    onSuccess: (data) => {
      if (data?.data) {
        setTransactionsOnSelectedDate(data.data);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
  useEffect(() => {
    perDateMutation.mutate({
      date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${('0' + selectedDate.getDate()).slice(-2)}`,
    });
  }, [selectedDate]);
  useEffect(() => {
    perMonthMutation.mutate({
      year: selectedYear,
      month: selectedMonth,
    });
  }, [selectedYear, selectedMonth]);
  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('캘린더 및 타임라인');
  }, []);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);
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
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              schedules={transactionsOnSelectedMonth}
              selectedMonthOnly={selectedMonth}
              setSelectedMonthOnly={setSelectedMonth}
              setSelectedYear={setSelectedYear}
              selectedYear={selectedYear}
            />
          </Panel>
          <Panel>
            <div className="flex-col" style={{ gap: '12px' }}>
              <Title>
                {getKSTDate(selectedDate)[0]}년 {getKSTDate(selectedDate)[1]}월{' '}
                {getKSTDate(selectedDate)[2]}일
              </Title>
              <div className="flex-col">
                <TextboxLabel>브리핑</TextboxLabel>
                <Line />
                <div className="flex-row flex-center">
                  <div className="regular text-24px flex-1">지출</div>
                  <div className="bold text-36px">
                    -
                    {floorAndFormatNumber(
                      transactionsOnSelectedDate?.summary?.totalExpense
                    )}
                    원
                  </div>
                </div>
                <div className="flex-row flex-center">
                  <div className="regular text-24px flex-1">수입</div>
                  <div className="bold text-36px">
                    -
                    {floorAndFormatNumber(
                      transactionsOnSelectedDate?.summary?.totalIncome
                    )}
                    원
                  </div>
                </div>
              </div>
              <div className="flex-col">
                <TextboxLabel>타임라인</TextboxLabel>
                <Line />
                <div className="flex-col">
                  {transactionsOnSelectedDate.transactions?.map(
                    (transaction) => {
                      const categoryObj =
                        transactionsOnSelectedDate.categories?.find(
                          (p) => p._id === transaction.categoryId
                        );
                      const paymentMethodObj =
                        transactionsOnSelectedDate.paymentMethods?.find(
                          (p) => p._id === transaction.paymentMethodId
                        );
                      return (
                        <ScheduleIndividual
                          paymentLocation={transaction?.name}
                          category={categoryObj?.name}
                          color={categoryObj?.color}
                          paymentMethod={paymentMethodObj?.name}
                          transactionType={transaction.type}
                          amount={transaction.amount}
                          _id={transaction._id}
                        />
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};
