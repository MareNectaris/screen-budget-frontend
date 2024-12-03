import React, { useState } from 'react'; // useState를 React에서 함께 임포트
import './App.css';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 상태 관리 훅
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 상태 관리 훅

  const columns = [
    { Header: '#', accessor: 'number' },
    { Header: '분류', accessor: 'category' },
    { Header: '카테고리', accessor: 'subcategory' },
    { Header: '결제수단', accessor: 'paymentMethod' },
    { Header: '결제 내역명', accessor: 'paymentDetails' },
    { Header: '금액', accessor: 'amount' },
    { Header: '메모', accessor: 'memo' },
  ];

  const data = [
    {
      number: 1,
      category: '식비',
      subcategory: '외식',
      paymentMethod: '신용카드',
      paymentDetails: '스타벅스 커피',
      amount: '5,000원',
      memo: '아침 커피',
    },
    {
      number: 2,
      category: '교통',
      subcategory: '버스',
      paymentMethod: '현금',
      paymentDetails: '버스 요금',
      amount: '1,200원',
      memo: '출근',
    },
  ];

  return (
    <div className="App">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="content">
        <Textbox />
        <Navbar />
        <Panel>
          <Title>Panel Test</Title>
          <div>asdf</div>
        </Panel>
        <Button
          variant="contained"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          asdf
        </Button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          asdf
        </Modal>
      </div>
      <div className="table-container">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}

export default App;
