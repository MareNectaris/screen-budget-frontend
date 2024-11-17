import './App.css';
import { Panel } from './components/Panel/Panel';
import { Title } from './components/Text/Text';
function App() {
  return (
    <div className="App" >
      <Panel>
        <Title>Panel Test</Title>
        <div>asdf</div>
      </Panel>
    </div>
  );
}

export default App;
