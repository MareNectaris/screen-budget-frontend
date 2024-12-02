import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { IntroTitle, Title } from '../../../components/Text/Text';
export const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col" style={{ gap: '12px' }}>
          <div className="flex-center">
            <div className="">
              <div>허들 없는 가계부의 시작</div>
              <IntroTitle>Screen Budget</IntroTitle>
            </div>
          </div>
          <div className="flex-col" style={{ gap: '8px' }}>
            <Title>시작하기</Title>
            <Button variant="contained" onClick={() => navigate('/login')}>
              이메일로 계속하기
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
};
