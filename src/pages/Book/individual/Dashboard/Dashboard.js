import { useParams } from 'react-router';

export const Dashboard = () => {
  const { bookUuid } = useParams();
  console.log(bookUuid);
  return <div>{bookUuid}</div>;
};
