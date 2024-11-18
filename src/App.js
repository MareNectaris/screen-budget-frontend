import { useState } from 'react';
import './App.css';
import { Modal } from './components/Modal/Modal';
import { Panel } from './components/Panel/Panel';
import { Title } from './components/Text/Text';
function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="App" >
      <Panel>
        <Title>Panel Test</Title>
        <div>asdf</div>
      </Panel>
      <button onClick={() => setIsOpen(!isOpen)}></button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>asdf</Modal>
    </div>
  );
}

export default App;
