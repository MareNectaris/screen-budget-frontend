import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Button } from '../../../../components/Button/Button'; // Modal 버튼
import { FAB } from '../../../../components/FAB/FAB'; // FAB 추가
import { Modal } from '../../../../components/Modal/Modal'; // Modal 추가
import { Panel } from '../../../../components/Panel/Panel';
import { Radio } from '../../../../components/Radio/Radio'; // Modal 내부 라디오 버튼
import { Table } from '../../../../components/Table/Table';
import { TextboxLabel } from '../../../../components/Text/Text'; // Modal 내부 텍스트
import { Textbox } from '../../../../components/Textbox/Textbox'; // Modal 내부 텍스트박스
import { authState } from '../../../../store/Auth';

export const TableView = () => {
  const navigate = useNavigate();
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  const today = new Date();
  const [monthlyTransactions, setMonthlyTransactions] = useState([]);
  const [bookName, setBookName] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentMethodsFiltered, setPaymentMethodsFiltered] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const { bookUuid } = useParams();

  // 추가된 상태 변수들
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열기/닫기 상태
  const [selectedRadio, setSelectedRadio] = useState('expense'); // 라디오 버튼 선택 상태
  const [newTransactionName, setNewTransactionName] = useState(''); // 새 거래처 이름
  const [newCategoryId, setNewCategoryId] = useState(null); // 카테고리 선택
  const [newAmount, setNewAmount] = useState(''); // 금액 입력
  const [newPaymentMethodId, setNewPaymentMethodId] = useState(null); // 결제 수단 선택
  const [selectedRadioModify, setSelectedRadioModify] = useState();

  const handleRadioChange = (val) => {
    setSelectedRadio(val); // 라디오 버튼 변경 처리 함수
  };

  const handleRadioModifyChange = (val) => {
    setSelectedRadioModify(val); // 수정용 라디오 버튼 변경 처리 함수
  };

  const getKSTDateString = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = kstDate.getUTCMonth() + 1;
    const d = kstDate.getUTCDate();
    return [y, m, d];
  };

  const [newDate, setNewDate] = useState(getKSTDateString(new Date())); // newDate 상태 정의

  const auth = useRecoilValue(authState);
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const idPost = async (data) => {
    const requests = [
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

  const idMutation = useMutation({
    mutationFn: idPost,
    onSuccess: (dataArr) => {
      const [_categories, _paymentMethods] = dataArr;
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

  useEffect(() => {
    setCategoriesFiltered(categories.filter((elem) => !elem.isDeleted));
  }, [categories]);

  useEffect(() => {
    setPaymentMethodsFiltered(paymentMethods.filter((elem) => !elem.isDeleted));
  }, [paymentMethods]);

  const monthlyTransactionsPost = async ({ year, month }) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/month?year=${year}&month=${month}`,
      config
    );
    return response.data;
  };

  const monthlyTransactionsPostMutation = useMutation({
    mutationFn: (body) => monthlyTransactionsPost(body),
    onSuccess: (data) => {
      if (data?.data.dailyTransactions) {
        setMonthlyTransactions(data.data.dailyTransactions);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);

  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('테이블');
    monthlyTransactionsPostMutation.mutate({
      year: selectedMonth.getFullYear(),
      month: selectedMonth.getMonth() + 1,
    });
    idMutation.mutate();
  }, []);

  useEffect(() => {
    console.log(selectedMonth);
  }, [selectedMonth]);

  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);

  useEffect(() => {
    monthlyTransactionsPostMutation.mutate({
      year: selectedMonth.getFullYear(),
      month: selectedMonth.getMonth() + 1,
    });
  }, [selectedMonth]);

  useEffect(() => {
    idMutation.mutate();
  }, [bookUuid]);

  const transactionDelete = async (record) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/${selectedSchedule}`,
      config
    );
    return response.data;
  };

  const transactionDeleteMutation = useMutation({
    mutationFn: transactionDelete,
    onSuccess: (data) => {
      navigate(0);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const deleteTransaction = (key) => {
    setSelectedSchedule(key);
    transactionDeleteMutation.mutate();
  };

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
      date: newDate,
    };
    newTransactionPostMutation.mutate(newRecord);
  };

  return (
    <div
      className="flex-col flex-1"
      style={{ gap: '12px', maxHeight: '100%', width: '100%' }}
    >
      <Panel className="flex-1">
        <Table
          monthlyTransactions={monthlyTransactions}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          paymentMethods={paymentMethods}
          categories={categories}
          paymentMethodsFiltered={paymentMethodsFiltered}
          categoriesFiltered={categoriesFiltered}
          deleteTransaction={deleteTransaction}
          handleAddRecord={handleAddRecord}
        />
      </Panel>

      {/* FAB 버튼 추가 */}
      <FAB onClick={() => setIsModalOpen(!isModalOpen)} />

      {/* 모달 */}
      <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} title="새 기록">
        {categoriesFiltered.length > 0 && paymentMethodsFiltered.length > 0 ? (
          <div className="flex-col" style={{ gap: '12px' }}>
            <div className="flex-col">
              <TextboxLabel>날짜</TextboxLabel>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
            </div>
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
                {categoriesFiltered?.map((elem) => {
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
                {paymentMethodsFiltered?.map((elem) => {
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
