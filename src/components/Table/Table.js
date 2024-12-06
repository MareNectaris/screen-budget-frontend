import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { floorAndFormatNumber } from '@toss/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { TableDate, Title } from '../Text/Text';
import { Textbox } from '../Textbox/Textbox';
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
  handleAddRecord,
}) => {
  const navigate = useNavigate();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [newPaymentMethodId, setNewPaymentMethodId] = useState(null);
  const [newTransactionName, setNewTransactionName] = useState('');
  const [newCategoryId, setNewCategoryId] = useState(null);
  const [newAmount, setNewAmount] = useState('');
  const handleMonthChange = (pointer) => {
    const newMonth = new Date(
      selectedMonth.getFullYear(),
      selectedMonth.getMonth() + pointer,
      1
    );
    setSelectedMonth(newMonth);
  };

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
        let idx = 1;
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
                    {isAddOpen[day.date] ? (
                      <tr>
                        <td>{idx}</td>
                        <td>
                          <select
                            className="select"
                            value={transactionType || ''}
                            onChange={(e) => setTransactionType(e.target.value)}
                          >
                            <option value="income">수입</option>;
                            <option value="expense">지출</option>;
                          </select>
                        </td>
                        <td>
                          <select
                            className="select"
                            value={newCategoryId || ''}
                            onChange={(e) => setNewCategoryId(e.target.value)}
                          >
                            <option value="" disabled>
                              카테고리 선택
                            </option>
                            {categoriesFiltered?.map((elem) => {
                              if (!elem.isDeleted)
                                return (
                                  <option
                                    value={elem._id}
                                    style={{ color: elem.color }}
                                  >
                                    {elem?.name}
                                  </option>
                                );
                            })}
                          </select>
                        </td>
                        <td>
                          <select
                            className="select"
                            value={newPaymentMethodId || ''}
                            onChange={(e) =>
                              setNewPaymentMethodId(e.target.value)
                            }
                          >
                            <option value="" disabled>
                              결제 수단 선택
                            </option>
                            {paymentMethodsFiltered?.map((elem) => {
                              if (!elem.isDeleted)
                                return (
                                  <option value={elem._id}>{elem?.name}</option>
                                );
                            })}
                          </select>
                        </td>
                        <td>
                          <Textbox
                            type="text"
                            value={newTransactionName}
                            setText={setNewTransactionName}
                            onKeyDown={() => {}}
                          ></Textbox>
                        </td>
                        <td>
                          <Textbox
                            type="number"
                            value={newAmount}
                            setText={setNewAmount}
                            onKeyDown={() => {}}
                          />
                        </td>
                        <td>
                          <CheckIcon
                            className="pointer"
                            onClick={() => {
                              const newRecord = {
                                categoryId: newCategoryId,
                                paymentMethodId: newPaymentMethodId,
                                name: newTransactionName,
                                amount: newAmount,
                                type: transactionType,
                                date: day.date,
                              };
                              handleAddRecord(newRecord);
                            }}
                          />
                          <CloseIcon
                            className="pointer"
                            onClick={() => {
                              let _new = { ...isAddOpen };
                              _new[day.date] = false;
                              setIsAddOpen(_new);
                            }}
                          />
                        </td>
                      </tr>
                    ) : (
                      <div
                        className="flex-row gap-6px pointer"
                        onClick={() => {
                          let _new = { ...isAddOpen };
                          _new[day.date] = true;
                          setIsAddOpen(_new);
                        }}
                      >
                        <AddIcon />
                        <div className="medium">기록 추가</div>
                      </div>
                    )}
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
