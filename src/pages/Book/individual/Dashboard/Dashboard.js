import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useMutation } from '@tanstack/react-query';
import { floorAndFormatNumber } from '@toss/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';
import { useRecoilState } from 'recoil';
import { Button } from '../../../../components/Button/Button';
import { FAB } from '../../../../components/FAB/FAB';
import { Line } from '../../../../components/Line/Line';
import { Modal } from '../../../../components/Modal/Modal';
import { NewsItem } from '../../../../components/NewsItem/NewsItem';
import { Panel } from '../../../../components/Panel/Panel';
import { Radio } from '../../../../components/Radio/Radio';
import { ScheduleIndividual } from '../../../../components/ScheduleIndividual/ScheduleIndividual';
import { TextboxLabel, Title } from '../../../../components/Text/Text';
import { Textbox } from '../../../../components/Textbox/Textbox';
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
  const [categories, setCategories] = useState({});
  const [paymentMethods, setPaymentMethods] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState();
  const handleRadioChange = (val) => {
    setSelectedRadio(val);
  };
  useEffect(() => {
    console.log(categories);
  }, [categories]);
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
      axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/categories/${bookUuid}`,
        config
      ),
      axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/paymentMethods/${bookUuid}`,
        config
      ),
    ];

    const responses = await Promise.all(requests);

    return responses.map((res) => res.data);
  };

  const mutation = useMutation({
    mutationFn: dashboardPost,
    onSuccess: (dataArr) => {
      const [_monthly, _today, _economyNews, _categories, _paymentMethods] =
        dataArr;
      if (_monthly?.data) {
        setMonthly(_monthly.data);
      }
      if (_today?.message) {
        setToday(_today.message);
      }
      if (_economyNews?.data) {
        setEconomyNews(_economyNews.data);
      }
      if (_categories?.data) {
        setCategories(_categories.data);
      }
      if (_paymentMethods?.data) {
        setPaymentMethods(_paymentMethods.data);
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
    <div className="flex-col flex-1" style={{ gap: '12px', maxHeight: '100%' }}>
      <div className="flex-row">
        <Panel className="flex-1">
          <Title>브리핑</Title>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
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
      <div className="flex-1" style={{ minHeight: 0 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '16px',
            height: '100%',
          }}
        >
          <Panel>
            <div className="flex-row flex-center pointer">
              <Title className="flex-1">타임라인</Title>
              <NavigateNextIcon />
            </div>
            <div className="flex-col">
              {today.transactions?.map((transaction) => {
                const categoryObj = categories?.find(
                  (p) => p.uuid === transaction.categoryUuid
                );
                const paymentMethodObj = paymentMethods?.find(
                  (p) => p.uuid === transaction.paymentMethodUuid
                );
                return (
                  <ScheduleIndividual
                    paymentLocation={transaction.name}
                    category={categoryObj.name}
                    color={categoryObj.color}
                    paymentMethod={paymentMethodObj.name}
                    transactionType={transaction.type}
                    amount={transaction.amount}
                  />
                );
              })}
            </div>
          </Panel>
          <Panel>
            <div className="flex-row flex-center pointer">
              <Title className="flex-1">경제 뉴스</Title>
              <NavigateNextIcon />
            </div>
            <div className="flex-col">
              {economyNews.hankyung.map((elem) => {
                return <NewsItem text={elem.title} to={elem.link} />;
              })}
            </div>
          </Panel>
        </div>
      </div>
      <FAB onClick={() => setIsModalOpen(!isModalOpen)} />
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="새 기록">
        <TextboxLabel>분류</TextboxLabel>
        <div className="flex-row gap-6px">
          <Radio
            name="category"
            value="expense"
            checked={selectedRadio === 'expense'}
            handleChange={handleRadioChange}
          >
            지출
          </Radio>
          <Radio
            name="category"
            value="income"
            checked={selectedRadio === 'income'}
            handleChange={handleRadioChange}
          >
            수입
          </Radio>
        </div>

        <TextboxLabel>거래처</TextboxLabel>

        <TextboxLabel>카테고리</TextboxLabel>
        <Textbox />
        <TextboxLabel>금액</TextboxLabel>
        <TextboxLabel>결제 수단</TextboxLabel>
        <TextboxLabel>메모</TextboxLabel>
        <Button variant="contained">기록 추가</Button>
      </Modal>
    </div>
  );
};
