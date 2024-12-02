import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { TextboxLabel, Title } from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
export const Login = () => {
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일 및 비밀번호를 입력해 주세요.');
    } else {
    }
  };
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const navigate = useNavigate();
  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col" style={{ gap: '12px' }}>
          <div className="flex-col" style={{ gap: '12px' }}>
            <Title>로그인</Title>
            <div className="flex-col" style={{ gap: '8px' }}>
              <TextboxLabel>이메일 주소</TextboxLabel>
              <Textbox
                type="email"
                onChange={() => setEmail(email)}
                value={email}
                onKeyDown={onEnter}
              />
            </div>
            <div className="flex-col" style={{ gap: '8px' }}>
              <TextboxLabel>비밀번호</TextboxLabel>
              <Textbox
                type="password"
                onChange={() => setPassword(password)}
                value={password}
                onKeyDown={onEnter}
              />
            </div>
            <div className="flex-col" style={{ gap: '8px' }}>
              <Button variant="contained" onClick={() => handleLogin()}>
                로그인
              </Button>
              <Button variant="text" onClick={() => alert('hi')}>
                회원 가입
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
