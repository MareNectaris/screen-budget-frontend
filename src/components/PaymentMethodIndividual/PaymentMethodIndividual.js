import DeleteIcon from '@mui/icons-material/Delete';
import PaymentIcon from '@mui/icons-material/Payment';
export const PaymentMethodIndividual = ({ children, onDelete, _id }) => {
  return (
    <div className="flex-1 flex-row align-center gap-6px" key={_id}>
      <PaymentIcon />
      <div className="flex-1">{children}</div>
      <DeleteIcon
        sx={{ color: 'red' }}
        className="pointer"
        onClick={() => onDelete()}
      />
    </div>
  );
};
