import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardGroup,
  Button,
  Modal,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  FormFeedback,
} from 'reactstrap';
import slugify from 'slugify';

import DeckCard from './DeckCard';
import { newDeck } from './deckSlice';

const Decks = () => {
  const decks = useSelector(st => Object.values(st.decks));
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);

  const [name, setName] = useState('');
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
    setInvalid(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (decks.find(deck => deck.name.toLowerCase() === name.toLowerCase())) {
      setInvalid(true);
    } else {
      dispatch(newDeck(name));
      const id = slugify(name.toLowerCase());
      navigate(`/decks/${id}`);
    }
  };

  return (
    <>
      <Button onClick={toggleModal}>Create New Deck</Button>
      
      <Modal
        isOpen={modal}
        toggle={toggleModal}
      >
        <ModalHeader>
          Create a deck
        </ModalHeader>
        <ModalBody
        >
          <Label for="deck-name">Name your deck</Label>
          <Input 
            type="text"
            id="deck-name"
            name="deck-name"
            value={name}
            onChange={handleChange}
            invalid={invalid}
          />
          <FormFeedback>There is already a deck with that name</FormFeedback>
        </ModalBody>
        <ModalFooter
        >
          <Button
            color="primary"
            onClick={handleSubmit}
            disabled={invalid}
          >
              Start Building
          </Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      <CardGroup
        className="m-5"
      >
        {decks.map(deck => 
          <DeckCard
            key={deck.name}
            deck={deck}
          />
        )}
      </CardGroup>
    </>
  );
};

export default Decks;