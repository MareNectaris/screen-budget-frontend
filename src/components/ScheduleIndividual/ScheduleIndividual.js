import { floorAndFormatNumber } from '@toss/utils';
import { CategoryChip } from '../CategoryChip/CategoryChip';
import { Line } from '../Line/Line';
import './ScheduleIndividual.css';
export const ScheduleIndividual = ({
  paymentLocation,
  memo,
  category,
  color,
  paymentMethod,
  amount,
  transactionType,
}) => {
  return (
    <div className="flex-col">
      <div className="flex-row gap-6px align-center">
        <div className="payment-location">{paymentLocation}</div>
        <div className="payment-memo">{memo}</div>
        <div className="flex-1" />
        <div className="payment-amount">
          {transactionType === 'income' ? '+' : '-'}
          {floorAndFormatNumber(amount)}원
        </div>
      </div>
      <div className="flex-row gap-6px align-center">
        <CategoryChip color={color}>{category}</CategoryChip>
        <div className="payment-method">{paymentMethod}</div>
      </div>
      <Line style={{ marginTop: '6px', marginBottom: '6px' }} />
    </div>
  );
};
