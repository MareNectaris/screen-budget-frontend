import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { Panel } from '../../../components/Panel/Panel';
import { Title } from '../../../components/Text/Text';
import { authState, isReInitState, isSignedInState } from '../../../store/Auth';
export const ReInit = () => {
  const navigate = useNavigate();
  const [isReInit, setIsReInit] = useRecoilState(isReInitState);
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const signInPost = async (data) => {
    const response = await axios.get(
      'http://118.34.232.178:3000/api/members/profile',
      config
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: signInPost,
    onSuccess: (data) => {
      console.log(data);
      setIsReInit(false);
      navigate('.');
    },
    onError: (error) => {
      setIsReInit(false);
      setIsSignedIn(false);
      navigate('/');
    },
  });

  useEffect(() => {
    mutation.mutate({});
  }, []);

  return (
    <div className="App flex-center">
      <Panel style={{ width: '512px' }}>
        <div className="flex-col" style={{ gap: '12px' }}>
          <Title>세션 확인 중</Title>
        </div>
      </Panel>
    </div>
  );
};
