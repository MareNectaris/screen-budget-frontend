import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { Panel } from '../../../components/Panel/Panel';
import { Title } from '../../../components/Text/Text';
import { authState, isSignedInState } from '../../../store/Auth';
export const Logout = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  console.log(auth);
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const signOutPost = async (data) => {
    const response = await axios.post(
      'http://118.34.232.178:3000/api/members/logout',
      {},
      config
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: signOutPost,
    onSuccess: (data) => {
      setAuth(null);
      setIsSignedIn(false);
      navigate('/');
    },
    onError: (error) => {
      alert(error);
      navigate('/');
    },
  });
  useEffect(() => {
    mutation.mutate();
  }, []);

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
