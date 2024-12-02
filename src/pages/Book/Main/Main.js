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
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/accountBooks/check`,
      config
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: accountBooksPost,
    onSuccess: (data) => {
      if (!data.exists || !data) {
        setFirstTimeSetupRequired(true);
        navigate('/firstTimeSetup');
      } else {
        console.log(data);
        const accountBookUuid = data.accountBook.uuid;
        navigate(`/books/${accountBookUuid}`);
      }
    },
    onError: (error) => {
      alert(error);
    },
  });

  useEffect(() => {
    mutation.mutate({});
  }, []);

  return <div className="App"></div>;
};
