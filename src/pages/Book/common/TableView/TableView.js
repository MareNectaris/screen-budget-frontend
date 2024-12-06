import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Panel } from '../../../../components/Panel/Panel';
import { Table } from '../../../../components/Table/Table';
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
  const getKSTDate = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = kstDate.getUTCMonth() + 1;
    const d = kstDate.getUTCDate();
    return [y, m, d];
  };
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
  const monthlyTransactionsPost = async (body) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/transactions/${bookUuid}/month`,
      body,
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
        />
      </Panel>
    </div>
  );
};
