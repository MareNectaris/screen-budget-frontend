import AddIcon from '@mui/icons-material/Add';
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
import { Button } from '../../../../components/Button/Button';
import { Modal } from '../../../../components/Modal/Modal';
import { Panel } from '../../../../components/Panel/Panel';
import { ScheduleIndividual } from '../../../../components/ScheduleIndividual/ScheduleIndividual';
import { TextboxLabel, Title } from '../../../../components/Text/Text';
import { Textbox } from '../../../../components/Textbox/Textbox';
import { authState } from '../../../../store/Auth';
export const FinanceSchedule = () => {
  const getKSTDate = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = (kstDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const d = kstDate.getUTCDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  };
  const navigate = useNavigate();
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  const [bookName, setBookName] = useState('');
  const { bookUuid } = useParams();
  const auth = useRecoilValue(authState);
  const config = {
    headers: { Authorization: `${auth}` },
  };
  const [schedules, setSchedules] = useState([]);
  const [scheduleArrPerDay, setScheduleArrPerDay] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentScheduleId, setCurrentScheduleId] = useState(null);
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(null);
  const [newPaymentMethodId, setNewPaymentMethodId] = useState(null);
  const [newScheduleDate, setNewScheduleDate] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const [categories, setCategories] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const paymentPost = async (data) => {
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
    mutationFn: paymentPost,
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
  const schedulesGet = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/schedules/${bookUuid}`,
      config
    );
    return response.data;
  };
  const schedulesGetMutation = useMutation({
    mutationFn: schedulesGet,
    onSuccess: (data) => {
      if (data?.data) {
        setSchedules(data.data);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });
  const schedulesPost = async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/schedules/${bookUuid}`,
      data,
      config
    );
    return response.data;
  };
  const schedulesPostMutation = useMutation({
    mutationFn: (data) => schedulesPost(data),
    onSuccess: (data) => {
      navigate(0);
    },
    onError: (error) => {
      alert(error);
    },
  });

  const handleAddSchedule = () => {
    if (newScheduleDate < 1 || newScheduleDate > 31) {
      alert('입력된 결제 주기가 옳지 않습니다.');
      return;
    }
    const newRecord = {
      categoryId: newCategoryId,
      paymentMethodId: newPaymentMethodId,
      name: newTransactionName,
      amount: newAmount,
      date: `2024-12-${newScheduleDate}`,
    };
    schedulesPostMutation.mutate(newRecord);
  };

  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('금융 일정');
    schedulesGetMutation.mutate();
    paymentMutation.mutate();
  }, []);
  useEffect(() => {
    let arr3d = Array.from({ length: 31 }, () => []);
    schedules.forEach((schedule) => {
      arr3d[schedule.dateInfo.day - 1].push(schedule);
    });
    console.log(arr3d);
    setScheduleArrPerDay(arr3d);
  }, [schedules]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);
  return (
    <div
      className="flex-col flex-1"
      style={{ gap: '12px', height: '100%', width: '100%' }}
    >
      <Panel className="flex-1">
        <div className="flex-col" style={{ gap: '12px' }}>
          <Title>금융 일정</Title>
          <div className="flex-col">
            {scheduleArrPerDay.map((day) => {
              if (day.length > 0) {
                return (
                  <div className="flex-row gap-6px" key={day}>
                    <div
                      className="text-20px medium"
                      style={{ minWidth: '50px', textAlign: 'end' }}
                    >
                      {day[0].dateInfo.day}일
                    </div>
                    <div className="flex-col flex-1">
                      {day.map((elem) => {
                        return (
                          <ScheduleIndividual
                            paymentLocation={elem.name}
                            category={elem.category.name}
                            color={elem.category.color}
                            paymentMethod={
                              paymentMethods?.find(
                                (o) => o._id === elem.paymentMethodId
                              )?.name
                            }
                            transactionType="expense"
                            amount={elem.amount}
                            _id={elem._id}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>{' '}
          <div
            className="flex-row gap-6px pointer"
            onClick={() => {
              setIsAddModalOpen(true);
            }}
          >
            <AddIcon />
            <div className="medium">금융 일정 추가</div>
          </div>
        </div>
      </Panel>
      <Modal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        title="금융 일정 추가"
      >
        {categories.length > 0 && paymentMethods.length > 0 ? (
          <div className="flex-col" style={{ gap: '12px' }}>
            <div className="flex-col">
              <TextboxLabel>금융 일정명</TextboxLabel>
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
            <div className="flex-col">
              <TextboxLabel>결제 주기</TextboxLabel>
              <div className="flex-row">
                <div>매월</div>
                <Textbox
                  type="number"
                  value={newScheduleDate}
                  setText={setNewScheduleDate}
                  onKeyDown={() => {}}
                  className="flex-1"
                />
                <div>일</div>
              </div>
            </div>
            <Button variant="contained" onClick={() => handleAddSchedule()}>
              금융 일정 추가
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
