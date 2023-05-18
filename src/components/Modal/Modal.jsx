import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overley, Modal } from './Modal.styled';

export function ModalWindow({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return (
    <Overley onClick={handleBackdropClick}>
      <Modal>{children}</Modal>
    </Overley>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
};
