import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardTitle,
  CardImg,
  CardSubtitle,
  CardHeader,
  CardFooter,
} from 'reactstrap';
import slugify from 'slugify';

import Mana from '../../common/Mana';


const DeckCard = ({ deck }) => {
  const {
    name,
    colors,
    backgroundImg,
    format,
    cardCount,
    minCount
  } = deck;

  const defaultImgURL = 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/';

  
  return (
    <>
      <Link to={`/decks/${slugify(name)}`} className='text-muted'
        style={{
          width: '15rem',
        }}
      >
        <Card className='bg-dark bg-opacity-75 m-2'>


          <CardHeader className='text-muted'>
            <CardTitle className='text-white'>
              {name}
            </CardTitle>

            <CardSubtitle className='text-light'>{format}</CardSubtitle>
            <CardSubtitle className='text-light'>{cardCount}/{minCount}</CardSubtitle>
          </CardHeader>
          

          <CardImg
            src={backgroundImg ? backgroundImg : defaultImgURL}
            alt={name}
          />

          <CardFooter>
            <Mana
              mana={colors}
              className='m-1'
              style={{
                width: '1.82rem',
              }}
              bottom
            />
          </CardFooter>
          
        </Card>
      </Link>
    </>
  );
};

export default DeckCard;