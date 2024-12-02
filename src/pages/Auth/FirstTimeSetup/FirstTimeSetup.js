import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { TextboxLabel, Title } from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
import { authState } from '../../../store/Auth';
export const FirstTimeSetup = () => {
  const [bookName, setBookName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useRecoilState(authState);
  const config = { headers: { Authorization: auth } };

  const createBookPost = async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/accountBooks`,
      data,
      config
    );
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: createBookPost,
    onSuccess: (data) => {
      console.log('data received:', data);
    },
    onError: (error) => {
      alert(error);
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });
  const onEnter = (e) => {
    if (e.key === 'Enter') {
      setFirstTimeBook();
    }
  };
  const setFirstTimeBook = () => {
    mutation.mutate({ type: 'personal', name: bookName });
  };
  return (
    <div className="App">
      <div
        className="flex-col flex-center"
        style={{ gap: '12px', flexGrow: 1, padding: '12px' }}
      >
        <Panel style={{ width: '512px' }}>
          <div className="flex-col" style={{ gap: '16px' }}>
            <Title>첫 가계부 설정</Title>
            <div className="flex-col" style={{ gap: '8px' }}>
              <TextboxLabel>가계부 이름</TextboxLabel>
              <Textbox
                type="text"
                setText={setBookName}
                value={bookName}
                onKeyDown={onEnter}
              />
            </div>
            {isLoading ? (
              <div className="flex-1 flex-row flex-center">
                <div>가계부 생성 중</div>
              </div>
            ) : (
              <Button variant="contained" onClick={() => setFirstTimeBook()}>
                설정 완료
              </Button>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
};
