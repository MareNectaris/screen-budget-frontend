import { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { TextboxLabel, Title } from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
export const FirstTimeSetup = () => {
  const [bookName, setBookName] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState({});
  const setFirstTimeBook = () => {};
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
                onKeyDown={() => {}}
              />
            </div>
            <Button variant="contained" onClick={() => setFirstTimeBook()}>
              설정 완료
            </Button>
          </div>
        </Panel>
      </div>
    </div>
  );
};
