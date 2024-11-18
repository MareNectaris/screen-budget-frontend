import { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Modal } from './components/Modal/Modal';
import { Navbar } from './components/Navbar/Navbar';
import { Panel } from './components/Panel/Panel';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Title } from './components/Text/Text';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="App" style={{gap: "16px"}} >
      <Sidebar isOpen/>
      <div className="flex-col">
        <Navbar/>
        <Panel>
          <Title>Panel Test</Title>
          <div>asdf</div>
        </Panel>
        <Button variant="contained" onClick={() => setIsModalOpen(!isOpen)}>asdf</Button>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>asdf</Modal>

      </div>
    </div>
  );
}

export default App;
