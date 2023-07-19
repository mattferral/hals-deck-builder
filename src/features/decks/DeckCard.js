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

const DeckCard = ({ deck }) => {
  const {
    name,
    colors,
    backgroundImg,
    format,
    cardCount,
    maxCount
  } = deck;

  console.log(deck);

  const defaultImgURL = 'https://static.wikia.nocookie.net/mtgsalvation_gamepedia/images/f/f8/Magic_card_back.jpg/';

  return (
    <>
      <Link to={`/decks/${name}`} className='text-muted'
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
            <CardSubtitle className='text-light'>{cardCount}/{maxCount}</CardSubtitle>
          </CardHeader>
          

          <CardImg
            src={backgroundImg ? backgroundImg : defaultImgURL}
            alt={name}
          />

          <CardFooter>
            {colors.map(color => 
                <CardImg
                  className='m-1'
                  src={`/images/colors/${color}.png`}
                  bottom
                  style={{
                    width: '1.82rem',
                  }}
                />
              )}
          </CardFooter>
          
        </Card>
      </Link>
    </>
  );
};

export default DeckCard;