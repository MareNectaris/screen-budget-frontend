import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { floorAndFormatNumber } from '@toss/utils';
import { useState } from 'react';
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { TableDate, Title } from '../Text/Text';
import './Table.css';

export const Table = ({
  monthlyTransactions,
  selectedMonth,
  setSelectedMonth,
  paymentMethods,
  categories,
  paymentMethodsFiltered,
  categoriesFiltered,
  deleteTransaction,
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleMonthChange = (pointer) => {
    const newMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + pointer,
      1
    );
    setSelectedMonth(newMonth);
  };
  let idx = 1;
  return (
    <div className="flex-col" style={{ gap: '12px' }}>
      <div className="flex-row" style={{ gap: '12px' }}>
        <Title className="flex-1">
          {selectedMonth.getFullYear()}년 {selectedMonth.getMonth() + 1}월
        </Title>
        <button
          className="calendar-switch-button"
          onClick={() => handleMonthChange(-1)}
        >
          <ArrowBackIosNew />
        </button>
        <button
          className="calendar-switch-button"
          onClick={() => handleMonthChange(1)}
        >
          <ArrowForwardIos />
        </button>
      </div>
      {monthlyTransactions.map((day) => {
        const sum = day.totalIncome - day.totalExpense;
        if (day.transactions.length > 0)
          return (
            <div className="flex-col" key={day.date}>
              <div className="flex-row">
                <TableDate className="flex-1">{day.date}</TableDate>
                <TableDate>
                  합계 {sum > 0 ? '+' : ''}
                  {floorAndFormatNumber(sum)}원
                </TableDate>
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
                      <th>삭제</th>
                    </tr>
                  </thead>
                  <tbody>
                    {day.transactions.map((transaction) => {
                      const categoryObj = categories?.find(
                        (p) => p._id === transaction.categoryId
                      );
                      const paymentMethodObj = paymentMethods?.find(
                        (p) => p._id === transaction.paymentMethodId
                      );
                      return (
                        <tr>
                          <td>{idx++}</td>
                          <td>
                            {transaction.type === 'income' ? '수입' : '지출'}
                          </td>

                          <td>
                            <CategoryChip color={categoryObj?.color}>
                              {categoryObj?.name}
                            </CategoryChip>
                          </td>
                          <td>{paymentMethodObj?.name}</td>
                          <td>{transaction.name}</td>
                          <td>{transaction.amount}</td>
                          <td>
                            <DeleteIcon
                              sx={{ color: 'red' }}
                              className="pointer"
                              onClick={() => deleteTransaction(transaction._id)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                    <div
                      className="flex-row gap-6px pointer"
                      onClick={() => {
                        setIsAddOpen(true);
                      }}
                    >
                      <AddIcon />
                      <div className="medium">기록 추가</div>
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          );
      })}

      {/* <div className="flex-col">
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
              <div
                className="flex-row gap-6px pointer"
                onClick={() => {
                  setIsAddOpen(true);
                }}
              >
                <AddIcon />
                <div className="medium">기록 추가</div>
              </div>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};
