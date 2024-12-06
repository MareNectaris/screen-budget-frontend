import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Panel } from '../../../../components/Panel/Panel';
import { authState } from '../../../../store/Auth';
export const Stats = () => {
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

  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('통계');
  }, []);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: '1fr 1fr',
        gridGap: '16px',
        paddingTop: '12px',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridGap: '16px',
        }}
      >
        <Panel></Panel>
        <Panel></Panel>
      </div>
      <div style={{ maxHeight: '100%' }}>
        <Panel style={{ height: '100%' }}></Panel>
      </div>
    </div>
  );
};
