import { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { CategoryChip } from './components/CategoryChip/CategoryChip';
import { FAB } from './components/FAB/FAB';
import { Modal } from './components/Modal/Modal';
import { Navbar } from './components/Navbar/Navbar';
import { Panel } from './components/Panel/Panel';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Title } from './components/Text/Text';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="App">
      {isSidebarOpen && <Sidebar/>}
      <div className="flex-col" style={{gap: "12px", flexGrow: 1, padding: '12px'}}>
        
        <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <Panel>
          <Title>Panel Test</Title>
          <div>asdf</div>
        </Panel>
        <Button variant="contained" onClick={() => setIsModalOpen(!isModalOpen)}>asdf</Button>
        <CategoryChip color={"#09C06E"}>카테고리</CategoryChip>
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>asdf</Modal>
        <FAB onClick={()=>alert("hi")}/>
      </div>
    </div>
  );
}

export default App;
