import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button, Label, Input } from './Searchbar.styled';

const inform = () => toast('Enter a value');

export function Searchbar({ onSubmit }) {
  const [imagesName, setImagesName] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleNameChange = ev => {
    setImagesName(ev.currentTarget.value.toLowerCase());
  };

  const handleSubmit = ev => {
    ev.preventDefault();

    if (imagesName.trim() === '') {
      inform();
      return;
    }

    onSubmit(imagesName);
    setIsButtonDisabled(true);
  };

  useEffect(() => {
    setIsButtonDisabled(false);
  }, [imagesName]);

  return (
    <header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imagesName}
          onChange={handleNameChange}
        />
        <Button type="submit" disabled={isButtonDisabled}>
          <Label>Search</Label>
        </Button>
      </Form>
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
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
