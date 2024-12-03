import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import './Table.css';

// API 호출 함수
const fetchTransactions = async (bookUuid) => {
  const response = await fetch(
    `http://118.34.232.178:3000/api/transactions/${bookUuid}/daily`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
};

export const Table = () => {
  const { bookUuid } = useParams(); // URL 파라미터에서 bookUuid 가져오기

  // React Query로 데이터 가져오기
  const { data, isLoading, error } = useQuery(
    ['transactions', bookUuid],
    () => fetchTransactions(bookUuid)
  );

  if (isLoading) return <div>Loading...</div>; // 로딩 상태
  if (error) return <div>Error: {error.message}</div>; // 에러 상태

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>날짜</th>
            <th>내역명</th>
            <th>금액</th>
            <th>분류</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((transaction, index) => (
            <tr key={transaction.uuid}>
              <td>{index + 1}</td>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.name}</td>
              <td>{transaction.amount.toLocaleString()}원</td>
              <td>{transaction.type === 'income' ? '수입' : '지출'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
