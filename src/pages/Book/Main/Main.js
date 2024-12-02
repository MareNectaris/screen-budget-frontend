import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { authState, firstTimeSetupRequiredState } from '../../../store/Auth';
export const Main = () => {
  const navigate = useNavigate();
  //가계부 있는지 확인
  const [auth, setAuth] = useRecoilState(authState);
  const [firstTimeSetupRequired, setFirstTimeSetupRequired] = useRecoilState(
    firstTimeSetupRequiredState
  );
  const config = {
    headers: { Authorization: `${auth}` },
  };

  const accountBooksPost = async (data) => {
    const response = await axios.get(
      'http://118.34.232.178:3000/api/accountBooks',
      config
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: accountBooksPost,
    onSuccess: (data) => {
      console.log(data);
      if (!data?.accountBooks || data?.accountBooks.length === 0) {
        setFirstTimeSetupRequired(true);
        navigate('/firstTimeSetup');
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    mutation.mutate({});
  }, []);
  return <div></div>;
};
