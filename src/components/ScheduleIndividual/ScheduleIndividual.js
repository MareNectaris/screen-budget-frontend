import { CategoryChip } from '../CategoryChip/CategoryChip'
import './ScheduleIndividual.css'
export const ScheduleIndividual = ({
  paymentLocation,
  memo,
  category,
  paymentMethod,
  amount
}) => {
  return (
    <div className="flex-col">
      <div className="flex-row gap-6px align-center">
        <div className="payment-location">{paymentLocation}</div>
        <div className="payment-memo">{memo}</div>
        <div className="flex-1"/>
        <div className="payment-amount">{amount}</div>
      </div>
      <div className="flex-row gap-6px align-center">
        <CategoryChip color="#040077">
          {category}
        </CategoryChip>
        <div className="payment-method">
          {paymentMethod}
        </div>
      </div>
    </div>
  )
}