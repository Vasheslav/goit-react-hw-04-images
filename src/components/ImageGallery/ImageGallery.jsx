import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Gallery } from './ImageGallery.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34228603-b891bcae5effe4f7195da3207';
const notify = () => toast('Nothing found');
const messageError = () =>
  toast('An error occurred, please try again or enter a different value');

export function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const firstPage = 1;
    setPage(firstPage);
    setImages([]);

    if (imageName === '') {
      return;
    }

    setStatus('pending');

    axios
      .get(
        `${BASE_URL}?q=${imageName}&page=${firstPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(res => {
        if (res.data.hits.length === 0) {
          notify();
        }
        setImages(prevImages => [...prevImages, ...res.data.hits]);
        setStatus('resolved');
        setShowButton(res.data.hits.length >= 12);
      })
      .catch(error => messageError());
  }, [imageName]);

  const onChangePage = () => {
    let nextPage = page + 1;
    setPage(nextPage);
    axios
      .get(
        `${BASE_URL}?q=${imageName}&page=${nextPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(res => {
        setImages(prevImages => [...prevImages, ...res.data.hits]);
        setStatus('resolved');
        setShowButton(res.data.hits.length >= 12);
      })
      .catch(error => messageError());
  };

  if (status === 'idle') {
    return null;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return (
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    );
  }

  if (status === 'resolved') {
    return (
      <div>
        <Gallery>
          {images.map(item => (
            <ImageGalleryItem
              key={item.id}
              smollImg={item.webformatURL}
              largeImg={item.largeImageURL}
              tags={item.tags}
            />
          ))}
        </Gallery>
        {showButton && <Button onCklick={onChangePage} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  imageName: PropTypes.string.isRequired,
};
