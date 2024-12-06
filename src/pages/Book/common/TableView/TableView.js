import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Panel } from '../../../../components/Panel/Panel';
import { Title } from '../../../../components/Text/Text';
import { authState } from '../../../../store/Auth';
export const TableView = () => {
  const navigate = useNavigate();
  const { setMajorCategory, setMinorCategory, books, setBooks } =
    useOutletContext();
  const [bookName, setBookName] = useState('');
  const { bookUuid } = useParams();
  const getKSTDate = (date) => {
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstDate = new Date(date.getTime() + kstOffset);
    const y = kstDate.getUTCFullYear();
    const m = kstDate.getUTCMonth() + 1;
    const d = kstDate.getUTCDate();
    return [y, m, d];
  };
  const auth = useRecoilValue(authState);
  const config = {
    headers: { Authorization: `${auth}` },
  };
  useEffect(() => {
    setMajorCategory(bookName);
  }, [bookName]);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
    setMinorCategory('테이블');
  }, []);
  useEffect(() => {
    setBookName(books.find((elem) => elem._id == bookUuid)?.name);
  }, [books]);
  return (
    <div
      className="flex-col flex-1"
      style={{ gap: '12px', maxHeight: '100%', width: '100%' }}
    >
      <Panel className="flex-1">
        <Title>2024년 12월</Title>
      </Panel>
    </div>
  );
};
