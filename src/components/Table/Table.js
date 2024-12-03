import React, { useEffect, useState } from 'react';
import './Table.css';

const TableComponent = ({ accountBookUuid }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // API 호출
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `/api/transactions/${accountBookUuid}/daily`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [accountBookUuid]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          {data.map((transaction, index) => (
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

export default TableComponent;
