import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { Title } from '../../../components/Text/Text';
export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col" style={{ gap: '12px' }}>
          <div className="flex-col" style={{ gap: '8px' }}>
            <Title>로그인</Title>
            <Button variant="contained" onClick={() => alert('hi')}>
              로그인
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
};
