import { Link } from 'react-router';
import { Line } from '../Line/Line';
export const NewsItem = ({ text, style, className, to }) => {
  return (
    <div
      className={`flex-col ${className}`}
      style={{ ...style, paddingTop: '6px' }}
    >
      <Link to={to} style={{ textDecoration: 'none', color: '#000' }}>
        <div className="medium text-24px" style={{ paddingBottom: '6px' }}>
          {text}
        </div>
      </Link>
      <Line />
    </div>
  );
};
