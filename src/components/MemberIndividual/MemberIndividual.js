import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
export const MemberIndividual = ({ children, onDelete, _id, me }) => {
  return (
    <div className="flex-1 flex-row align-center gap-6px" key={_id}>
      <AccountCircleIcon />
      <div className="flex-1">{children}</div>
      {!me && (
        <DeleteIcon
          sx={{ color: 'red' }}
          className="pointer"
          onClick={() => onDelete()}
        />
      )}
    </div>
  );
};
