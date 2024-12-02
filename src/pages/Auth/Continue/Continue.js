import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { authState, isReInitState, isSignedInState } from '../../../store/Auth';
import { Loading } from '../../Loading/Loading';
export const Continue = () => {
  const navigate = useNavigate();
  const [isReInit, setIsReInit] = useRecoilState(isReInitState);
  const [auth, setAuth] = useRecoilState(authState);
  const [isSignedIn, setIsSignedIn] = useRecoilState(isSignedInState);
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const signInPost = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/members/profile`,
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

  return <Loading />;
};
