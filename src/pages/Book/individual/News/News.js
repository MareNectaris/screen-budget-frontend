import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import { NewsItem } from '../../../../components/NewsItem/NewsItem';
import { Panel } from '../../../../components/Panel/Panel';
import { Title } from '../../../../components/Text/Text';

export const NewsList = () => {
  const [news, setNews] = useState({ hankyung: [], mk: [] });
  const newsPost = async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_ADDRESS}/api/economy`
    );
    return response.data;
  };
  const mutation = useMutation({
    mutationFn: newsPost,
    onSuccess: (data) => {
      setNews(data?.data);
    },
    onError: (error) => {
      alert(error);
    },
    onMutate: () => {},
  });

  useEffect(() => {
    mutation.mutate();
  }, []);
  const { setMajorCategory, setMinorCategory } = useOutletContext();
  useEffect(() => {
    setMajorCategory('개인 가계부');
    setMinorCategory('경제 뉴스');
  });
  return (
    <div className="flex-col flex-1" style={{ gap: '12px', maxHeight: '100%' }}>
      <div className="flex-row">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridGap: '16px',
            height: '100%',
          }}
        >
          <Panel className="flex-1">
            <Title>한국경제</Title>
            <div className="flex-col">
              {news.hankyung.map((elem) => {
                return <NewsItem text={elem.title} to={elem.link} />;
              })}
            </div>
          </Panel>
          <Panel className="flex-1">
            <Title>매일경제</Title>
            <div className="flex-col">
              {news.mk.map((elem) => {
                return <NewsItem text={elem.title} to={elem.link} />;
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};
