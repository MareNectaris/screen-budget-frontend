import { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
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
      <Button variant="contained" onClick={() => setIsOpen(!isOpen)}>asdf</Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>asdf</Modal>
    </div>
  );
}

export default App;
