import { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from '../Modal/Modal';
import { Item, Img } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ smollImg, largeImg, tags }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <Item>
        <Img src={smollImg} alt={tags} onClick={toggleModal} />
      </Item>
      {showModal && (
        <ModalWindow onClose={toggleModal}>
          <img src={largeImg} alt={tags} />
        </ModalWindow>
      )}
    </div>
  );
}

ImageGalleryItem.propTypes = {
  smollImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
