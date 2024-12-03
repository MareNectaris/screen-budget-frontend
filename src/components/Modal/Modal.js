import { Close } from '@mui/icons-material';
import { Title } from '../Text/Text';
import './Modal.css';

export const Modal = ({ children, isOpen, setIsOpen, title }) => {
  return (
    <div>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-dialog" style={{ minWidth: '512px' }}>
            <div className="flex-col" style={{ width: '100%', gap: '12px' }}>
              <div className="flex-row flex-center">
                <div className="flex-1">
                  <Title>{title}</Title>
                </div>
                <Close
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
              <div className="flex-col">{children}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
