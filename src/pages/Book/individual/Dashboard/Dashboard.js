import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useMutation } from '@tanstack/react-query';
import { floorAndFormatNumber } from '@toss/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { Line } from '../../../../components/Line/Line';
import { Panel } from '../../../../components/Panel/Panel';
import { Title } from '../../../../components/Text/Text';
import { authState } from '../../../../store/Auth';
import { LoadingNoBackground } from '../../../Loading/Loading';
export const Dashboard = () => {
  const { bookUuid } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [monthly, setMonthly] = useState({ expense: 0, income: 0 });
  const [today, setToday] = useState({ transactions: [], schedules: [] });
  const [todayStats, setTodayStats] = useState({ expense: 0, income: 0 });
  const [economyNews, setEconomyNews] = useState({ hankyung: [], mk: [] });

  const calculateTodayExpensesAndIncome = () => {
    let expenseSum = 0;
    let incomeSum = 0;
    today.transactions.forEach((transaction) => {
      if (transaction.type === 'expense') {
        expenseSum += transaction.amount;
      } else {
        incomeSum += transaction.amount;
      }
    });
    setTodayStats({
      expense: expenseSum,
      income: incomeSum,
    });
  };
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const dashboardPost = async (data) => {
    const requests = [
      axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/monthly-summary`,
        config
      ),
      axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/todayTimeline`,
        config
      ),
      axios.get(`${process.env.REACT_APP_SERVER_ADDRESS}/api/economy`),
    ];

    const responses = await Promise.all(requests);

    return responses.map((res) => res.data);
  };

  const mutation = useMutation({
    mutationFn: dashboardPost,
    onSuccess: (dataArr) => {
      const [_monthly, _today, _economyNews] = dataArr;
      if (_monthly?.data) {
        setMonthly(_monthly.data);
      }
      if (_today?.message) {
        setToday(_today.message);
      }
      if (_economyNews?.data) {
        setEconomyNews(_economyNews.data);
      }
    },
    onError: (error) => {
      alert(error);
    },
    onMutate: () => {
      return <LoadingNoBackground />;
    },
  });

  useEffect(() => {
    calculateTodayExpensesAndIncome();
  }, [today]);

  useEffect(() => {
    mutation.mutate({});
  }, []);

  const { setMajorCategory, setMinorCategory } = useOutletContext();
  useEffect(() => {
    setMajorCategory('개인 가계부');
    setMinorCategory('대시보드');
  });
  return (
    <div className="flex-col flex-1" style={{ gap: '12px' }}>
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
                  <div className="bold text-36px">
                    {floorAndFormatNumber(monthly.expense)}원
                  </div>
                  <NavigateNextIcon />
                </div>
              </div>
              <Line />
              <div className="flex-row flex-center pointer">
                <div className="regular text-24px flex-1">오늘의 지출</div>
                <div className="flex-row flex-center">
                  <div className="bold text-32px">
                    {floorAndFormatNumber(todayStats.expense)}원
                  </div>
                  <NavigateNextIcon />
                </div>
              </div>
              <Line />
              <div
                className={`flex-row flex-center ${today.schedules.length > 0 && 'pointer'}`}
              >
                <div className="regular text-24px flex-1">오늘의 금융 일정</div>
                <div className="flex-row flex-center">
                  <div className="bold text-32px">
                    {today.schedules.length}건
                  </div>
                  {today.schedules.length > 0 && <NavigateNextIcon />}
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
  );
};
