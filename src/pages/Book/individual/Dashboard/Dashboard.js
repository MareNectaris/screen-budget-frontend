import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useMutation } from '@tanstack/react-query';
import { floorAndFormatNumber } from '@toss/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext, useParams } from 'react-router';
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

export const Dashboard = () => {
  const getKSTDate = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = (kstDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const d = kstDate.getUTCDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const { bookUuid } = useParams();
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [monthly, setMonthly] = useState({ expense: 0, income: 0 });
  const [today, setToday] = useState({ transactions: [], schedules: [] });
  const [todayStats, setTodayStats] = useState({ expense: 0, income: 0 });
  const [economyNews, setEconomyNews] = useState({ hankyung: [], mk: [] });
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState();
  const [bookName, setBookName] = useState('');
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(null);
  const [newPaymentMethodId, setNewPaymentMethodId] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();

  const handleRadioChange = (val) => {
    setSelectedRadio(val);
  };
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
    onMutate: () => {},
  });

  const newTransactionPost = async (record) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}`,
      record,
      config
    );
    return response.data;
  };
  const newTransactionPostMutation = useMutation({
    mutationFn: (record) => newTransactionPost(record),
    onSuccess: (data) => {
      navigate(0);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleAddRecord = () => {
    const date = new Date();
    const newRecord = {
      categoryId: newCategoryId,
      paymentMethodId: newPaymentMethodId,
      name: newTransactionName,
      amount: newAmount,
      type: selectedRadio,
      date: getKSTDate(date),
    };
    newTransactionPostMutation.mutate(newRecord);
  };

  useEffect(() => {
    calculateTodayExpensesAndIncome();
  }, [today]);

  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    mutation.mutate({});
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('대시보드');
  }, []);

  useEffect(() => {
    mutation.mutate({});
  }, [bookUuid]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);
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
                  (p) => p._id === transaction.categoryId
                );
                const paymentMethodObj = paymentMethods?.find(
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
                  />
                );
              })}
            </div>
          </Panel>
          <Panel>
            <Link to="/news" style={{ textDecoration: 'none', color: '#000' }}>
              <div className="flex-row flex-center pointer">
                <Title className="flex-1">경제 뉴스</Title>
                <NavigateNextIcon />
              </div>
            </Link>
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
        {categories.length > 0 && paymentMethods.length > 0 ? (
          <div className="flex-col" style={{ gap: '12px' }}>
            <div className="flex-col">
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
            </div>
            <div className="flex-col">
              <TextboxLabel>거래처</TextboxLabel>
              <Textbox
                type="text"
                value={newTransactionName}
                setText={setNewTransactionName}
                onKeyDown={() => {}}
              />
            </div>

            <div className="flex-col">
              <TextboxLabel>카테고리</TextboxLabel>
              <select
                className="select"
                value={newCategoryId || ''}
                onChange={(e) => setNewCategoryId(e.target.value)}
              >
                <option value="" disabled>
                  카테고리 선택
                </option>
                {categories?.map((elem) => {
                  return (
                    <option value={elem._id} style={{ color: elem.color }}>
                      {elem?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex-col">
              <TextboxLabel>금액</TextboxLabel>
              <Textbox
                type="number"
                value={newAmount}
                setText={setNewAmount}
                onKeyDown={() => {}}
              />
            </div>
            <div className="flex-col">
              <TextboxLabel>결제 수단</TextboxLabel>
              <select
                className="select"
                value={newPaymentMethodId || ''}
                onChange={(e) => setNewPaymentMethodId(e.target.value)}
              >
                <option value="" disabled>
                  결제 수단 선택
                </option>
                {paymentMethods?.map((elem) => {
                  return <option value={elem._id}>{elem?.name}</option>;
                })}
              </select>
            </div>
            <Button variant="contained" onClick={() => handleAddRecord()}>
              기록 추가
            </Button>
          </div>
        ) : (
          <div className="flex-col flex-center gap-6px">
            카테고리 또는 결제 수단 중 하나 이상이 설정되어 있지 않습니다.
            <br />
            <div className="flex-row">
              <Link to="settings">가계부 설정</Link>으로 이동하여 카테고리와
              결제 수단 모두가 설정되어 있는지 확인해 주세요.
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
