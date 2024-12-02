import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { Panel } from '../../../components/Panel/Panel';
import { Title } from '../../../components/Text/Text';
import { authState, isSignedInState } from '../../../store/Auth';
export const Logout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  setAuth(null);
  setIsSignedIn(false);
  navigate('/');
  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col" style={{ gap: '12px' }}>
          <Title>로그아웃 중</Title>
        </div>
      </Panel>
    </div>
  );
};
