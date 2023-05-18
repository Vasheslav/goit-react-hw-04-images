import { useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Conteiner } from './App.styled';

export function App() {
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = imageName => {
    setImageName(imageName);
  };

  return (
    <Conteiner>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
    </Conteiner>
  );
}
