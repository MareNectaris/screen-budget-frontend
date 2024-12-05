import { useMutation } from '@tanstack/react-query';
import { floorAndFormatNumber } from '@toss/utils';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button } from '../../../../components/Button/Button';
import { Calendar } from '../../../../components/Calendar/Calendar';
import { FAB } from '../../../../components/FAB/FAB';
import { Line } from '../../../../components/Line/Line';
import { Modal } from '../../../../components/Modal/Modal';
import { Panel } from '../../../../components/Panel/Panel';
import { Radio } from '../../../../components/Radio/Radio';
import { ScheduleIndividual } from '../../../../components/ScheduleIndividual/ScheduleIndividual';
import { TextboxLabel, Title } from '../../../../components/Text/Text';
import { Textbox } from '../../../../components/Textbox/Textbox';
import { authState } from '../../../../store/Auth';
export const TimelineAndCalendar = () => {
  const navigate = useNavigate();
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  const [bookName, setBookName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState();
  const [selectedRadioModify, setSelectedRadioModify] = useState();
  const [newTransactionName, setNewTransactionName] = useState('');
  const [modifyTransactionName, setModifyTransactionName] = useState('');
  const [modifyCategoryId, setModifyCategoryId] = useState(null);
  const [newCategoryId, setNewCategoryId] = useState(null);
  const [newPaymentMethodId, setNewPaymentMethodId] = useState(null);
  const [modifyPaymentMethodId, setModifyPaymentMethodId] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const [modifyAmount, setModifyAmount] = useState('');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const handleScheduleOpen = (key) => {
    setSelectedSchedule(key);
    setIsScheduleModalOpen(true);
  };
  const handleRadioChange = (val) => {
    setSelectedRadio(val);
  };
  const handleRadioModifyChange = (val) => {
    setSelectedRadioModify(val);
  };
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
        setCategories(data.data.categories);
        setPaymentMethods(data.data.paymentMethods);
      }
    },
    onError: (error) => {
      alert(error);
    },
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

  const transactionPut = async (record) => {
    const response = await axios.put(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/${selectedSchedule}`,
      record,
      config
    );
    return response.data;
  };
  const transactionPutMutation = useMutation({
    mutationFn: (record) => transactionPut(record),
    onSuccess: (data) => {
      navigate(0);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleModifyRecord = () => {
    transactionPutMutation.mutate({
      name: modifyTransactionName,
      categoryId: modifyCategoryId,
      amount: modifyAmount,
      paymentMethod: modifyPaymentMethodId,
      payementMethod: modifyPaymentMethodId,
      type: selectedRadioModify,
    });
  };
  useEffect(() => {
    perDateMutation.mutate({
      date: `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${('0' + selectedDate.getDate()).slice(-2)}`,
    });
  }, [selectedDate, bookUuid]);
  useEffect(() => {
    perMonthMutation.mutate({
      year: selectedYear,
      month: selectedMonth,
    });
  }, [selectedYear, selectedMonth, bookUuid]);
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
                    +
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
                          onClick={(key) => handleScheduleOpen(key)}
                          style={{ cursor: 'pointer' }}
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
      <Modal
        isOpen={isScheduleModalOpen}
        setIsOpen={setIsScheduleModalOpen}
        title="기록 수정"
      >
        {categories.length > 0 && paymentMethods.length > 0 ? (
          <div className="flex-col" style={{ gap: '12px' }}>
            <div className="flex-col">
              <TextboxLabel>분류</TextboxLabel>
              <div className="flex-row gap-6px">
                <Radio
                  name="category"
                  value="expense"
                  checked={selectedRadioModify === 'expense'}
                  handleChange={handleRadioModifyChange}
                >
                  지출
                </Radio>
                <Radio
                  name="category"
                  value="income"
                  checked={selectedRadioModify === 'income'}
                  handleChange={handleRadioModifyChange}
                >
                  수입
                </Radio>
              </div>
            </div>
            <div className="flex-col">
              <TextboxLabel>거래처</TextboxLabel>
              <Textbox
                type="text"
                value={modifyTransactionName}
                setText={setModifyTransactionName}
                onKeyDown={() => {}}
              />
            </div>

            <div className="flex-col">
              <TextboxLabel>카테고리</TextboxLabel>
              <select
                className="select"
                value={modifyCategoryId || ''}
                onChange={(e) => setModifyCategoryId(e.target.value)}
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
                value={modifyAmount}
                setText={setModifyAmount}
                onKeyDown={() => {}}
              />
            </div>
            <div className="flex-col">
              <TextboxLabel>결제 수단</TextboxLabel>
              <select
                className="select"
                value={modifyPaymentMethodId || ''}
                onChange={(e) => setModifyPaymentMethodId(e.target.value)}
              >
                <option value="" disabled>
                  결제 수단 선택
                </option>
                {paymentMethods?.map((elem) => {
                  return <option value={elem._id}>{elem?.name}</option>;
                })}
              </select>
            </div>
            <Button variant="contained" onClick={() => handleModifyRecord()}>
              기록 수정
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
