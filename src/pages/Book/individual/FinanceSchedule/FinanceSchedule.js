import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Panel } from '../../../../components/Panel/Panel';
import { ScheduleIndividual } from '../../../../components/ScheduleIndividual/ScheduleIndividual';
import { Title } from '../../../../components/Text/Text';
import { authState } from '../../../../store/Auth';
export const FinanceSchedule = () => {
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
  const [paymentMethods, setPaymentMethods] = useState([]);

  const paymentMethodsGet = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/paymentMethods/${bookUuid}`,
      config
    );
    return response.data;
  };
  const paymentMethodsGetMutation = useMutation({
    mutationFn: paymentMethodsGet,
    onSuccess: (data) => {
      if (data?.data) {
        setPaymentMethods(data.data);
      }
    },
    onError: (error) => {
      alert(error);
    },
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

  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('금융 일정');
    schedulesGetMutation.mutate();
    paymentMethodsGetMutation.mutate();
  }, []);
  useEffect(() => {
    let arr3d = Array.from({ length: 31 }, () => []);
    schedules.forEach((schedule) => {
      arr3d[schedule.dateInfo.day].push(schedule);
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
                    <div className="text-20px medium">
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
          </div>
        </div>
      </Panel>
    </div>
  );
};
