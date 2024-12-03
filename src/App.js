import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Textbox } from './components/Textbox/Textbox';
import { Navbar } from './components/Navbar/Navbar';
import { Panel } from './components/Panel/Panel';
import { Title } from './components/Text/Text';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import TableComponent from './components/Table/Table'; // 테이블 컴포넌트
import SettingsTable from './components/Settings/Settings'; // SettingsTable 추가

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* 사이드바 */}
        <Sidebar isOpen={true} />

        {/* 메인 콘텐츠 */}
        <div className="content">
          <Textbox />
          <Navbar />
          <Panel>
            <Title>Panel Test</Title>
            <div>Sample Content</div>
          </Panel>
          <Button variant="contained">Sample Button</Button>
          <Modal isOpen={false}>Sample Modal Content</Modal>
        </div>

        {/* SettingsTable 추가 */}
        <div className="settings-container">
          <h2>Settings 테스트</h2>
          <SettingsTable />
        </div>

        {/* 라우팅 */}
        <Routes>
          <Route path="/books/:bookUuid" element={<TableComponent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
