import { PieChart } from '@mui/x-charts/PieChart';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CircularProgressWithLabel } from '../../../../components/CircularProgressWithLabel/CircularProgressWithLabel';
import { Panel } from '../../../../components/Panel/Panel';
import { Title } from '../../../../components/Text/Text';
import { authState } from '../../../../store/Auth';
export const Stats = () => {
  const navigate = useNavigate();
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  const [bookName, setBookName] = useState('');
  const [perCategory, setPerCategory] = useState([]);
  const [budgetFilteredPerCategory, setBudgetFilteredPerCategory] = useState(
    []
  );
  const [spendingsFilteredPerCategory, setSpendingsFilteredPerCategory] =
    useState([]);
  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [spendings, setSpendings] = useState({
    daily: {
      dailyBudget: 0,
      dailySpent: 0,
    },
    monthly: {
      monthlyBudget: 0,
      monthlySpent: 0,
    },
  });
  const [relativeSpendings, setRelativeSpendings] = useState({
    monthly: 0,
    daily: 0,
  });

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

  const perCategoryGet = async (record) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/budgets/${bookUuid}/categories`,
      config
    );
    return response.data;
  };
  const perCategoryGetMutation = useMutation({
    mutationFn: perCategoryGet,
    onSuccess: (data) => {
      setPerCategory(data);
    },
    onError: (error) => {
      alert(error);
    },
  });
  const paymentGet = async (data) => {
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

  const paymentMutation = useMutation({
    mutationFn: paymentGet,
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

  const spendingsGet = async (data) => {
    const requests = [
      axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/budgets/${bookUuid}/daily`,
        config
      ),
      axios.get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/budgets/${bookUuid}/monthly`,
        config
      ),
    ];

    const responses = await Promise.all(requests);

    return responses.map((res) => res.data);
  };

  const spendingsGetMutation = useMutation({
    mutationFn: spendingsGet,
    onSuccess: (dataArr) => {
      const [_daily, _monthly] = dataArr;
      if (_daily && _monthly) {
        setSpendings({
          daily: _daily,
          monthly: _monthly,
        });
      }
    },
    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });
  useEffect(() => {
    setRelativeSpendings({
      daily: Math.ceil(
        (spendings.daily.dailySpent / spendings.daily.dailyBudget) * 100
      ),
      monthly: Math.ceil(
        (spendings.monthly.monthlySpent / spendings.monthly.monthlyBudget) * 100
      ),
    });
  }, [spendings]);

  useEffect(() => {
    setBudgetFilteredPerCategory(
      perCategory.map((elem, idx) => {
        return {
          id: idx,
          label: elem.name,
          color: elem.color,
          value: elem.monthlyBudget,
        };
      })
    );
    setSpendingsFilteredPerCategory(
      perCategory.map((elem, idx) => {
        return {
          id: idx,
          label: elem.name,
          color: elem.color,
          value: elem.monthlySpent,
        };
      })
    );
  }, [perCategory]);
  useEffect(() => {
    console.log(budgetFilteredPerCategory);
  }, [budgetFilteredPerCategory]);
  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('통계');
    paymentMutation.mutate();
    perCategoryGetMutation.mutate();
    spendingsGetMutation.mutate();
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
        <Panel>
          <div className="flex-col flex-1 ">
            <Title>지출 목표 대비 소비</Title>
            <div className="flex-center flex-1">
              <div
                className="flex-row flex-1"
                style={{
                  height: '100%',
                  gap: '24px',
                  justifyContent: 'space-around',
                  alignContent: 'center',
                }}
              >
                <div className="flex-center flex-col" style={{ gap: '24px' }}>
                  <Title>일일 목표 대비</Title>
                  <CircularProgressWithLabel
                    value={
                      relativeSpendings.daily > 100
                        ? 100
                        : relativeSpendings.daily
                    }
                  />
                </div>
                <div className="flex-center flex-col" style={{ gap: '24px' }}>
                  <Title>이번 달 예산 소진률</Title>
                  <CircularProgressWithLabel
                    value={
                      relativeSpendings.monthly > 100
                        ? 100
                        : relativeSpendings.monthly
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </Panel>
        <Panel>
          <div className="flex-col flex-1">
            <Title>예산 분배 현황</Title>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PieChart
                series={[{ data: [...budgetFilteredPerCategory] }]}
                height={400}
                width={400}
              />
            </div>
          </div>
        </Panel>
      </div>
      <div style={{ maxHeight: '100%' }}>
        <Panel style={{ height: '100%' }}>
          <div className="flex-col flex-1">
            <Title>카테고리별 분석</Title>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <PieChart
                series={[{ data: [...spendingsFilteredPerCategory] }]}
                height={500}
                width={800}
              />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
};
