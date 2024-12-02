import { useState } from 'react';
import { Button } from '../../../components/Button/Button';
import { Panel } from '../../../components/Panel/Panel';
import { TextboxLabel, Title } from '../../../components/Text/Text';
import { Textbox } from '../../../components/Textbox/Textbox';
export const FirstTimeSetup = () => {
  const [bookName, setBookName] = useState(null);
  return (
    <div className="App">
      <div
        className="flex-col"
        style={{ gap: '12px', flexGrow: 1, padding: '12px' }}
      >
        <Panel>
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
          </div>
        </Panel>
        <div
          className="flex-row space-between"
          style={{ flex: 1, gap: '26px' }}
        >
          <Panel style={{ flex: 1 }}>
            <Title>카테고리 및 예산 설정</Title>
          </Panel>
          <Panel style={{ flex: 1 }}>
            <Title>결제 수단 설정</Title>
          </Panel>
        </div>
        <Panel>
          <Button variant="contained">설정 완료</Button>
        </Panel>
      </div>
    </div>
  );
};
