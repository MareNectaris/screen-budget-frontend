import { useState } from 'react';
import { TableDate, Title } from '../Text/Text';
import './Table.css';
export const Table = ({ dailyTransactions }) => {
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const handleMonthChange = (pointer) => {
    const newMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + pointer,
      1
    );
    setSelectedMonth(newMonth);
  };
  return (
    <div>
      <div className="flex-row">
        <Title>
          {selectedMonth.getFullYear()}년 {selectedMonth.getMonth() + 1}월
        </Title>
      </div>
      <div className="flex-row">
        <TableDate className="flex-1">12월 12일</TableDate>
        <TableDate>합계 -40,000원</TableDate>
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>분류</th>
              <th>카테고리</th>
              <th>결제 수단</th>
              <th>내역명</th>
              <th>금액</th>
              <th>메모</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>i</td>
              <td>2</td>
              <td>3</td>
              <td>4</td>
              <td>5</td>
              <td>6</td>
              <td>7</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
