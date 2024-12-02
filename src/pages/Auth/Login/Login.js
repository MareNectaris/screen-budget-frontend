import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { TextboxLabel, Title } from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
import { authState, isSignedInState } from '../../../store/Auth';
export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const [isLoading, setIsLoading] = useState(false);
  const signInPost = async (data) => {
    const response = await axios.post(
      'http://118.34.232.178:3000/api/members/login',
      data
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: signInPost,
    onSuccess: (data) => {
      console.log('data received:', data);
      setAuth(data.message?.token);
      setIsSignedIn(true);
    },
    onError: (error) => {
      setIsLoading(false);
      alert(error);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };
  const handleLogin = () => {
    if (!email || !password) {
      alert('이메일 및 비밀번호를 입력해 주세요.');
    } else {
      mutation.mutate({ email: email, password: password });
    }
  };
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
                setText={setEmail}
                value={email}
                onKeyDown={onEnter}
              />
            </div>
            <div className="flex-col" style={{ gap: '8px' }}>
              <TextboxLabel>비밀번호</TextboxLabel>
              <Textbox
                type="password"
                setText={setPassword}
                value={password}
                onKeyDown={onEnter}
              />
            </div>
            {isLoading ? (
              <div className="flex-1 flex-row flex-center">
                <div>로그인 중</div>
              </div>
            ) : (
              <div className="flex-col" style={{ gap: '8px' }}>
                <Button variant="contained" onClick={() => handleLogin()}>
                  로그인
                </Button>
                <Button variant="text" onClick={() => navigate('/register')}>
                  회원 가입
                </Button>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
};
