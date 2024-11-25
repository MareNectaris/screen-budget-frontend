import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { useState } from 'react';
import './Calendar.css';


export const Calendar = ({schedules = [], onDateSelected}) => {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMonth, setSelectedMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const daysOfWeek = ['일','월','화','수','목','금','토'];

  const getDaysInAMonth = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const day1 = new Date(y, m, 1);
    const dayLast = new Date(y, m+1, 0);
    const days = [];

    const day1DayOfWeek = day1.getDay();
    const dayLastDayOfWeek = dayLast.getDay();

    for(let i=day1DayOfWeek-1; i>=0; i--)
      days.push(new Date(y,m,-i)); // 이번 달 캘린더에 표시되는 저번 달의 날짜
    for(let i=1; i<=dayLast.getDate(); i++)
      days.push(new Date(y,m,i)); // 이번 달 캘린더에 표시되는 이번 달 날짜
    for(let i=1; i<7-dayLastDayOfWeek; i++)
      days.push(new Date(y,m+1, i)); //이번 달 캘린더에 표시되는 다음 달의 날짜
    return days;
  };

  const days = getDaysInAMonth(selectedMonth);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if(onDateSelected) onDateSelected(date);
  };

  const handleMonthChange = (pointer) => {
    const newMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth()+pointer,1);
    setSelectedMonth(newMonth);
  };

  // 해당 날짜에 일정이 있는지 확인
  const dateHasEvent = (date) => {
    return schedules.some((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getFullYear() === date.getFullYear() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getDate() === date.getDate()
      );
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div>
          {selectedMonth.getFullYear()}년 {selectedMonth.getMonth() + 1}월
        </div>
        <button className="calendar-switch-button" onClick={() => handleMonthChange(-1)}>
          <ArrowBackIosNew/>
        </button>
        <button className="calendar-switch-button" onClick={() => handleMonthChange(1)}>
          <ArrowForwardIos/>
        </button>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((d) => {
          return (
            <div key={d} className="day-of-week">
              {d}
            </div>
          )
        })}
      </div>
      <div className="days">
        {days.map((date, idx) => {
          return (
            <div
              key={idx}
              className={`day
                ${date.getMonth()===selectedMonth.getMonth()?"":"other-month"}
                ${dateHasEvent(date)?"has-event":""}
                ${date.toDateString() === selectedDate.toDateString()? "date-selected":""}
                `}
              onClick={() => handleDateClick(date)}
            >
              {date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}