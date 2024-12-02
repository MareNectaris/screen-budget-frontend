import { Panel } from '../../components/Panel/Panel';
import { TextboxLabel } from '../../components/Text/Text';
import './Loading.css';
export const Loading = ({ text }) => {
  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col flex-center" style={{ gap: '16px' }}>
          <div className="spinner" />
          <TextboxLabel>{text ? text : '로딩 중'}</TextboxLabel>
        </div>
      </Panel>
    </div>
  );
};
