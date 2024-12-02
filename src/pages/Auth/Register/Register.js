import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { TextboxLabel, Title } from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
export const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordCheck, setPasswordCheck] = useState(null);
  const [nickname, setNickname] = useState(null);
  const signUpPost = async (data) => {
    const response = await axios.post(
      'http://corsproxy.io/?http://118.34.232.178:3000/api/members/register',
      data
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: signUpPost,
    onSuccess: (data) => {
      console.log('data received:', data);
      navigate('/login');
    },
    onError: (error) => {
      console.error('ERR', error);
    },
  });

  const onEnter = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };
  const handleRegister = () => {
    if (!email || !password || !passwordCheck || !nickname) {
      alert('이메일 및 비밀번호를 입력해 주세요.');
    } else if (password !== passwordCheck) {
      alert('입력한 비밀번호가 서로 일치하지 않습니다.');
    } else {
      mutation.mutate({ email: email, password: password, nickname: nickname });
    }
  };
  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col" style={{ gap: '12px' }}>
          <div className="flex-col" style={{ gap: '12px' }}>
            <Title>회원 가입</Title>
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
              <TextboxLabel>닉네임</TextboxLabel>
              <Textbox
                type="text"
                setText={setNickname}
                value={nickname}
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
            <div className="flex-col" style={{ gap: '8px' }}>
              <TextboxLabel>비밀번호 재입력</TextboxLabel>
              <Textbox
                type="password"
                setText={setPasswordCheck}
                value={passwordCheck}
                onKeyDown={onEnter}
              />
            </div>
            <div className="flex-col" style={{ gap: '8px' }}>
              <Button variant="contained" onClick={() => handleRegister()}>
                회원 가입
              </Button>
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
};
